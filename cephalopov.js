/*

Copyright 2018 Eric O'Dell and subsequent contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//==============================================================================
// The cpov object contains all of the data structures and generic methods in
// CephaloPOV that do not appear in other specialized classes.
//==============================================================================

var cpov = { };


//------------------------------------------------------------------------------
// Internal global state.
//------------------------------------------------------------------------------

cpov.quietMode    = false; // CLI switches ...
cpov.verbosity    = 1;
cpov.debug        = false;
cpov.preamble     = false;     // content to prepend to SDL output
cpov.sdlIncludes  = false;     // SDL files to include after preamble
cpov.outputBase   = "cpov0000" // output base name template
cpov.infile       = false;     // input file
cpov.tickVal      = 1.0;       // clock tick

cpov.currentFrame = 0;    // current animation frame
cpov.objectSerial = 0;    // running count of Primitives created
cpov.serialMap    = { };  // maps serials to objects
cpov.idMap        = { };  // maps identifiers to maps


//------------------------------------------------------------------------------
// Module wrappers.
//------------------------------------------------------------------------------

cpov.fs      = require("fs");
cpov.File    = require("./file.js");
cpov.chalk   = require("chalk");
cpov.process = require("process");
cpov.wrap    = require("word-wrap"); // https://github.com/jonschlinkert/word-wrap


//==============================================================================
// Validation functions, mainly to be leveraged by generated classes.
//==============================================================================

cpov.isFloat = function(val) {
    return typeof val == "number" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfFloats = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "number")
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isWithin = function(val, min, max) {
    return val >= min && val <= max ? true : false;
}

//------------------------------------------------------------------------------

cpov.isBetween = function(val, min, max) {
    return val > min && val < max ? true : false;
}

//------------------------------------------------------------------------------

cpov.isInt = function(val) {
    return typeof val == "number" && val == Math.floor(val) ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfInts = function(val, min, max) {
    if(!Array.isArray(val))
        return false;
    if(val.length < min || val.length > max)
        return false;
    for(var i = 0; i < val.length; i++)
        if(typeof val[i] != "number" || val[i] != Math.floor(val[i]))
            return false;
    return true;
}

//------------------------------------------------------------------------------

cpov.isString = function(val) {
    return typeof val == "string" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNonEmptyString = function(val) {
    return typeof val == "string" && val.length ? true : false;
}

//------------------------------------------------------------------------------

cpov.isChar = function(val) {
    return typeof val == "string" && val.length == 1 ? true : false;
}

//------------------------------------------------------------------------------

cpov.isInArray = function(val, array) {
    for(var i = 0; i < array.length; i++)
        if(array[i] === val)
            return true;
    return false;
}

//------------------------------------------------------------------------------

cpov.isKey = function(val, object) {
    return object[val] !== undefined ? true : false;
}

//------------------------------------------------------------------------------

cpov.isBoolean = function(val) {
    return typeof val == "boolean" ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNull = function(val) {
    return val === null ? true : false;
}

//------------------------------------------------------------------------------

cpov.isClass = function(val, classname) {
    if(Array.isArray(classname)) {
        var okay = false;
        for(var c = 0; c < classname.length; c++) {
            if(Object.getPrototypeOf(val).constructor.name == classname[c]) {
                okay = true;
                break;
            }
        }
        return okay;
    }
    return Object.getPrototypeOf(val).constructor.name == classname ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfClass = function(val, classname, min, max) {
    if(Array.isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            if(Object.getPrototypeOf(val).constructor.name != classname)
                return false;
        }
        if(val.length < min || val.length > max)
            return false;
        return true;
    } else {
        return false;
    }
}

//------------------------------------------------------------------------------

cpov.inheritsFrom = function(val, classname) {
    return Object.getPrototypeOf(val.constructor).name == classname ? true : false;
}

//------------------------------------------------------------------------------

cpov.isArrayOfSubclass = function(val, classname) {
    if(!Array.isArray(val))
        return false;
    if(Array.isArray(classname)) {
        for(var i = 0; i < val.length; i++) {
            var okay = false;
            for(var c = 0; c < classname.length; c++) {
                if(cpov.inheritsFrom(val, classname[i])) {
                    okay = true;
                    break;
                }
            }
            if(!okay) {
                return false;
            }
        }
    } else {
        for(var i = 0; i < val.length; i++) {
            if(!cpov.inheritsFrom(val, classname)) {
                return false;
            }
        }
    }
    return true;
}

//------------------------------------------------------------------------------

cpov.keysToTextList = function(obj) {
    var items = [ ];
    for(var k in obj)
        items.push("'" + k + "'");
    return cpov.arrayToTextList(items);
}

//------------------------------------------------------------------------------

cpov.arrayToTextList = function(items) {
    var items = items.splice(0);
    items[items.length - 1] = "or " + items[items.length - 1];
    return items.join(", ");
}

//------------------------------------------------------------------------------

cpov.isSDLFunction = function(val) {
    return (typeof val == "string" && val.substr(0, 1) == "&") ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNullOrFunction = function(val) {
    return (val === null || typeof val == "function" || cpov.isSDLFunction(val)) ? true : false;
}

//------------------------------------------------------------------------------

cpov.isNullOrJSFunction = function(val) {
    return (val === null || typeof val == "function") ? true : false;
}

//------------------------------------------------------------------------------

cpov.isUnusedSerial = function(val, obj) {
    var result = (obj.serial == val || cpov.serialMap[val] === undefined) ? true : false;
    if(obj.serial != val)
        delete cpov.serialMap[obj.serial];
    cpov.serialMap[val] = obj;
    return result;
}

//------------------------------------------------------------------------------

cpov.isUnusedId = function(val, obj) {
    var result = (obj.id == val || cpov.idMap[val] === undefined) ? true : false;
    if(obj.id != val)
        delete cpov.idMap[obj.id];
    cpov.idMap[val] = obj;
    return result;
}

//------------------------------------------------------------------------------
// Used in setter validation to auto-convert convenience forms of vectors to
// actual objects. The class constructors will terminate execution with a fatal
// cpov.error message if the initializer is invalid or malformed.
//------------------------------------------------------------------------------

cpov.convertToVector = function(type, val) {
    switch(type) {
        case "VectorXY":
            val = new VectorXY(val);
            break;
        case "VectorUV":
            val = new VectorUV(val);
            break;
        case "VectorXYZ":
            val = new VectorXYZ(val);
            break;
        case "VectorXYZW":
            val = new VectorXYZW(val);
            break;
        case "Color":
            val = new Color(val);
            break;
        default:
            cpov.error("fatal", "System error, invalid type '" + type + "'.", "cpov.convertToVector");
    }

    return val;
}


//------------------------------------------------------------------------------
// Legal dither types mapped to textual descriptions.
//------------------------------------------------------------------------------

cpov.ditherTypes = {
    "B2": "Bayer pattern 2x2",
    "B3": "Bayer pattern 3x3",
    "B4": "Bayer pattern 4x4",
    "D1": "Simple error diffusion 1D",
    "D2": "Simple error diffusion 2D",
    "FS": "Floyd-Steinberg error diffusion"
};


//------------------------------------------------------------------------------
// Legal font types mapped to textual descriptions.
//------------------------------------------------------------------------------

cpov.fontTypes = {
	"ttf": "TrueType font",
	"ttc": "TrueType collection",
};

//------------------------------------------------------------------------------
// All (graphics) output file formats, mapped to textual descriptions.
//------------------------------------------------------------------------------

cpov.outputFileTypes = {
    "B": "BMP",
    "C": "TGA, RLE compression",
    "E": "OpenEXR HDR",
    "H": "Radiance HDR",
    "J": "JPEG",
    "N": "PNG",
    "P": "PPM",
    "S": "System default",
    "T": "TGA, uncompressed"
};


//------------------------------------------------------------------------------
// List of geometric primitive type names.
//------------------------------------------------------------------------------

cpov.primitives = [ "bicubicPatch", "blob", "box", "camera", "cone", "cubic",
    "cylinder", "difference", "disc", "heightField", "intersection",
    "isoSurface", "juliaFractal", "lathe", "lightSource", "merge", "mesh", "ovus",
    "parametric", "plane", "poly", "polygon", "polynomial", "prism", "quadric",
    "quartic", "sor", "sphere", "sphereSweep", "superellipsoid", "text",
    "torus", "triangle", "union" ];


//------------------------------------------------------------------------------
// All supported return actions mapped to textual descriptions.
//------------------------------------------------------------------------------

cpov.returnActions = {
    "I":  "ignore code",
    "S":  "skip one step",
    "A":  "all steps skipped",
    "Q":  "quit POV-Ray immediately",
    "U":  "generate a user abort in POV-Ray",
    "F":  "generate a fatal error in POV-Ray",
    "-I": "[invert] ignore code",
    "-S": "[invert] skip one step",
    "-A": "[invert] all steps skipped",
    "-Q": "[invert] quit POV-Ray immediately",
    "-U": "[invert] generate a user abort in POV-Ray",
    "-F": "[invert] generate a fatal error in POV-Ray",
    "!I": "[invert] ignore code",
    "!S": "[invert] skip one step",
    "!A": "[invert] all steps skipped",
    "!Q": "[invert] quit POV-Ray immediately",
    "!U": "[invert] generate a user abort in POV-Ray",
    "!F": "[invert] generate a fatal error in POV-Ray",
};


//------------------------------------------------------------------------------
// Map of internal spline types to their SDL representations.
//------------------------------------------------------------------------------

cpov.internalSplineTypes = {
    linearSpline: "linear_spline",
    bezierSpline: "b_spline",
    cubicSpline:  "cubic_spline"
};


//------------------------------------------------------------------------------
// Map of prism (spline) types to their SDL representations.
//------------------------------------------------------------------------------

cpov.prismTypes = {
    bezierSpline:    "bezier_spline",
    conicSweep:      "conic_sweep",
    cubicSpline:     "cubic_spline",
    linearSpline:    "linear_spline",
    linearSweep:     "linear_sweep",
    quadraticSpline: "quadratic_spline",
};


//------------------------------------------------------------------------------
// Map of spline types to their SDL representations.
//------------------------------------------------------------------------------

cpov.splineTypes = {
    bezierSpline:    "bezier_spline",
    cubicSpline:     "cubicSpline",
    linearSpline:    "linear_spline",
    quadraticSpline: "quadratic_spline",
};


//------------------------------------------------------------------------------
// List of juliaFractal types.
//------------------------------------------------------------------------------

cpov.juliaFractalTypes = [
    "hypercomplex:acos",
    "hypercomplex:acosh",
    "hypercomplex:asin",
    "hypercomplex:atan",
    "hypercomplex:atanh",
    "hypercomplex:cos",
    "hypercomplex:cosh",
    "hypercomplex:cube",
    "hypercomplex:exp",
    "hypercomplex:ln",
    "hypercomplex:pwr",
    "hypercomplex:reciprocal",
    "hypercomplex:sin",
    "hypercomplex:sinh",
    "hypercomplex:sqr",
    "hypercomplex:tan",
    "hypercomplex:tanh",
    "quaternion:cube",
    "quaternion:sqr",
];


//------------------------------------------------------------------------------
// List of heightField image types
//------------------------------------------------------------------------------

cpov.hfTypes = [ "exr", "gif", "hdr", "iff", "jpeg", "pgm", "png", "pot", "ppm",
    "sys", "tga", "tiff", ];


//------------------------------------------------------------------------------
// List of SDL keywords.
//------------------------------------------------------------------------------

cpov.sdlKeywords = [ "aa_level", "aa_threshold", "abs", "absorption", "accuracy",
    "acos", "acosh", "adaptive", "adc_bailout", "agate", "agate_turb", "albedo",
    "all", "all_intersections", "alpha", "altitude", "always_sample", "ambient",
    "ambient_light", "angle", "aoi", "aperture", "append", "arc_angle",
    "area_illumination", "area_light", "array", "asc", "ascii", "asin", "asinh",
    "assumed_gamma", "atan", "atan2", "atand", "atanh", "autostop", "average",
    "b_spline", "background", "bezier_spline", "bicubic_patch", "bitwise_and",
    "bitwise_or", "bitwise_xor", "black_hole", "blob", "blue", "blur_samples",
    "bokeh", "bounded_by", "box", "boxed", "bozo", "break", "brick",
    "brick_size", "brightness", "brilliance", "bump_map", "bump_size", "bumps",
    "camera", "case", "caustics", "ceil", "cells", "charset", "checker", "chr",
    "circular", "clipped_by", "clock", "clock_delta", "clock_on", "collect",
    "color", "color_map", "colour", "colour_map", "component", "composite",
    "concat", "cone", "confidence", "conic_sweep", "conserve_energy",
    "contained_by", "control0", "control1", "coords", "cos", "cosh", "count",
    "crackle", "crand", "cube", "cubicwave", "cutaway_textures", "cylinder",
    "cylindrical", "datetime", "debug", "declare", "default", "defined",
    "degrees", "density", "density_file", "density_map", "dents", "deprecated",
    "df3", "difference", "diffuse", "dimension_size", "dimensions", "direction",
    "disc", "dispersion", "dispersion_samples", "dist_exp", "distance", "div",
    "double_illuminate", "eccentricity", "else", "elseif", "emission", "end",
    "error", "error_bound", "evaluate", "exp", "expand_thresholds", "exponent",
    "exterior", "extinction", "face_indices", "facets", "fade_color",
    "fade_colour", "fade_distance", "fade_power", "falloff", "falloff_angle",
    "false", "fclose", "file_exists", "filter", "final_clock", "final_frame",
    "finish", "fisheye", "flatness", "flip", "floor", "focal_point", "fog",
    "fog_alt", "fog_offset", "fog_type", "fopen", "for", "form", "frame_number",
    "frequency", "fresnel", "function", "gamma", "gather", "gif",
    "global_lights", "global_settings", "gradient", "granite", "gray",
    "gray_threshold", "green", "height_field", "hexagon", "hf_gray_16",
    "hierarchy", "hypercomplex", "hollow", "if", "ifdef", "iff", "ifndef",
    "image_height", "image_map", "image_pattern", "image_width", "importance",
    "include", "initial_clock", "initial_frame", "input_file_name", "inside",
    "inside_vector", "int", "interior", "interior_texture", "internal",
    "interpolate", "intersection", "intervals", "inverse", "ior", "irid",
    "irid_wavelength", "isosurface", "jitter", "jpeg", "julia", "julia_fractal",
    "lambda", "lathe", "leopard", "light_group", "light_source",
    "linear_spline", "linear_sweep", "ln", "load_file", "local", "location",
    "log", "look_at", "looks_like", "low_error_factor", "macro", "magnet",
    "major_radius", "mandel", "map_type", "marble", "material", "material_map",
    "matrix", "max", "maximum_reuse", "max_extent", "max_gradient",
    "max_intersections", "max_iteration", "max_sample", "max_trace",
    "max_trace_level", "media", "media_attenuation", "media_interaction",
    "merge", "mesh", "mesh2", "metallic", "method", "metric", "min",
    "min_extent", "minimum_reuse", "mm_per_unit", "mod", "mortar",
    "natural_spline", "nearest_count", "no", "no_bump_scale", "no_image",
    "no_radiosity", "no_reflection", "no_shadow", "noise_generator", "normal",
    "normal_indices", "normal_map", "normal_vectors", "now", "number_of_waves",
    "object", "octaves", "off", "offset", "omega", "omnimax", "on", "once",
    "onion", "open", "orient", "orientation", "orthographic", "ovus",
    "panoramic", "parallel", "parametric", "pass_through", "pattern",
    "pavement", "perspective", "pgm", "phase", "phong", "phong_size", "photons",
    "pi", "pigment", "pigment_map", "pigment_pattern", "planar", "plane", "png",
    "point_at", "poly", "polynomial", "poly_wave", "polygon", "pot", "pow",
    "ppm", "precision", "precompute", "premultiplied", "pretrace_end",
    "pretrace_start", "prism", "prod", "projected_through", "pwr",
    "quadratic_spline", "quadric", "quartic", "quaternion", "quick_color",
    "quick_colour", "quilted", "radial", "radians", "radiosity", "radius",
    "rainbow", "ramp_wave", "rand", "range", "ratio", "read", "reciprocal",
    "recursion_limit", "red", "reflection", "reflection_exponent", "refraction",
    "render", "repeat", "rgb", "rgbf", "rgbft", "rgbt", "right", "ripples",
    "rotate", "roughness", "samples", "save_file", "scale", "scallop_wave",
    "scattering", "seed", "select", "shadowless", "sin", "sine_wave", "sinh",
    "sint8", "sint16be", "sint16le", "sint32be", "sint32le", "size", "sky",
    "sky_sphere", "slice", "slope", "slope_map", "smooth", "smooth_triangle",
    "solid", "sor", "spacing", "specular", "sphere", "sphere_sweep",
    "spherical", "spiral1", "spiral2", "spline", "split_union", "spotlight",
    "spotted", "sqr", "sqrt", "square", "srgb", "srgbf", "srgbt", "srgbft",
    "statistics", "str", "strcmp", "strength", "strlen", "strlwr", "strupr",
    "sturm", "substr", "subsurface", "sum", "superellipsoid", "switch", "sys",
    "t", "tan", "tanh", "target", "text", "texture", "texture_list",
    "texture_map", "tga", "thickness", "threshold", "tiff", "tightness",
    "tile2", "tiles", "tiling", "tolerance", "toroidal", "torus", "trace",
    "transform", "translate", "translucency", "transmit", "triangle",
    "triangle_wave", "triangular", "true", "ttf", "turb_depth", "turbulence",
    "type", "u", "uint8", "uint16be", "uint16le", "u_steps", "ultra_wide_angle",
    "undef", "union", "up", "use_alpha", "use_color", "use_colour", "use_index",
    "utf8", "uv_indices", "uv_mapping", "uv_vectors", "v", "v_steps", "val",
    "variance", "vaxis_rotate", "vcross", "vdot", "version", "vertex_vectors",
    "vlength", "vnormalize", "vrotate", "vstr", "vturbulence", "warning",
    "warp", "water_level", "waves", "while", "width", "wood", "wrinkles",
    "write", "x", "y", "yes", "z" ];

//------------------------------------------------------------------------------
// Definition of globalSettings parameter validations and error messages.
//------------------------------------------------------------------------------

cpov.gsDef = {
    desc: "The GlobalSettings class manages the variables that will be output "
        + "into the SDL global_settings block.",
    conArgs: false,
    conBlock: false,
    snippets: ["GlobalSettings.toSDL"],
    mutable: [
        {
            name:  "adcBailout",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "adcBailout must be a float greater than or equal to zero."
        }, {
            name:  "ambientLight",
            valid: "cpov.isClass(val, 'Color')",
            err:   "ambientLight must be a Color."
        }, {
            name:  "assumedGamma",
            valid: "cpov.isFloat(val)",
            err:   "assumedGamma must be a float."
        }, {
            name:  "charset",
            valid: "cpov.isInArray(val, ['ascii', 'utf8', 'sys'])",
            err:   "charset must be one of 'ascii', 'utf8', or 'sys'."
        }, {
            name:  "iridWavelength",
            valid: "cpov.isClass(val, 'Color')",
            err:   "iridWavelength must be a Color"
        }, {
            name:  "maxIntersections",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "maxIntersections must be an integer greater than or equal to zero."
        }, {
            name:  "maxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "maxTraceLevel must be an integer greater than or equal to zero."
        }, {
            name:  "mmPerUnit",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "mmPerUnit must be a float greater than or equal to zero."
        }, {
            name:  "noiseGenerator",
            valid: "cpov.isInt(val) && cpov.inArray(val, [1, 2, 3])",
            err:   "noiseGenerator must be an integer and one of 1, 2, or 3."
        }, {
            name:  "numberOfWaves",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "numberOfWaves must be an integer greater than or equal to zero."
        }, {
            name:  "photon",
            valid: "cpov.isBoolean(val)",
            err:   "photon must be a boolean."
        }, {
            name:  "photonAdcBailout",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "photonAdcBailout must be a float greater than or equal to zero."
        }, {
            name:  "photonAutostop",
            valid: "cpov.isFloat(val) && cpov.within(val, 0, 1)",
            err:   "photonAutostop must be a float within the unit interval (0.0 - 1.0)"
        }, {
            name:  "photonCount",                                                                          // TODO: cannot be used with photonSpacing
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonCount must be an integer greater than or equal to zero"
        }, {
            name:  "photonExpandThresholds",
            valid: "Array.isArray(val) && val.length == 2 && cpov.isFloat(val[0]) && cpov.isInt(val[1])",
            err:   "photonExpandThresholds must be an array consisting of a float and and integer."
        }, {
            name:  "photonGather",
            valid: "cpov.isArrayOfInts(val, 2, 2) && val[0] >= 0 && val[1] >= 0 && val[0] <= val[1]",
            err:   "photonGather must be an array of two integers greater than zero in ascending order."
        }, {
            name:  "photonJitter",
            valid: "cpov.isFloat(val)",
            err:   "photonJitter must be a float."
        }, {
            name:  "photonLoadFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonLoadFile must be a non-empty string."
        }, {
            name:  "photonMaxTraceLevel",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "photonMaxTraceLevel must be an integer greater than or equal to zero."
        }, {
            name:  "photonMedia",
            valid: "cpov.isArrayOfFloats(val, 2, 2)",
            err:   "photonMedia must be an array of two floats."
        }, {
            name:  "photonRadius",
            valid: "cpov.isArrayOfFloats(val, 4, 4)",
            err:   "photonRadius must be an array of four floats."
        }, {
            name:  "photonSaveFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "photonSaveFile must be a non-empty string."
        }, {
            name:  "photonSpacing",                                       // TODO: cannot be used with photonCount
            valid: "cpov.isFloat(val) && val > 0",
            err:   "photonSpacing must be a float greater than zero."
        }, {
            name:  "radAdcBailout",
            valid: "cpov.isFloat(val)",
            err:   "radAdcBailout must be a float."
        }, {
            name:  "radAlwaysSample",
            valid: "cpov.isBoolean(val)",
            err:   "radAlwaysSample must be a boolean."
        }, {
            name:  "radBrightness",
            valid: "cpov.isFloat(val)",
            err:   "radBrightness must be a float."
        }, {
            name:  "radCount",
            valid: "cpov.isArrayOfInts(val, 1, 2) && val[0] >= 1 && (val[1] === undefined || val[1] >= 1)",
            err:   "radCount must be an array of one or two integers, both of which must be greater than or equal to one."
        }, {
            name:  "radErrorBound",
            valid: "cpov.isFloat(val)",
            err:   "radErrorBound must be a float."
        }, {
            name:  "radGrayThreshold",
            valid: "cpov.isFloat(val) && cpov.isWithin(val, 0, 1)",
            err:   "radGrayThreshold must be a float in the unit interval (0.0 - 1.0)."
        }, {
            name:  "radiosity",
            valid: "cpov.isBoolean(val)",
            err:   "radiosity must be a boolean."
        }, {
            name:  "radLowErrorFactor",
            valid: "cpov.isFloat(val)",
            err:   "radLowErrorFactor must be a float."
        }, {
            name:  "radMaximumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMaximumReuse must be a float."
        }, {
            name:  "radMaxSample",
            valid: "cpov.isFloat(val)",
            err:   "radMaxSample must be a float."
        }, {
            name:  "radMinimumReuse",
            valid: "cpov.isFloat(val)",
            err:   "radMinimumReuse must be a float."
        }, {
            name:  "radNearestCount",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radNearestCount must be an integer in the range 1-20."
        }, {
            name:  "radNormal",
            valid: "cpov.isBoolean(val)",
            err:   "radNormal must be a boolean."
        }, {
            name:  "radPretraceEnd",
            valid: "cpov.isFloat(val) && cpov.isWithin(0, 1)",
            err:   "radPretraceEnd must be a float in the unit interval (0.0 - 1.0)"
        }, {
            name:  "radPretraceStart",
            valid: "cpov.isFloat(val) && cpov.isWithin(0, 1)",
            err:   "radPretraceStart must be a float in the unit interval (0.0 - 1.0)"
        }, {
            name:  "radRecursionLimit",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 20)",
            err:   "radRecursionLimit must be an integer in the range 1-20."
        }, {
            name:  "radSubsurface",
            valid: "cpov.isBoolean(val)",
            err:   "radSubsurface must be a boolean."
        }, {
            name:  "subRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "subRadiosity must be a boolean"
        }, {
            name:  "subSamples",
            valid: "cpov.isArrayOfInts(val, 2, 2)",
            err:   "subSamples must be an array of two integers."
        }, {
            name:  "subsurface",
            valid: "cpov.isBoolean(val)",
            err:   "subsurface must be a boolean."
        }
    ]
};


//------------------------------------------------------------------------------
// Definition of imageOptions parameter validations and error messages.
//------------------------------------------------------------------------------

cpov.ioDef = {
    desc: "The ImageOptions class manages the variables that will be output "
        + "into .ini files for each frame and which can, optionally, be emitted "
        + "in the form of command line switches.",
    conArgs: false,
    conBlock: false,
    snippets: ["ImageOptions.output"],
    mutable: [
        {
            name:  "allConsole",
            valid: "cpov.isBoolean(val)",
            err:   "allConsole must be a boolean."
        }, {
            name:  "allFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "allFile must be either a boolean or a non-empty string."
        }, {
            name:  "antialias",
            valid: "cpov.isBoolean(val)",
            err:   "antialias must be a boolean."
        }, {
            name:  "antialiasDepth",
            valid: "cpov.isInt(val) && cpov.isWithin(val, 1, 9)",
            err:   "antialiasDepth must be an integer in the range 1-9."
        }, {
            name:  "antialiasGamma",
            valid: "cpov.isFloat(val)",
            err:   "antialiasGamma must be a float."
        }, {
            name:  "antialiasThreshold",
            valid: "cpov.isFloat(val) && val >= 0",
            err:   "antialiasThreshold must be a float greater than or equal to zero."
        }, {
            name:  "appendFile",
            valid: "cpov.isBoolean(val)",
            err:   "appendFile must be a boolean."
        }, {
            name:  "bitsPerColor",
            valid: "cpov.isInt(val) && cpov.isWithin(5, 16)",
            err:   "bitsPerColor must be an integer in the range 5-16."
        }, {
            name:  "bounding",
            valid: "cpov.isBoolean(val)",
            err:   "bounding must be a boolean."
        }, {
            name:  "boundingMethod",
            valid: "cpov.isInt(val) && cpov.isWithin(1, 2)",
            err:   "boundingMethod must be either 1 or 2."
        }, {
            name:  "boundingThreshold",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "boundingThreshold must be an integer greater than or equal to zero."
        }, {
            name:  "bspBaseAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspBaseAccessCost must be a float."
        }, {
            name:  "bspChildAccessCost",
            valid: "cpov.isFloat(val)",
            err:   "bspChildAccessCost must be a float."
        }, {
            name:  "bspIsectCost",
            valid: "cpov.isFloat(val)",
            err:   "bspIsectCost must be a float."
        }, {
            name:  "bspMaxDepth",
            valid: "cpov.isInt(val) && val > 0",
            err:   "bspMaxDepth must be an integer greater than zero."
        }, {
            name:  "bspMissChance",
            valid: "cpov.isFloat(val)",
            err:   "bspMissChance must be a float."
        }, {
            name:  "continueTrace",
            valid: "cpov.isBoolean(val)",
            err:   "continueTrace must be a boolean"
        }, {
            name:  "createIni",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "createIni must be either a boolean or a non-empty string."
        }, {
            name:  "debugConsole",
            valid: "cpov.isBoolean(val)",
            err:   "debugConsole must be a boolean."
        }, {
            name:  "debugFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "debugFile must be either a boolean or a non-empty string."
        }, {
            name:  "display",
            valid: "cpov.isBoolean(val)",
            err:   "display must be a boolean"
        }, {
            name:  "displayGamma",
            valid: "cpov.isFloat(val) || (cpov.isString(val) && val == 'sRGB')",
            err:   "displayGamma must be either a float or the string 'sRGB'."
        }, {
            name:  "dither",
            valid: "cpov.isBoolean(val)",
            err:   "dither must be a boolean."
        }, {
            name:  "ditherMethod",
            valid: "cpov.isKey(val, cpov.ditherTypes)",
            err:   "ditherMethod must be one of " + cpov.keysToTextList(cpov.ditherTypes) + "."
        }, {
            name:  "endColumn",
            valid: "cpov.isInt(val) && val > 0",
            err:   "endColumn must be an integer greater than zero."
        }, {
            name:  "endRow",
            valid: "cpov.isInt(val) && val > 0",
            err:   "endRow must be an integer greater than zero."
        }, {
            name:  "exePath",
            valid: "cpov.isNonEmptyString(val)",
            err:   "exePath must be a non-empty string."
        }, {
            name:  "fatalConsole",
            valid: "cpov.isBoolean(val)",
            err:   "fatalConsole must be a boolean."
        }, {
            name:  "fatalErrorCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "fatalErrorCommand must be a non-empty string."
        }, {
            name:  "fatalErrorReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "fatalErrorReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "fatalFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "fatalFile must be either a boolean or a non-empty string."
        }, {
            name:  "fileGamma",
            valid: "cpov.isFloat(val) || val === 'sRGB'",
            err:   "fileGamma"
        }, {
            name:  "height",
            valid: "cpov.isInt(val) && val > 0",
            err:   "height must be an integer greater than zero."
        }, {
            name:  "highReproducibility",
            valid: "cpov.isBoolean(val)",
            err:   "highReproducibility must be a boolean"
        }, {
            name:  "includeHeader",
            valid: "cpov.isNonEmptyString(val)",
            err:   "includeHeader must be a non-empty string."
        }, {
            name:  "inputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "inputFileName must be a non-empty string."
        }, {
            name:  "jitter",
            valid: "cpov.isBoolean(val)",
            err:   "jitter must be a boolean."
        }, {
            name:  "jitterAmount",
            valid: "cpov.isFloat(val)",
            err:   "jitterAmount must be a float."
        }, {
            name:  "libraryPath",
            valid: "cpov.isNonEmptyString(val)",
            err:   "libraryPath must be a non-empty string."
        }, {
            name:  "maxImageBufferMemory",
            valid: "cpov.isInt(val) && val > 0",
            err:   "maxImageBufferMemory must be an integer greater than zero."
        }, {
            name:  "outputAlpha",
            valid: "cpov.isBoolean(val)",
            err:   "outputAlpha must be a boolean."
        }, {
            name:  "outputFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "outputFileName must be a non-empty string."
        }, {
            name:  "outputFileType",
            valid: "cpov.isKey(val, cpov.outputFileTypes)",
            err:   "outputFileType must be one of " + cpov.keysToTextList(cpov.outputFileTypes)
        }, {
            name:  "outputToFile",
            valid: "cpov.isBoolean(val)",
            err:   "outputToFile must be a boolean."
        }, {
            name:  "palette",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "palette"
        }, {
            name:  "pauseWhenDone",
            valid: "cpov.isBoolean(val)",
            err:   "pauseWhenDone must be a boolean."
        }, {
            name:  "postFrameCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "postFrameCommand must be a non-empty string."
        }, {
            name:  "postFrameReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "postFrameReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "postSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "postSceneCommand must be a non-empty string."
        }, {
            name:  "postSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "postSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "preFrameCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "preFrameCommand must be a non-empty string."
        }, {
            name:  "preFrameReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "preFrameReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "preSceneCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "preSceneCommand must be a non-empty string."
        }, {
            name:  "preSceneReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "preSceneReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "previewEndSize",
            valid: "cpov.isInt(val) && val > 0",
            err:   "previewEndSize must be an integer greater than zero"
        }, {
            name:  "previewStartSize",
            valid: "cpov.isInt(val) && val > 0",
            err:   "previewStartSize must be an integer greater than zero."
        }, {
            name:  "quality",
            valid: "cpov.isInt(val) && val >= 0 && val <= 11",
            err:   "quality must be an integer in the range (0 - 11)"
        }, {
            name:  "radiosityFileName",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityFileName must be a non-empty string."
        }, {
            name:  "radiosityFromFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityFromFile must be a non-empty string."
        }, {
            name:  "radiosityToFile",
            valid: "cpov.isNonEmptyString(val)",
            err:   "radiosityToFile must be a non-empty string."
        }, {
            name:  "radiosityVainPretrace",
            valid: "cpov.isBoolean(val)",
            err:   "radiosityVainPretrace must be a boolean."
        }, {
            name:  "removeBounds",
            valid: "cpov.isBoolean(val)",
            err:   "removeBounds must be a boolean."
        }, {
            name:  "renderBlockSize",
            valid: "cpov.isInt(val) && val >= 4",
            err:   "renderBlockSize must be an integer greater than or equal to 4."
        }, {
            name:  "renderBlockStep",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "renderBlockStep must be an integer greater than or equal to 1."
        }, {
            name:  "renderConsole",
            valid: "cpov.isBoolean(val)",
            err:   "renderConsole must be a boolean."
        }, {
            name:  "renderFile",
            valid: "cpov.isBoolean(val) && cpov.isNonEmptyString(val)",
            err:   "renderFile must be a boolean or a non-empty string."
        }, {
            name:  "renderPattern",
            valid: "cpov.isInt(val) && val >= 0 && val <= 5",
            err:   "renderPattern must be an integer in the range (0 - 5)."
        }, {
            name:  "samplingMethod",
            valid: "cpov.isInt(val) && val >= 1 && val <= 2",
            err:   "samplingMethod must be an integer in the range (1 - 2)."
        }, {
            name:  "splitUnions",
            valid: "cpov.isBoolean(val)",
            err:   "splitUnions must be a boolean."
        }, {
            name:  "startColumn",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "startColumn must be an integer greater than or equal to zero."
        }, {
            name:  "startRow",
            valid: "cpov.isInt(val) && val >= 0",
            err:   "startRow must be an integer greater than or equal to zero."
        }, {
            name:  "statisticConsole",
            valid: "cpov.isBoolean(val)",
            err:   "statisticConsole must be a boolean."
        }, {
            name:  "statisticFile",
            valid: "cpov.isBoolean || cpov.isNonEmptyString(val)",
            err:   "statisticFile must be a boolean or a non-empty string."
        }, {
            name:  "testAbort",
            valid: "cpov.isBoolean(val)",
            err:   "testAbort must be a boolean."
        }, {
            name:  "testAbortCount",
            valid: "cpov.isInt(val) && val >= 1",
            err:   "testAbortCount must be an integer greater than or equal to one."
        }, {
            name:  "userAbortCommand",
            valid: "cpov.isNonEmptyString(val)",
            err:   "userAbortCommand must be a non-empty string."
        }, {
            name:  "userAbortReturn",
            valid: "cpov.isKey(val, cpov.returnActions)",
            err:   "userAbortReturn must be one of " + cpov.keysToTextList(cpov.returnActions) + "."
        }, {
            name:  "verbose",
            valid: "cpov.isBoolean(val)",
            err:   "verbose must be a boolean."
        }, {
            name:  "videoMode",
            valid: "cpov.isString(val) && val.length == 1",
            err:   "videoMode must be a single character."
        }, {
            name:  "warningConsole",
            valid: "cpov.isBoolean(val)",
            err:   "warningConsole must be a boolean."
        }, {
            name:  "warningFile",
            valid: "cpov.isBoolean(val) || cpov.isNonEmptyString(val)",
            err:   "warningFile must be a boolean or a non-empty string."
        }, {
            name:  "warningLevel",
            valid: "cpov.isInt(val) && (val == 0 || val == 5 || val == 10)",
            err:   "warningLevel must be one of 0, 5, or 10."
        }, {
            name:  "width",
            valid: "cpov.isInt(val) && val > 0",
            err:   "width must be an integer greater than zero."
        }, {
            name:  "workThreads",
            valid: "cpov.isInt(val) && val >= 1 && val <= 512",
            err:   "workThreads must be an integer in the range (1 - 512)."
        }
    ]
};


//------------------------------------------------------------------------------
// Defines the types and validity tests for properties which are common to
// all primitive objects.
//------------------------------------------------------------------------------

cpov.objCommon = {
    desc: "The Primitive class implements parameters and functionality that are "
        + "shared across (nearly) all geometric primitives.",
    conArgs: false,
    conBlock: "Primitive.conBlock",
    snippets: [ "Primitive.toSDL", "Primitive.destroy" ],
    mutable: [
        {
            name:  "active",
            valid: "cpov.isBoolean(val)",
            err:   "active must be a boolean."
        }, {
            name:  "baseTransform",
            valid: "cpov.isClass(val, 'Matrix')",
            err:   "baseTransform must be a Matrix."
        }, {
            name:  "boundedBy",
            valid: "cpov.inheritsFrom('Primitive') ",  // TODO: limit to actual allowable Primitives.
            err:   "boundedBy must be a Primitive."
        }, {
            name:  "children",
            valid: "cpov.isArrayOfSubclass(val, 'Primitive')",
            err:   "children must be an array of Primitives."
        }, {
            name:  "clippedBy",
            valid: "cpov.inheritsFrom(val, 'Primitive')",
            err:   "clippedBy must be a Primitive."
        }, {
            name:  "doubleIlluminate",
            valid: "cpov.isBoolean(val)",
            err:   "doubleIlluminate must be a boolean."
        }, {
            name:  "finish",
            valid: "cpov.isClass(val, 'Finish')",
            err:   "finish must be a Finish."
        }, {
            name:  "frameBegin",
            valid: "typeof val == 'function'",
            err:   "frameBegin must be a JavaScript function."
        }, {
            name:  "frameEnd",
            valid: "typeof val == 'function'",
            err:   "frameEnd must be a JavaScript function."
        }, {
            name:  "hollow",
            valid: "cpov.isBoolean(val)",
            err:   "hollow must be a boolean."
        }, {
            name:  "id",
            valid: "cpov.isNonEmptyString(val) && cpov.isUnusedId(val, this)",
            err:   "id must be a non-empty string."
        }, {
            name:  "interior",
            valid: "cpov.isClass(val, 'Interior')",
            err:   "interior must be an Interior."
        }, {
            name:  "inverse",
            valid: "cpov.isBoolean(val)",
            err:   "inverse must be a boolean."
        }, {
            name:  "material",
            valid: "cpov.isClass(val, 'Material')",
            err:   "material must be a Material."
        }, {
            name:  "noImage",
            valid: "cpov.isBoolean(val)",
            err:   "noImage must be a boolean."
        }, {
            name:  "noRadiosity",
            valid: "cpov.isBoolean(val)",
            err:   "noRadiosity must be a boolean."
        }, {
            name:  "noReflection",
            valid: "cpov.isBoolean(val)",
            err:   "noReflection must be a boolean."
        }, {
            name:  "noShadow",
            valid: "cpov.isBoolean(val)",
            err:   "noShadow must be a boolean."
        }, {
            name:  "parent",
            valid: "cpov.inheritsFrom(val, 'Primitive')",
            err:   "parent must be a Primitive."
        }, {
            name:  "photons", //          type: "Photons",    test: null }, TODO FIXME
            valid: "",
            err:   "photons"
        }, {
            name:  "radiosity", //        type: "Radiosity",  test: null }, TODO FIXME
            valid: "",
            err:   "radiosity"
        }, {
            name:  "serial",
            valid: "cpov.isInt(val) && cpov.isUnusedSerial(val, this)",
            err:   "serial must be an integer."
        }, {
            name:  "texture",
            // valid: "cpov.isClass(val, 'Texture')",         // Temporarily, we will fake having
            // err:   "texture must be a Texture."            // a texture subsystem by letting users
            valid: "cpov.isString(val)",                      // just stick an SDL string in its
            err: "texture must be a string (for now)."        // place.
        }, {
            name:  "transform",
            valid: "cpov.isClass(val, 'Matrix')",
            err:   "transform must be a Matrix.",
            custom: "Primitive.transform.get-set"
        }
    ]
};


//------------------------------------------------------------------------------
// Definitions of parameters for primitive geometric objects.
//
// TODO: "mesh2" needs to be added once I understand it better.
//------------------------------------------------------------------------------

cpov.objDef = {

    // TODO: need way to specify special methods, e.g., editing the components array

    blob: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Blob.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "components",
                req:   true,
                valid: "cpov.isClass(val, ['Sphere', 'Cylinder']) && components.length",
                err:   "components must be an array of Spheres and/or Cylinders."
            }, {
                name:  "threshold",
                valid: "cpov.isFloat(val)",
                err:   "threshold"
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean."
            }
        ],
    },

    box: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Box.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "corner1",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner1 must be a VectorXYZ."
            }, {
                name:  "corner2",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner2"
            }
        ],

    },

    //--------------------------------------------------------------------------
    // The camera type isn't really a primitive in SDL, but we're going to
    // treat it as one for most purposes and fake it in CSG objects.
    //--------------------------------------------------------------------------

    camera: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Camera.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: true },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isInArray(val, ['perspective', 'orthographic', 'fisheye', 'ultra_wide_angle', 'omnimax', 'panoramic', 'spherical', 'cylinder', 'mesh_camera'])",
                err:   "type must be one of perspective, orthographic, fisheye, ultra_wide_angle, omnimax, panoramic, spherical, cylinder, or mesh_camera."
            }, {
                name:  "angle", //        type: "FIXME" }, // TODO
                valid: "",
                err:   "angle"
            }, {
                name:  "apertureSize",
                valid: "cpov.isFloat(val)",
                err:   "apertureSize must be a float."
            }, {
                name:  "blurSamples",
                valid: "cpov.isArrayOfFloats(val, 2, 2) && val[0] >= 0 && val[1] >= 0",
                err:   "blurSamples must be an array of two floats greater than or equal to zero."
            }, {
                name:  "bokeh",
                valid: "cpov.isClass(val, 'Color') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0",
                err:   "bokeh must be a Color in the range <0, 0, 0> to <1, 1, 0>."
            }, {
                name:  "confidence",
                valid: "cpov.isFloat(val)",
                err:   "confidence must be a float."
            }, {
                name:  "cylinderType",
                valid: "cpov.isInt(val) && val > 0 && val < 5",
                err:   "cylinderType must be an integer in the range (1 - 4)."
            }, {
                name:  "direction",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "direction must be a VectorXYZ."
            }, {
                name:  "focalPoint",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "focalPoint must be a VectorXYZ."
            }, {
                name:  "location",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "location must be a VectorXYZ."
            }, {
                name:  "lookAt",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "lookAt must be a VectorXYZ."
            }, {
                name:  "right",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "right must be a VectorXYZ."
            }, {
                name:  "sky",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "sky must be a VectorXYZ."
            }, {
                name:  "up",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "up must be a VectorXYZ."
            }, {
                name:  "variance",
                valid: "cpov.isFloat(val)",
                err:   "variance must be a float."
            }, {
                name:  "vertAngle",
                valid: "cpov.isInt(val)",
                err:   "vertAngle must be an integer."
            }
        ]
    },

    cone: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Cone.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "basePoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "basePoint must be a VectorXYZ."
            }, {
                name:  "baseRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "baseRadius must be a float."
            }, {
                name:  "capPoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "capPoint must be a VectorXYZ."
            }, {
                name:  "capRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "capRadius must be a float."
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean."
            }
        ],
    },

    cylinder: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Cylinder.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "basePoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "basePoint must be a VectorXYZ."
            }, {
                name:  "capPoint",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "capPoint must be a VectorXYZ."
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float."
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean."
            }, {
                name:  "strength", // only used when the cylinder is a blob component
                valid: "cpov.isFloat(val)",
                err:   "strength must be a float"
            }
        ],
    },

    heightField: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["HeightField.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "source",
                req:   true,
                valid: "cpov.isSDLFunction(val) || cpov.isString(val)",
                err:   "source"
            }, {
                name:  "hfType", // only used if source is image instead of function
                valid: "cpov.isInArray(val, cpov.hfTypes)",
                err:   "hfType must be one of " + cpov.arrayToTextList(cpov.hfTypes) + "."
            }, {
                name:  "smooth",
                valid: "cpov.isBoolean(val)",
                err:   "smooth must be a boolean."
            }, {
                name:  "waterLevel",
                valid: "cpov.isFloat(val)",
                err:   "waterLevel must be a float."
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean."
            }, {
                name:  "gamma",
                valid: "cpov.isFloat(val)",
                err:   "gamma must be a float."
            }, {
                name:  "premult",
                valid: "cpov.isBoolean(val)",
                err:   "premult must be a boolean."
            }
        ],
    },

    isoSurface: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "source",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "source must be an SDL function."
            }, {
                name:  "containedBy",
                valid: "cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box')",
                err:   "containedBy must be a Sphere or a Box."
            }, {
                name:  "threshold",
                valid: "cpov.isFloat(val)",
                err:   "threshold"
            }, {
                name:  "accuracy",
                valid: "cpov.isFloat(val)",
                err:   "accuracy must be a float."
            }, {
                name:  "maxGradient",
                valid: "cpov.isFloat(val)",
                err:   "maxGradient must be a float."
            }, {
                name:  "evaluate",
                valid: "cpov.isArrayOfFloats(val, 3, 3)",
                err:   "evaluate must be an array of three floats."
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean."
            }, {
                name:  "maxTrace",
                valid: "cpov.isInt(val) || (typeof val == 'string' && val == 'allIntersections')",
                err:   "maxTrace must be either an integer or 'allIntersections'."
            }
        ],
    },

    juliaFractal: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["JuliaFractal.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.inArray(val, cpov.juliaFractalTypes)",
                err:   "type must be one of " + cpov.arrayToTextList(cpov.juliaFractalTypes) + "."
            }, {
                name:  "juliaParam",
				req:   true,
                valid: "cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val))",
                err:   "juliaParam must be a VectorXYZW."
            }, {
                name:  "power",
                valid: "cpov.isClass(val, 'VectorXY') || (val = cpov.convertToVector('VectorXY', val))",
                err:   "power must be a VectorXY."
            }, {
                name:  "maxIter",
                valid: "cpov.isInt(val)",
                err:   "maxIter must be an integer."
            }, {
                name:  "precision",
                valid: "cpov.isInt(val)",
                err:   "precision must be an integer."
            }, {
                name:  "slice",
                valid: "cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val))",
                err:   "slice must be a VectorXYZW."
            }, {
                name:  "distance",
                valid: "cpov.isFloat(val)",
                err:   "distance must be a float."
            }
        ],
    },

    lathe: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Lathe.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.splineTypes)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.splineTypes) + "."
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity)",
                err:   "points must be an array of two or more VectorXY."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    lightSource: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["LightSource.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "location",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "location must be a VectorXYZ."
            }, {
                name:  "color",
                req:   true,
                valid: "cpov.isClass(val, 'Color') || (val = cpov.convertToVector('Color', val))",
                err:   "color must be a Color."
            }, {
                name:  "adaptive",
                valid: "cpov.isFloat(val) && val >= 0",
                err:   "adaptive must be a float greater than or equal to zero."
            }, {
                name:  "areaIllumination",
                valid: "cpov.isBoolean(val)",
                err:   "areaIllumination must be a boolean."
            }, {
                name:  "areaLight",
                valid: "cpov.isBoolean(val)",
                err:   "areaLight must be a boolean."
            }, {
                name:  "axis1",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "axis1 must be a VectorXYZ."
            }, {
                name:  "axis2",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "axis2 must be a VectorXYZ."
            }, {
                name:  "circular",
                valid: "cpov.isBoolean(val)",
                err:   "circular must be a boolean."
            }, {
                name:  "fadeDistance",
                valid: "cpov.isFloat(val) && val > 0.",
                err:   "fadeDistance must be a float greater than zero."
            }, {
                name:  "fadePower",
                valid: "cpov.isFloat(val)",
                err:   "fadePower must be a float."
            }, {
                name:  "falloff",
                valid: "cpov.isFloat(val) && val < 90.",
                err:   "falloff must be a float less than 90."
            }, {
                name:  "jitter",
                valid: "cpov.isBoolean(val)",
                err:   "jitter must be a boolean."
            }, {
                name:  "looksLike",
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "looksLike must be a Primitive."
            }, {
                name:  "mediaAttenuation", // TODO
                valid: "cpov.isBoolean(val)",
                err:   "mediaAttenuation must be a boolean."
            }, {
                name:  "mediaInteraction", // TODO
                valid: "cpov.isBoolean(val)",
                err:   "mediaInteraction must be a boolean."
            }, {
                name:  "orient",
                valid: "cpov.isBoolean(val)",
                err:   "orient must be a boolean."
            }, {
                name:  "parallel",
                valid: "cpov.isBoolean(val)",
                err:   "parallel must be a boolean."
            }, {
                name:  "pointAt",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "pointAt must be a VectorXYZ."
            }, {
                name:  "projectedThrough",
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "projectedThrough"
            }, {
                name:  "radius",
                valid: "cpov.isFloat(val) && val < 90",
                err:   "radius must be a float less than 90."
            }, {
                name:  "shadowless",
                valid: "cpov.isBoolean(val)",
                err:   "shadowless must be a boolean."
            }, {
                name:  "size1",
                valid: "cpov.isFloat(val) && val > 0",
                err:   "size1 must be a float greater than zero."
            }, {
                name:  "size2",
                valid: "cpov.isFloat(val) && val > 0",
                err:   "size2 must be a float greater than zero."
            }, {
                name:  "tightness",
                valid: "cpov.isFloat(val) && val >= 0 && val <= 100",
                err:   "tightness must be a float in the range (0 - 100)."
            }, {
                name:  "type",
                valid: "cpov.isString(val) && (val == 'spotlight' || val == 'cylinder')",
                err:   "type must be either 'spotlight' or 'cylinder'."
            }
        ],
    },

    ovus: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Ovus.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
        {
            name:  "bottomRadius",
            req:   true,
            valid: "cpov.isFloat(val)",
            err:   "bottomRadius must be a float."
        }, {
            name:  "topRadius",
            req:   true,
            valid: "cpov.isFloat(val)",
            err:   "topRadius must be a float."
        }
        ],

    },

    parametric: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Parametric.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "funcX",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcX must be an SDL function."
            }, {
                name:  "funcY",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcY must be an SDL function."
            }, {
                name:  "funcZ",
                req:   true,
                valid: "cpov.isSDLFunction(val)",
                err:   "funcZ must be an SDL function."
            }, {
                name:  "uv1",
                req:   true,
                valid: "cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val))",
                err:   "uv1 must be a VectorUV."
            }, {
                name:  "uv2",
                req:   true,
                valid: "cpov.isClass(val, 'VectorUV') || (val = cpov.convertToVector('VectorUV', val))",
                err:   "uv2 must be a VectorUV."
            }, {
                name:  "containedBy",
                valid: "cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box')",
                err:   "containedBy must be a Sphere or Box."
            }, {
                name:  "maxGradient",
                valid: "cpov.isFloat(val)",
                err:   "maxGradient must be a float."
            }, {
                name:  "accuracy",
                valid: "cpov.isFloat(val)",
                err:   "accuracy must be a float."
            }, {
                name:  "precomputeDepth",
                valid: "cpov.isInt(val)",
                err:   "precomputeDepth must be an integer."
            }, {
                name:  "precomputeX",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeX must be a boolean."
            }, {
                name:  "precomputeY",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeY must be a boolean."
            }, {
                name:  "precomputeZ",
                valid: "cpov.isBoolean(val)",
                err:   "precomputeZ must be a boolean."
            }
        ],
    },

    prism: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Prism.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.prismTypes)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.prismTypes) + "."
            }, {
                name:  "height1",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "height1 must be a float."
            }, {
                name:  "height2",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "height2 must be a float"
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 0, Infinity)",
                err:   "points must be an array of VectorXY."
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    sphere: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Sphere.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "center",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "center must be a VectorXYZ."
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float."
            }, {
                name:  "strength",    // only used when used as a blob component
                valid: "cpov.isFloat(val)",
                err:   "strength must be a float."
            }
        ],
    },

    sphereSweep: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["SphereSweep.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isKey(val, cpov.internalSplineTypes)",
                err:   "type must be one of " + cpov.keysToTextList(cpov.internalSplineTypes) + "."
            }, {
                name:  "spheres",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'Sphere', 2, infinity)",
                err:   "spheres must be an an array of two or more Sphere."
            }, {
                name:  "tolerance",
                valid: "cpov.isFloat(val)",
                err:   "tolerance must be a float."
            }
        ],
    },

    superellipsoid: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "e",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "e must be a float."
            },
			{
                name:  "n",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "n must be a float."
            }
        ],

    },

    sor: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Sor.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity)",
                err:   "points must be an array of two or more VectorXY."
            }, {
                name:  "open",
                valid: "cpov.isBoolean(val)",
                err:   "open must be a boolean."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    text: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Text.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
			{
				name:  "fontType",
				req:   true,
				valid: "cpov.isKey(val, cpov.fontTypes)",
				err:   "fontType must be one of " + cpov.keysToTextList(cpov.fontTypes) + "."
            }, {
                name:  "font",
                req:   true,
                valid: "cpov.isNonEmptyString(val)",
                err:   "font must be a non-empty string."
            }, {
                name:  "displayText",
                req:   true,
                valid: "cpov.isNonEmptyString(val)",
                err:   "displayText must be a non-empty string."
            }, {
                name:  "thickness",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "thickness must be a float."
            }, {
                name:  "offset",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "offset must be a float."
            }
        ],

    },

    torus: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Torus.toSDL"],
        immutable: { finite: true, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "majorRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "majorRadius must be a float."
            }, {
                name:  "minorRadius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "minorRadius must be a float."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    bicubicPatch: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["BicubicPatch.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "type",
                req:   true,
                valid: "cpov.isInt(val) && (val == 0 || val == 1)",
                err:   "type must be either 0 or 1."
            }, {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXYZ', 16, 16)",
                err:   "points must be an array of 16 VectorXYZ."
            }, {
                name:  "uSteps",
                valid: "cpov.isInt(val)",
                err:   "uSteps must be an integer."
            }, {
                name:  "vSteps",
                valid: "cpov.isInt(val)",
                err:   "vSteps must be an integer."
            }, {
                name:  "flatness",
                valid: "cpov.isFloat(val)",
                err:   "flatness must be a float."
            }
        ],
    },

    disc: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Disc.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "center",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "center must be a VectorXYZ."
            }, {
                name:  "normal",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal must be a VectorXYZ."
            }, {
                name:  "radius",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "radius must be a float."
            }, {
                name:  "holeRadius",
                valid: "cpov.isFloat(val)",
                err:   "holeRadius must be a float."
            }
        ],
    },

    mesh: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "triangles",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'Triangle', 1, Infinity)",
                err:   "triangles"
            }, {
                name:  "insideVector",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "insideVector must be a VectorXYZ."
            }, {
                name:  "hierarchy",
                valid: "cpov.isBoolean(val)",
                err:   "hierarchy must be a boolean."
            }
        ],
    },

/*

// Deferred pending further research

    mesh2: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [ ],

    },
*/

    polygon: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Polygon.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "points",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'VectorXY', 3, Infinity)",
                err:   "points must be an array of three or more VectorXY."
            }
        ],

    },

    triangle: {               // combines triangle and smooth_triangle
        desc: "The Triangle class combines POV-Ray's triangle and smooth_triangle "
            + "based on the supplied parameters and the smooth flag.",
        conArgs: false,
        conBlock: false,
        snippets: ["Triangle.toSDL"],
        immutable: { finite: true, solid: false, csg: false, pseudo: false },
        mutable: [
            {
                name:  "corner1",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner1 must be a VectorXYZ."
            }, {
                name:  "corner2",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner2 must be a VectorXYZ."
            }, {
                name:  "corner3",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "corner3 must be a VectorXYZ."
            }, {
                name:  "smooth", // if smooth and normal1...3 are defined, it's a smooth triangle
                valid: "cpov.isBoolean(val)",
                err:   "smooth must be a boolean."
            }, {
                name:  "normal1",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal1 must be a VectorXYZ."
            }, {
                name:  "normal2",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal2 must be a VectorXYZ."
            }, {
                name:  "normal3",
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal3 must be a VectorXYZ."
            }, {
                name:  "textures",
                valid: "cpov.isArrayOfInt(val)",
                err:   "textures must be an array of integers."
            }
        ],
    },

    plane: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Plane.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "normal",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZ') || (val = cpov.convertToVector('VectorXYZ', val))",
                err:   "normal must be a VectorXYZ."
            }, {
                name:  "distance",
                req:   true,
                valid: "cpov.isFloat(val)",
                err:   "distance must be a float."
            }
        ],

    },

    poly: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Poly.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "order",
                req:   true,
                valid: "cpov.isInt(val) && val >= 2 && val <= 35",
                err:   "order must be an integer in the range (."
            }, {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 1, Infinity)",   // FIXME
                err:   "coefficients must be an array of floats."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    cubic: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Cubic.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 20, 20)",
                err:   "coefficients must be an array of 20 floats."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    quartic: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Quartic.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 35, 35)",
                err:   "coefficients must be an array of 35 floats."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    polynomial: {                                             // This will require better understanding of the
        desc: false,                                          // underlying maths than I currently have to validate.
        conArgs: false,
        conBlock: false,
        snippets: false,
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "order",
                req:   true,
                valid: "cpov.isInt(val)",
                err:   "order must be an integer."
            }, {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isClass(val, 'VectorXYZW') || (val = cpov.convertToVector('VectorXYZW', val))",
                err:   "coefficients must be a VectorXYZW."
            }, {
                name:  "sturm",
                valid: "cpov.isBoolean(val)",
                err:   "sturm must be a boolean."
            }
        ],
    },

    quadric: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Quadric.toSDL"],
        immutable: { finite: false, solid: true, csg: false, pseudo: false },
        mutable: [
            {
                name:  "coefficients",
                req:   true,
                valid: "cpov.isArrayOfFloats(val, 10, 10)",
                err:   "coefficients must be an array of 10 floats."
            }
        ],

    },

    union: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Union.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:  "objects",
                req:   true,
                valid: "cpov.isArrayOfClass(val, 'Primitive')",
                err:   "objects must be an array of Primitives."
            }, {
                name:  "splitUnion",
                valid: "cpov.isBoolean(val)",
                err:   "splitUnion must be a boolean."
            }
        ]
    },

    intersection: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Intersection.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:  "objects",
                valid: "cpov.isArrayOfClass(val, 'Primitive')",
                err:   "objects must be an array of Primitives."
            }
        ],
    },

    difference: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Difference.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:  "positiveObject",
                req:   true,
                valid: "cpov.inheritsFrom(val, 'Primitive')",
                err:   "positiveObject must be a Primitive."
            }, {
                name:  "negativeObjects",
                valid: "cpov.isArrayOfClass(val, 'Primitive')",
                err:   "negativeObjects must be an array of Primitives."
            }
        ],
    },

    merge: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Merge.toSDL"],
        immutable: { finite: null, solid: true, csg: true },
        mutable: [
            {
                name:  "objects",
                valid: "cpov.isArrayOfClass(val, 'Primitive')",
                err:   "objects must be an array of Primitives."
            }
        ],
    },

};


cpov.vectorDef = {
    VectorXY: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXY.conBlock",
        snippets: ["VectorXY.copy", "VectorXY.toSDL"],
        mutable: [
            {
                name:  "x",
                valid: "cpov.isFloat(val)",
                err:   "x must be a float."
            }, {
                name:  "y",
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            },
        ],
    },
    VectorUV: {
        desc: false,
        conArgs: false,
        conBlock: "VectorUV.conBlock",
        snippets: ["VectorUV.copy", "VectorUV.toSDL"],
        mutable: [
            {
                name:  "u",
                valid: "cpov.isFloat(val)",
                err:   "u must be a float."
            }, {
                name:  "v",
                valid: "cpov.isFloat(val)",
                err:   "v must be a float."
            },
        ],
    },
    VectorXYZ: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZ.conBlock",
        snippets: ["VectorXYZ.copy", "VectorXYZ.toSDL"],
        mutable: [
            {
                name:  "x",
                valid: "cpov.isFloat(val)",
                err:   "x must be a float."
            }, {
                name:  "y",
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            }, {
                name:  "z",
                valid: "cpov.isFloat(val)",
                err:   "z must be a float."
            },
        ],
    },
    VectorXYZW: {
        desc: false,
        conArgs: false,
        conBlock: "VectorXYZW.conBlock",
        snippets: ["VectorXYZW.copy", "VectorXYZW.toSDL"],
        mutable: [
            {
                name:  "x",
                valid: "cpov.isFloat(val)",
                err:   "x must be a float."
            }, {
                name:  "y",
                valid: "cpov.isFloat(val)",
                err:   "y must be a float."
            }, {
                name:  "z",
                valid: "cpov.isFloat(val)",
                err:   "z must be a float."
            }, {
                name:  "w",
                valid: "cpov.isFloat(val)",
                err:   "w must be a float."
            },
        ],
    },
    Color: {
        desc: false,
        conArgs: false,
        conBlock: "Color.conBlock",
        snippets: ["Color.copy", "Color.toSDL"],
        mutable: [
            {
                name:  "r",
                valid: "cpov.isFloat(val)",
                err:   "r must be a float."
            }, {
                name:  "g",
                valid: "cpov.isFloat(val)",
                err:   "g must be a float."
            }, {
                name:  "b",
                valid: "cpov.isFloat(val)",
                err:   "b must be a float."
            }, {
                name:  "f",
                valid: "cpov.isFloat(val)",
                err:   "f must be a float."
            }, {
                name:  "t",
                valid: "cpov.isFloat(val)",
                err:   "t must be a float."
            }, {
                name:  "srgb",
                valid: "cpov.isBoolean(val)",
                err:   "srgb must be a boolean."
            },
        ],
    },
    Matrix: {
        desc: false,
        conArgs: false,
        conBlock: false,
        snippets: ["Matrix.copy", "Matrix-methods"],
        mutable: [
            {
                name:  "v00",
                valid: "cpov.isFloat(val)",
                err:   "v00 must be a float."
            }, {
                name:  "v01",
                valid: "cpov.isFloat(val)",
                err:   "v01 must be a float."
            }, {
                name:  "v02",
                valid: "cpov.isFloat(val)",
                err:   "v02 must be a float."
            }, {
                name:  "v10",
                valid: "cpov.isFloat(val)",
                err:   "v10 must be a float."
            }, {
                name:  "v11",
                valid: "cpov.isFloat(val)",
                err:   "v11 must be a float."
            }, {
                name:  "v12",
                valid: "cpov.isFloat(val)",
                err:   "v12 must be a float."
            }, {
                name:  "v20",
                valid: "cpov.isFloat(val)",
                err:   "v20 must be a float."
            }, {
                name:  "v21",
                valid: "cpov.isFloat(val)",
                err:   "v21 must be a float."
            }, {
                name:  "v22",
                valid: "cpov.isFloat(val)",
                err:   "v22 must be a float."
            }, {
                name:  "v30",
                valid: "cpov.isFloat(val)",
                err:   "v30 must be a float."
            }, {
                name:  "v31",
                valid: "cpov.isFloat(val)",
                err:   "v31 must be a float."
            }, {
                name:  "v32",
                valid: "cpov.isFloat(val)",
                err:   "v32 must be a float."
            },
        ]
    }
}


//==============================================================================
// Returns a string consisting of stops copies of four space characters.
//==============================================================================

cpov.tab = function tab(stops) {
    if(stops)
        return new Array(stops).fill("    ").join("");
    else
        return "";
}


//==============================================================================
// Prints an error message to console if permitted by the current verbosity
// level, and if the error is fatal, terminates the process.
//==============================================================================

cpov.error = function(level, message, location = "CEPHALOPOV", obj = null) {

    var instance = '';

    if(obj !== null && cpov.inheritsFrom(obj, "Primitive"))
        instance = " (" + cpov.primitiveIdentifier(obj) + ")";



    if(!cpov.quietMode) {
        switch(level) {
            case "fatal":
                console.log(cpov.chalk.bgRed.yellowBright("[" + location + "]") + cpov.chalk.redBright(" FATAL ERROR: ") + cpov.chalk.yellowBright(message + instance));
                break;
            case "warn":
                if(cpov.verbosity >= 1)
                    console.log(cpov.chalk.bgMagenta.whiteBright("[" + location + "]") + cpov.chalk.whiteBright(" Warning: ") + message + instance);
                break;
            case "info":
                if(cpov.verbosity >= 2)
                    console.log(cpov.chalk.whiteBright("[" + location + "] INFO: ") + message + instance);
                break;
            case "debug":
                if(cpov.verbosity >= 3 || cpov.debug)
                    console.log("[" + location + "] DEBUG: " + message + instance);
                break;
        }
    }

    if(level == "fatal")
        cpov.process.exit(1);
}


//==============================================================================
// Reads from the supplied filename and returns an object whose keys are
// defined by specially formatted comments in the file and whose values are
// the lines in between those comments, with leading and trailing whitespace
// trimmed. The comments are formatted thus:
//
//          // Keyname // (anything after the second // is ignored)
//          ^
//          |
//          +------------- first column
//
// Note that the spaces on either side of the keyname are mandatory and that
// there cannot be any spaces in the keyname itself.
//==============================================================================

cpov.objectImport = function(filename) {
    var fp       = new cpov.File(filename, "r");
    var contents = fp.read().trim().split(/\n/);
    contents.push("");
    fp.close();

    var result   = { };
    var label    = null;
    var value    = [ ];
    var match    = null;

    for(var i = 0; i < contents.length; i++) {
        if(i == contents.length - 1 || (match = contents[i].match(/^\/\/ +(\S+) +\/\//))) {
            if(label) {
                result[label] = value.join("\n").trim();
            }
            if(match && match[1]) {
                label = match[1];
                value = [ ];
            }
            continue;
        }
        value.push(contents[i]);
    }
    if(label) {
        result[label] = value.join("\n").trim();
    }

    return result;
}


//==============================================================================
// Common initialization/load routine for objects. Given an object reference and
// an object containing named attributes, attempts to assign them to the
// corresponding object attributes. Attributes that do not exist will be
// ignored. This routine is used where a conBlock is not defined.
//==============================================================================

cpov.initObject = function(obj, vals) {
    for(var k in vals) {
        if(k == "serial")
            continue;
        if(obj[k] != undefined) {
            obj[k] = vals[k];
        }
    }
}


//==============================================================================
// Given a block of text in the form of a single string, preface each line with
// the specified number of tab stops.
//==============================================================================

cpov.indentTextBlock = function(block, stops) {
    block = block.split(/\n/);
    var tab = cpov.tab(stops);
    if(block[0] !== undefined)
        block[0] = tab + block[0];
    return block.join("\n" + tab);
}


//==============================================================================
// Given a Primitive object, returns a string identifying it by serial and, if
// available, id.
//==============================================================================

cpov.primitiveIdentifier = function(obj) {
    var result = [ ];
    result.push(obj.serial);
    if(obj.id !== null)
        result.push(obj.id);
    return result.join(":");
}



//==============================================================================
// Simple commandline parser that supports short and long switches both with and
// without arguments. Takes an optionMap like so:
//
//    var optionMap = {
//        infile:     { short: "i", vals: [ ] },  // accumulates values
//        outfiles:   { short: "o", vals: [ ] },
//        preamble:   { short: "p", vals: [ ] },
//        sdlinclude: { short: "s", vals: [ ] },
//        verbose:    { short: "v", cnt: 0 },     // accumulates appearance counts
//        quietMode:  { short: "q", cnt: 0 },
//        debug:      { short: "d", cnt: 0 },
//        help:       { short: "h", cnt: 0 },
//    }
//
// The keys of the optionMap are the long options, the short members in the value
// objects are the short options. If a vals array is provided, arguments to the
// switch are accumulated therein. If a cnt counter is provided, the number of
// appearances of the switch are counted therein. You can't do both.
//
// The optionMap is altered in place. Bails with a call to cpov.error if
// malformed user input is encountered.
//==============================================================================

cpov.parseCLI = function(optionMap) {

    var currentArg = null;

    for(var a = 2; a < process.argv.length; a++) {
        var item   = process.argv[a];
        var match  = item.match(/^(-+)?(\S+)/);
        var dashes = match[1] === undefined ? 0 : match[1].length;
        var arg    = match[2];

        if(dashes == 1) {

            if(arg.length > 1) {   // Just split composite simple args

                var args = arg.split("");

                for(var i = 0; i < args.length; i++) {
                    process.argv.splice(a + 1 + i, 0, "-" + args[i]);
                }
                continue;

            } else {  // Convert simple args to long args

                var complex = null;
                for(var i in optionMap) {
                    if(optionMap[i].short == arg) {
                        complex = i;
                        break;
                    }
                }

                if(complex === null) {
                    cpov.error("fatal", "Unknown commandline switch '-" + arg + "'", "CEPHALOPOV");
                } else {
                    arg = complex;
                    dashes = 2;
                }

            }

        }

        if(dashes == 2) {

            if(optionMap[arg] === undefined)
                cpov.error("fatal", "Unknown commandline switch '--" + arg + "'", "CEPHALOPOV");

            currentArg = arg;

            if(optionMap[arg].cnt !== undefined)
                optionMap[arg].cnt++;

            continue;

        }

        // If we get here, we're looking at an argument to a switch

        if(optionMap[currentArg] === undefined)
            cpov.error("fatal", "Invalid commandline argument '" + item + "' supplied without preceding switch.", "CEPHALOPOV");
        else if(optionMap[currentArg].vals === undefined)
            cpov.error("fatal", "Commandline switch --" + currentArg + "/-" + optionMap[currentArg].short + " does not take arguments.", "CEPHALOPOV");
        else
            optionMap[currentArg].vals.push(item);

    }

}




//==============================================================================
// Fly my pretties, fly! =======================================================
//==============================================================================

module.exports = cpov;
