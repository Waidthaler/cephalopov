// BicubicPatch.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "bicubic_patch {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + "type " + this.type);
	if(this.uSteps !== null)
		content.push(ppad + "u_steps " + this.uSteps);
	if(this.vSteps !== null)
		content.push(ppad + "v_steps " + this.vSteps);
	if(this.flatness !== null)
		content.push(ppad + "flatness " + this.flatness);

	for(var row = 0; row < 4; row++) {
		var items = [ ];
		for(var col = 0; col < 4; col++) {
			items.push(this.points[row * 4 + col].toSDL());
		}
		content.push(ppad + items.join(", ") + (row != 3 ? "," : ""));
	}

    $Primitive.toSDL-postamble
}



// Blob.components.get-set //---------------------------------------------------

//--------------------------------------------------------------------------

get components() {
    if(typeof this._components == "function")
        return this._components(cpov, this);
    else if(cpov.isSDLFunction(this._components))
        return this._components.substr(1);
    else
        return this._components;
}

set components(val) {
    if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, ['Sphere', 'Cylinder'], 1, Infinity) && val.length)) {
        this._components = val;
        this.adopt(this._components);
        this._children = this._components;
    } else {
        cpov.error("fatal", "components must be an array of Spheres and/or Cylinders.", "Blob", this);
    }
}



// Blob.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "blob {" + (this.id === null ? "" : " // " + this.id));
	if(this.threshold !== null)
		content.push(ppad + "threshold " + this.threshold);
    var components = this.components;
	if(cpov.isSDLFunction(components)) {
		content.push(ppad + this.components);
	} else { // array
		for(var i = 0; i < components.length; i++) {
			content.push(components[i].toSDL(stops + 1, true));
		}
	}
	if(this.hierarchy !== null)
		content.push(ppad + "hierarchy " + (this.hierarchy ? "on" : "off"));
	if(this.sturm)
		content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Box.toSDL //-----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "box {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL());

    $Primitive.toSDL-postamble
}



// Camera.toSDL //--------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//
// Cameras are not true primitives, but CephaloPOV makes sure they act like
// one in most instances. (TODO)
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.type == "cylinder" && this.cylinderType === null)
        cpov.error("type is cylinder but cylinderType is undefined.", "Camera.toSDL", this);
    else if(this.type == "orthographic" && (this.angle === null || (this.up === null && this.right === null)))
        cpov.error("The orthographic camera requires either angle or up and right to be defined.", "Camera.toSDL", this);

    content.push(pad + "camera {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + cpov.cameraTypes[this.type] + (this.type == "cylinder" ? " " + this.cylinderType : ""));
    if(this.location !== null)
        content.push(ppad + "location " + this.location.toSDL());
    if(this.right !== null)
        content.push(ppad + "right " + this.right.toSDL());
    if(this.up !== null)
        content.push(ppad + "up " + this.up.toSDL());
    if(this.direction !== null)
        content.push(ppad + "direction " + this.direction.toSDL());
    if(this.angle !== null) {
        if(Array.isArray(this.angle))
            content.push(ppad + "angle " + this.angle[0] + " " + this.angle[1]);
        else
            content.push(ppad + "angle " + this.angle);
    }
    if(this.lookAt !== null)
        content.push(ppad + "look_at " + this.lookAt.toSDL());
    if(this.aperture !== null) {
        content.push(ppad + "aperture " + this.aperture);
        if(this.blurSamples !== null) {
            if(Array.isArray(this.blurSamples))
                content.push(ppad + "blur_samples " + this.blurSamples.join(", "));
            else
                content.push(ppad + "blur_samples " + this.blurSamples);
        }
        if(this.focalPoint !== null)
            content.push(ppad + "focal_point " + this.focalPoint.toSDL());
        if(this.confidence !== null)
            content.push(ppad + "confidence " + this.confidence);
        if(this.variance !== null)
            content.push(ppad + "variance " + this.variance);
        if(this.bokeh !== null)
            content.push(ppad + "bokeh " + this.bokeh);
    }

    $Primitive.toSDL-postamble
}



// Color.conBlock //------------------------------------------------------------

if(options !== undefined) {
    if(cpov.isClassInstance(options, "Color")) { // copy
        options = {
            r: options.r === undefined ? null : options.r,
            g: options.g === undefined ? null : options.g,
            b: options.b === undefined ? null : options.b,
            f: options.f === undefined ? null : options.f,
            t: options.t === undefined ? null : options.t,
            srgb: options.srgb === undefined ? null : options.srgb
        };
    }

    if(Array.isArray(options)) {

        if(options.length < 3 || options.length > 6) {
            cpov.error("fatal", "When initializing a Color with an array, it must have three to six values.", "Color.constructor", this);
        } else {
            this.r = options[0];
            this.g = options[1];
            this.b = options[2];
            if(options.length > 3)
                this.f = options[3];
            if(options.length > 4)
                this.t = options[4];
            if(options.length > 5)
                this.srgb = options[5];
        }

    } else if(typeof options == "object") {

        if(options.r === undefined || options.g === undefined || options.b === undefined)
            cpov.error("fatal", "When initializing a Color with an object, r, g, and b must be defined.", "Color.constructor", this);
        cpov.initObject(this, options);

    } else {
        cpov.error("fatal", "Invalid initializer.", "Color.constructor", this);
    }
}



// Color.copy //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the color. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new Color();
    that._r    = this._r;
    that._g    = this._g;
    that._b    = this._b;
    that._f    = this._f;
    that._t    = this._t;
    that._srgb = this._srgb;

    return that;
}



// Color.toPlainRGBVector //----------------------------------------------------

//------------------------------------------------------------------------------
// Produces a minimal RGB vector literal -- <0.5, 0.2, 1.0> -- as is needed in
// globalSettings and other places.
//------------------------------------------------------------------------------

toPlainRGBVector(stops = 0) {

    stops = cpov.tab(stops);

    if(this.r === null)
        cpov.error("fatal", "r is undefined.", "Color.toSDL", this);
    if(this.g === null)
        cpov.error("fatal", "g is undefined.", "Color.toSDL", this);
    if(this.b === null)
        cpov.error("fatal", "b is undefined.", "Color.toSDL", this);

    return stops + " <" + this.r + ", " + this.g + ", " + this.b + ">";
}



// Color.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    stops = cpov.tab(stops);

    $Vector.toSDL-preamble

    var form = (this.srgb ? "s" : "") + "rgb";
    var args = [this.r, this.g, this.b];

    if(this.f) {
        form += "f";
        args.push(this.f);
        if(this.t) {
            form += "t";
            args.push(this.t);
        }
    }

    return stops + form + " <" + args.join(", ") + ">";

}



// Cone.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "cone {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.basePoint.toSDL() + ", " + this.baseRadius + ", " + this.capPoint.toSDL() + ", " + this.capRadius);
    if(this.open)
        content.push(pad + "    open");

    $Primitive.toSDL-postamble
}



// Cubic.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "cubic {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + "< " + this.coefficients.join(", ") + " >");
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Cylinder.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0, component = false) {

    $Primitive.toSDL-preamble

    if(component) {
        return pad + "cylinder { " + this.basePoint.toSDL() + ", "
            + this.capPoint.toSDL() + ", " + this.radius
            + (this.strength !== null ? ", " + this.strength : "")
            + " }";
    } else {
        content.push(pad + "cylinder {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.basePoint.toSDL() + ", " + this.capPoint.toSDL() + ", " + this.radius);
        if(this.open)
            content.push(pad + "    open");
        $Primitive.toSDL-postamble
    }
}



// Difference.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "difference {" + (this.id === null ? "" : " // " + this.id));
    content.push(this.positiveComponent.toSDL(stops + 1));
    for(var i = 0; i < this.negativeComponents.length; i++) {
        content.push(this.negativeComponents[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// Disc.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "disc {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.center.toSDL() + ", " + this.normal.toSDL() + ", " + this.radius + (this.holeRadius === null ? "" : (", " + this.holeRadius)));

    $Primitive.toSDL-postamble
}


// Finish.toSDL //--------------------------------------------------------------

toSDL(stops = 0) {

    var pad     = cpov.tab(stops);
    var ppad    = cpov.tab(stops + 1);
    var pppad   = cpov.tab(stops + 2);  // this is getting out of hand.
    var content = [ ];

    if(this.identifier !== null)
        content.push(ppad + this.identifier);
    if(this.ambient !== null)
        content.push(ppad + "ambient " + this.ambient.toSDL());
    if(this.diffuse !== null)
        content.push(ppad + "diffuse "
            + (this.diffuseAlbedo ? "albedo " : "")
            + this.diffuse
            + (this.diffuseBack !== null ? (", " + this.diffuseBack) : "")
        );
    if(this.emission !== null)
        content.push(ppad + "emission " + this.emission.toSDL());
    if(this.brilliance !== null)
        content.push(ppad + "brilliance " + this.brilliance);
    if(this.phong !== null) {
        content.push(ppad + "phong " + (this.phongAlbedo ? "albedo " : "") + this.phong);
        if(this.phongSize !== null)
            content.push(ppad + "phong_size " + this.phongSize);
    }
    if(this.specular !== null) {
        content.push(ppad + "specular " + (this.specularAlbedo ? "albedo " : "") + this.specular);
        if(this.specularRoughness !== null) {
            content.push(ppad + "roughness " + this.specularRoughness);
        }
    }
    if(this.metallic !== null)
        content.push(ppad + "metallic " + this.metallic);
    if(this.crand !== null)
        content.push(ppad + "crand " + this.crand);
    if(this.conserveEnergy !== null)
        content.push(ppad + "conserve_energy " + this.conserveEnergy);

    if(this.reflectMax !== null) {
        content.push(ppad + "reflection {");
        if(this.reflectMin !== null) {
            content.push(pppad + this.reflectMin.toSDL() + ", " + this.reflectMax.toSDL());
        } else {
            content.push(pppad + this.reflectMax.toSDL());
        }
        if(this.reflectFresnel !== null)
            content.push(pppad + "fresnel " + this.reflectFresnel);
        if(this.reflectFalloff !== null)
            content.push(pppad + "falloff " + this.reflectFalloff);
        if(this.reflectExponent !== null)
            content.push(pppad + "exponent " + this.reflectExponent);
        if(this.reflectMetallic !== null)
            content.push(pppad + "metallic " + this.reflectMetallic);
        content.push(ppad + "}");
    }

    if(this.subsurface !== null)
        content.push(ppad + "subsurface { translucency " + this.subsurface.toSDL() + " }");

    if(this.iridescence !== null) {
        content.push(ppad + "irid {");
        content.push(pppad + this.iridescence);
        if(this.iridThickness !== null)
            content.push(pppad + "thickness " + this.iridThickness);
        if(this.iridTurbulence !== null)
            content.push(pppad + "turbulence " + this.iridTurbulence);
        content.push(ppad + "}");
    }

    if(content.length) {
        content.unshift(pad + "finish {" + (this.id === null ? "" : " // " + this.id));
        content.push(pad + "}");
        return content.join("\n");
    } else {
        return "";
    }
}

// GenMap-and-children //-------------------------------------------------------

//--------------------------------------------------------------------------
// GenMap and its subclasses are gathered together here because this is a
// case in which the classes are nearly identical and mostly exist for the
// purpose of type-checking.
//
// The data for the entries attribute consists of an array of 2-256 entries
// following the general form
//
//      [ idx, data ]
//
// where idx is a float and data is the locally relevant type or a type that
// can be automatically converted into the relevant type. Prior to assignment,
// the elements are sorted by idx, which need not be unique.
//--------------------------------------------------------------------------

class GenMap {

    constructor(options) {
        cpov.initObject(this, options);
        this._entries   = null;
    }

    get entries() {
        return this.entries;
    }

    set entries(val) {
        var result = this.normalizeEntries(val);
        this._entries = result;
        this._entries.sort(this.sortEntries);
    }

    normalizeEntries(val) {
        if(Array.isArray(val) || val.length < 2 || val.length > 256)
            cpov.error("fatal", "Map entries must be an array of 2-256 elements.", Object.getPrototypeOf(this).constructor.name + ".toSDL", this);
        for(var i = 0; i < val.length; i++) {
            if(!cpov.isFloat(val[i][0]))
                cpov.error("fatal", "Map indices must be floats.", Object.getPrototypeOf(this).constructor.name + ".toSDL", this);
        }
        var result = [ ];
        for(var i = 0; i < val.length; i++) {
            if(cpov.isClassInstance(val[i][1], this._itemClass.name)) {
                result.push([val[i][0], val[i][1].copy()]);
                continue;
            }
            var item = new this._itemClass(val[i][1]); // will produce a fatal error if value is bad
            result.push([val[i][0], item]);
        }
        return result;
    }

    // Sorts the entries for more readable output, subclass specific.

    sortEntries(a, b) {
        return a[0] - b[0];
    }

    toSDL(stops) {

        var pad     = cpov.tab(stops);
        var ppad    = cpov.tab(stops + 1);
        var content = [ ];

        content.push(pad + this._SDLName + " {");
        for(var i = 0; i < this._entries; i++)
            content.push(ppad + "[" + this._entries[i][0] + " " + this._entries[i][1].toSDL() + "]");
        content.push(pad + "}");

        return content.join("\n");
    }

}


//--------------------------------------------------------------------------

class ColorMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

ColorMap.prototype._itemClass = Color;
ColorMap.prototype._SDLName   = "color_map";

//--------------------------------------------------------------------------

/*
class NormalMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

NormalMap.prototype._itemClass = Normal;
NormalMap.prototype._SDLName   = "normal_map";
*/

//--------------------------------------------------------------------------

/*
class PigmentMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

PigmentMap.prototype._itemClass = Pigment;
PigmentMap.prototype._SDLName   = "pigment_map";
*/

//--------------------------------------------------------------------------

class SlopeMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

SlopeMap.prototype._itemClass = VectorXY;
SlopeMap.prototype._SDLName   = "slope_map";

//--------------------------------------------------------------------------

/*
class TextureMap extends GenMap {

    constructor(options) {
        super(options);
    }

}

TextureMap.prototype._itemClass = Texture;
TextureMap.prototype._SDLName   = "texture_map";
*/



// GlobalSettings.toSDL //------------------------------------------------------

//--------------------------------------------------------------------------
// Returns the SDL for GlobalSettings. Unlike other toSDL methods, this one
// does not take a stops argument because the SDL global_settings
// declaration always happens at the top level.
//--------------------------------------------------------------------------

toSDL() {

    if(this.photonSpacing !== null && this.photonCount !== null)
        cpov.error("fatal", "photonSpacing and photonCount cannot be defined simultaneously.", "GlobalSettings", this);

    var contents = [ ];

    contents.push("global_settings {");

    var params = {
        adcBailout: "adc_bailout",
        ambientLight: "ambient_light",
        assumedGamma: "assumed_gamma",
        iridWavelength: "irid_wavelength",
        charset: "charset",
        maxIntersections: "max_intersections",
        maxTraceLevel: "max_trace_level",
        mmPerUnit: "mm_per_unit",
        numberOfWaves: "number_of_waves",
        noiseGenerator: "noise_generator"
    };

    var radParams = {
        radAdcBailout: "adc_bailout",
        radAlwaysSample: "always_sample",
        radBrightness: "brightness",
        radCount: "count",
        radErrorBound: "error_bound",
        radGrayThreshold: "gray_threshold",
        radLowErrorFactor: "low_error_factor",
        radMaxSample: "max_sample",
        radMaximumReuse: "maximum_reuse",
        radMinimumReuse: "minimum_reuse",
        radNearestCount: "nearest_count",
        radNormal: "normal",
        radPretraceStart: "pretrace_start",
        radPretraceEnd: "pretrace_end",
        radRecursionLimit: "recursion_limit",
        radSubsurface: "subsurface"
    };

    var subParams = {
        subRadiosity: "radiosity",
        subSamples: "samples"
    };

    var photonParams = {
        photonSpacing: "spacing",
        photonCount: "count",
        photonGather: "gather",
        photonMedia: "media",
        photonJitter: "jitter",
        photonMaxTraceLevel: "max_trace_level",
        photonAdcBailout: "adc_bailout",
        photonSaveFile: "save_file",
        photonLoadFile: "load_file",
        photonAutostop: "autostop",
        photonExpandThresholds: "expand_thresholds",
        photonRadius: "radius"
    };

    for(var i in params) {
        if(this[i] !== null) {
            if(Array.isArray(this[i]))
                contents.push("    " + params[i] + " " + this[i].join(", "));
            else if(this[i].toPlainRGBVector === undefined)
                contents.push("    " + params[i] + " " + this[i]);
            else
                contents.push("    " + params[i] + " " + this[i].toPlainRGBVector());
        }
    }

    if(this.radiosity) {
        contents.push("    radiosity {");
        for(var i in radParams) {
            if(this[i] !== null) {
               if(Array.isArray(this[i]))
                    contents.push("        " + radParams[i] + " " + this[i].join(", "));
               else
                    contents.push("        " + radParams[i] + " " + this[i]);
            }
        }
        contents.push("    }");
    }

    if(this.subsurface) {
        contents.push("    subsurface {");
        for(var i in subParams) {
            if(this[i] !== null) {
               if(Array.isArray(this[i]))
                    contents.push("        " + subParams[i] + " " + this[i].join(", "));
               else
                    contents.push("        " + subParams[i] + " " + this[i]);
            }
        }
        contents.push("    }");
    }

    if(this.photon) {
        contents.push("    photon {");
        for(var i in photonParams) {
            if(this[i] !== null) {
               if(Array.isArray(this[i]))
                    contents.push("        " + photonParams[i] + " " + this[i].join(", "));
               else
                    contents.push("        " + photonParams[i] + " " + this[i]);
            }
        }
        contents.push("    }");
    }

    contents.push("}");

    return contents.join("\n");
}



// HeightField.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "height_field {" + (this.id === null ? "" : " // " + this.id));
    if(cpov.isSDLFunction(this.source)) {
        content.push(pad + "    " + this.userFunc);
    } else {
        content.push(
            ppad
            + (this.hfType === null ? "" : (this.hfType + " "))
            + '"' + this.source + '" '
            + (this.gamma === null ? "" : ("gamma " + this.gamma + " "))
            + (this.premultiplied === null ? "" : "premultiplied " + (this.premultiplied ? "on" : "off"))
        );
    }

    if(this.smooth === true)
        content.push(pad + "    smooth");
    if(this.waterLevel !== null)
        content.push(pad + "    water_level " + this.waterLevel);

    $Primitive.toSDL-postamble
}



// ImageOptions.output //-------------------------------------------------------

//--------------------------------------------------------------------------
// Performs some aggregate tests on the final state of the image options,
// and if none are found, returns an object containing two members, ini
// and cli, corresponding to the contents of the ini file and the
// commandline version, respectively.
//--------------------------------------------------------------------------

output() {
    var ini     = [];
    var cli     = [];
    var iniWarn = [];
    var cliWarn = [];

    for(var i = 0; i < this._mutableList.length; i++) {

        var opt = this._mutableList[i];

        if(opt != "Width" && opt != "Height" && this[opt] === null)
            continue;

        switch(opt) {
            case "allConsole":
                if(this.allFile === null) {
                    ini.push("All_Console=" + this.allConsole);
                    cli.push((this.allConsole ? "+" : "-") + "GA");
                }
                break;

            case "allFile":
                ini.push("All_File=" + this.allFile);
                cli.push(
                    (this.allConsole === null || this.allConsole === false ? "-" : "+")
                    + "GA"
                    + (typeof this.allFile == "string" ? this.allFile : "")
                );
                break;

            case "antialias":
                ini.push("Antialias=" + (this.antialias ? "true" : "false"));
                if(this.antialiasThreshold === null) {
                    cli.push((this.antialias ? "+" : "-") + "A");
                }
                break;

            case "antialiasDepth":
                ini.push("Antialias_Depth=" + this.antialiasDepth);
                cli.push("+R" + this.antialiasDepth);
                break;

            case "antialiasGamma":
                ini.push("Antialias_Gamma=" + this.antialiasGamma);
                cli.push("+AG" + this.antialiasGamma);
                break;

            case "antialiasThreshold":
                ini.push("Antialias_Threshold=" + this.antialiasThreshold);
                cli.push((this.antialias ? "+" : "-") + "A" + this.antialiasThreshold);
                break;

            case "appendFile":
                ini.push("Append_File=" + (this.appendFile ? "true" : "false"));
                cli.push((this.appendFile ? "+" : "-") + "GP");
                break;

            case "bitsPerColor":
                ini.push("Bits_Per_Color=" + this.bitsPerColor);
                break;

            case "bounding":
                ini.push("Bounding=" + (this.bounding ? "true" : "false"));
                if(this.boundingThreshold === null) {
                    cli.push((this.bounding ? "+" : "-") + "MB");
                };
                break;

            case "boundingMethod":
                ini.push("Bounding_Method=" + this.boundingMethod);
                cli.push("+BM" + this.boundingMethod);
                break;

            case "boundingThreshold":
                ini.push("Bounding_Threshold=" + (this.boundingThreshold ? this.boundingThreshold : "false"));
                cli.push(
                    (this.bounding !== null || this.bounding ? "+" : "-")
                    + "MB" + this.boundingThreshold
                );
                break;

            case "bspBaseAccessCost":
                ini.push("BSP_BaseAccessCost=" + this.bspBaseAccessCost);
                break;

            case "bspChildAccessCost":
                ini.push("BSP_ChildAccessCost=" + this.bspChildAccessCost);
                break;

            case "bspIsectCost":
                ini.push("BSP_IsectCost=" + this.bspIsectCost);
                break;

            case "bspMaxDepth":
                ini.push("BSP_MaxDepth=" + this.bspMaxDepth);
                break;

            case "bspMissChance":
                ini.push("BSP_MissChance=" + this.bspMissChance);
                break;

            case "debugConsole":
                if(this.allConsole === null)
                    ini.push("Debug_Console=" + this.debugConsole);
                if(this.debugFile === null && this.allFile === null)
                    cli.push((this.debugConsole ? "+" : "-") + "GD");
                break;

            case "debugFile":
                if(this.optAllFile === null) {
                    ini.push("Debug_File=" + this.debugFile);
                    cli.push(
                        (this.debugConsole === null || this.debugConsole === false ? "-" : "+")
                        + "GD"
                        + (typeof this.debugFile == "string" ? this.debugFile : "")
                    );
                }
                break;

            case "display":
                ini.push("Display=" + (this.display ? "true" : "false"));
                if(this.videoMode === null)
                    cli.push(this.display ? "+D" : "-D");
                break;

            case "displayGamma":
                ini.push("Display_Gamma=" + this.displayGamma);
                break;

            case "dither":
                ini.push("Dither=" + (this.dither ? "true" : "false"));
                if(this.ditherMethod === null)
                    cli.push((this.dither ? "+" : "-") + "TH");
                break;

            case "ditherMethod":
                ini.push("Dither_Method=" + this.ditherMethod);
                cli.push((this.dither ? "+" : "-") + "TH" + this.ditherMethod);
                break;

            case "endColumn":
                if(this.startColumn !== null && this.endColumn <= this.startColumn)
                    cpov.error("fatal", "endColumn must be greater than startColumn.", "ImageOptions");

                ini.push("End_Column=" + this.endColumn);
                cli.push("+EC" + this.endColumn);
                break;

            case "endRow":
                if(this.startRow !== null && this.endRow <= this.startRow)
                    cpov.error("fatal", "endRow must be greater than startRow.", "ImageOptions");

                ini.push("End_Row=" + this.endRow);
                cli.push("+ER" + this.endRow);
                break;

            case "fatalConsole":
                if(this.allConsole === null)
                        ini.push("Fatal_Console=" + this.fatalConsole);
                if(this.fatalFile === null && this.allFile === null)
                    cli.push((this.fatalConsole ? "+" : "-") + "GF");
                break;

            case "fatalErrorCommand":
                ini.push("Fatal_Error_Command=" + this.fatalErrorCommand);
                break;

            case "fatalErrorReturn":
                ini.push("Fatal_Error_Return=" + this.fatalErrorReturn);
                break;

            case "fatalFile":
                if(this.optAllFile === null) {
                    ini.push("Fatal_File=" + this.fatalFile);
                    cli.push(
                        (this.fatalConsole === null || this.fatalConsole === false ? "-" : "+")
                        + "GF"
                        + (typeof this.fatalFile == "string" ? this.fatalFile : "")
                    );
                }
                break;

            case "fileGamma":
                ini.push("File_Gamma=" + this.fileGamma);
                break;

            case "height":
                if(this.width === null || this.height === null)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Height=" + this.height);
                cli.push("+H" + this.height);
                break;

            case "highReproducibility":
                ini.push("High_Reproducibility=" + (this.highReproducibility ? "true" : "false"));
                if(this.highReproducibility)
                    cli.push("+HR");
                break;

            case "includeHeaders":
                for(var h = 0; h < this.includeHeaders.length; h++) {
                    ini.push("Include_Header=" + this.includeHeaders[h]);
                    cli.push("+HI" + this.includeHeaders[h]);
                }
                break;

            case "inputFileName":
                ini.push("Input_File_Name=" + this.inputFileName);
                cli.push("+I" + this.inputFileName);
                break;

            case "jitter":
                ini.push("Jitter=" + (this.jitter ? "true" : "false"));
                if(this.jitterAmount === null) {
                    cli.push((this.jitter ? "+" : "-") + "J");
                }
                break;

            case "jitterAmount":
                ini.push("Jitter_Amount=" + this.jitterAmount);
                cli.push((this.jitterAmount > 0 ? "+" : "-" ) + "J" + this.jitterAmount);
                break;

            case "libraryPath":
                for(var j = 0; j < this.libraryPath.length; j++) {
                    ini.push("Library_Path=" + this.libraryPath[j]);
                    cli.push("+L" + this.libraryPath[j]);
                }
                break;

            case "maxImageBufferMemory":
                ini.push("Max_Image_Buffer_Memory=" + this.maxImageBufferMemory);
                cli.push("+MI" + this.maxImageBufferMemory);
                break;

            case "outputAlpha":
                ini.push("Output_Alpha=" + (this.outputAlpha ? "true" : "false"));
                cli.push((this.outputAlpha ? "+" : "-") + "UA");
                break;

            case "outputFileName":
                ini.push("Output_File_Name=" + this.outputFileName);
                cli.push("+O" + this.outputFileName);
                break;

            case "outputFileType":
                ini.push("Output_File_Type=" + this.outputFileType);
                cli.push(
                    ((this.outputToFile === null || this.outputToFile === false) ? "-" : "+")
                    + this.outputFileType
                    + (this.bitsPerColor === null ? "" : this.bitsPerColor)
                );
                break;

            case "outputToFile":
                if(this.outputFileType === null) {
                    ini.push("Output_to_File=" + (this.outputToFile ? "true" : "false"));
                    cli.push(this.outputToFile ? "+F" : "-F");
                }
                break;

            case "palette":
                ini.push("Palette=" + this.palette);
                if(this.videoMode !== null)
                    cli.push(
                        (this.display ? "+" : "-")
                        + "D"
                        + this.videoMode + this.palette
                    );
                break;

            case "pauseWhenDone":
                ini.push("Pause_When_Done=" + (this.pauseWhenDone ? "true" : "false"));
                cli.push(this.pauseWhenDone ? "+P" : "-P");
                break;

            case "postFrameCommand":
                ini.push("Post_Frame_Command=" + this.postFrameCommand);
                break;

            case "postFrameReturn":
                ini.push("Post_Frame_Return=" + this.postFrameReturn);
                break;

            case "postSceneCommand":
                ini.push("Post_Scene_Command=" + this.postSceneCommand);
                break;

            case "postSceneReturn":
                ini.push("Post_Scene_Return=" + this.postSceneReturn);
                break;

            case "preFrameCommand":
                ini.push("Pre_Frame_Command=" + this.preFrameCommand);
                break;

            case "preFrameReturn":
                ini.push("Pre_Frame_Return=" + this.preFrameReturn);
                break;

            case "preSceneCommand":
                ini.push("Pre_Scene_Command=" + this.postSceneCommand);
                break;

            case "preSceneReturn":
                ini.push("Pre_Scene_Return=" + this.preSceneReturn);
                break;

            case "previewEndSize":
                if(this.previewStartSize !== null) {
                    ini.push("Preview_End_Size=" + this.previewEndSize);
                    cli.push("+EP" + this.previewEndSize);
                }
                break;

            case "previewStartSize":
                ini.push("Preview_Start_Size=" + this.previewStartSize);
                cli.push("+SP" + this.previewStartSize);
                break;

            case "quality":
                ini.push("Quality=" + this.quality);
                cli.push("+Q" + this.quality);
                break;

            case "radiosityFileName":
                ini.push("Radiosity_File_Name=" + this.radiosityFileName);
                cli.push("+RF" + this.radiosityFileName);
                break;

            case "radiosityFromFile":
                ini.push("Radiosity_From_File=" + (this.radiosityFromFile ? "true" : "false"));
                if(this.radiosityFromFile)
                    cli.push("+RFI");
                break;

            case "radiosityToFile":
                ini.push("Radiosity_To_File=" + (this.radiosityToFile ? "true" : "false"));
                if(this.radiosityToFile)
                    cli.push("+RFO");
                break;

            case "radiosityVainPretrace":
                ini.push("Radiosity_Vain_Pretrace=" + (this.radiosityVainPretrace ? "true" : "false"));
                cli.push(this.radiosityVainPretrace ? "+RVP" : "-RVP");
                break;

            case "removeBounds":
                ini.push("Remove_Bounds=" + (this.removeBounds ? "true" : "false"));
                cli.push((this.removeBounds ? "+" : "-") + "UR");
                break;

            case "renderBlockSize":
                ini.push("Render_Block_Size=" + this.renderBlockSize);
                cli.push("+BS" + this.renderBlockSize);
                break;

            case "renderBlockStep":
                ini.push("Render_Block_Step=" + this.renderBlockStep);
                cli.push("+RS" + this.renderBlockStep);
                break;

            case "renderConsole":
                if(this.allConsole === null)
                    ini.push("Render_Console=" + this.renderConsole);
                if(this.renderFile === null && this.allFile === null)
                    cli.push((this.renderConsole ? "+" : "-") + "GR");
                    break;

            case "renderFile":
                if(this.optAllFile === null) {
                    ini.push("Render_File=" + this.renderFile);
                    cli.push(
                        (this.renderConsole === null || this.renderConsole === false ? "-" : "+")
                        + "GR"
                        + (typeof this.renderFile == "string" ? this.renderFile : "")
                    );
                }
                break;

            case "renderPattern":
                ini.push("Render_Pattern=" + this.renderPattern);
                cli.push("+RP" + this.renderPattern);
                break;

            case "samplingMethod":
                ini.push("Sampling_Method=" + this.samplingMethod);
                cli.push("+AM" + this.samplingMethod);
                break;

            case "splitUnions":
                ini.push("Split_Unions=" + (this.splitUnions ? "true" : "false"));
                cli.push((this.splitUnions ? "+" : "-") + "SU");
                break;

            case "startColumn":
                if(this.endColumn !== null && this.endColumn <= this.startColumn)
                    cpov.error("fatal", "endColumn must be greater than startColumn.", "ImageOptions");

                ini.push("Start_Column=" + this.startColumn);
                cli.push("+SC" + this.startColumn);
                break;

            case "startRow":
                if(this.endRow !== null && this.endRow <= this.startRow)
                    cpov.error("fatal", "endRow must be greater than startRow.", "ImageOptions");

                ini.push("Start_Row=" + this.startRow);
                cli.push("+SR" + this.startRow);
                break;

            case "statisticConsole":
                if(this.allConsole === null)
                    ini.push("Statistic_Console=" + this.statisticConsole);
                if(this.statisticFile === null && this.allFile === null)
                    cli.push((this.statisticConsole ? "+" : "-") + "GS");
                break;

            case "statisticFile":
                if(this.optAllFile === null) {
                    ini.push("Statistic_File=" + this.statisticFile);
                    cli.push(
                        (this.statisticConsole === null || this.statisticConsole === false ? "-" : "+")
                        + "GS"
                        + (typeof this.statisticFile == "string" ? this.statisticFile : "")
                    );
                }
                break;

            case "testAbort":
                if(this.testAbortCount !== null) {
                    ini.push("Test_Abort=" + (this.testAbort ? "true" : "false"));
                    cli.push(this.testAbort ? "+X" : "-X");
                }
                break;

            case "testAbortCount":
                ini.push("Test_Abort_Count=" + this.testAbortCount);
                if(this.testAbort !== null)
                    cli.push((this.testAbort ? "+" : "-") + "X" + this.testAbortCount)
                else
                    cli.push("+X" + this.testAbortCount);
                break;

            case "userAbortCommand":
                ini.push("User_Abort_Command=" + this.userAbortCommand);
                break;

            case "userAbortReturn":
                ini.push("User_Abort_Return=" + this.userAbortReturn);
                break;

            case "verbose":
                ini.push("Verbose=" + (this.verbose ? "true" : "false"));
                cli.push(this.verbose ? "+V" : "-V");
                break;

            case "videoMode":
                ini.push("Video_Mode=" + this.videoMode);
                if(this.palette === null)
                    cli.push((this.videoMode ? "+" : "-") + "D" + this.videoMode);
                break;

            case "warningConsole":
                if(this.allConsole === null)
                    ini.push("Warning_Console=" + this.warningConsole);
                if(this.warningFile === null && this.allFile === null)
                    cli.push((this.warningConsole ? "+" : "-") + "GW");
                break;

            case "warningFile":
                if(this.optAllFile === null) {
                    ini.push("Warning_File=" + this.warningFile);
                    cli.push(
                        (this.warningConsole === null || this.warningConsole === false ? "-" : "+")
                        + "GW"
                        + (typeof this.warningFile == "string" ? this.warningFile : "")
                    );
                }
                break;

            case "warningLevel":
                ini.push("Warning_Level=" + this.warningLevel);
                cli.push("+WL" + this.warningLevel);
                break;

            case "width":
                if(this.width === null || this.height === null)
                    throw new RangeError("[ImageOptions]: Both width and height must be defined.");
                ini.push("Width=" + this.width);
                cli.push("+W" + this.width);
                break;

            case "workThreads":
                ini.push("Work_Threads=" + this.workThreads);
                cli.push("+WT" + this.workThreads);
                break;

            default:
                break;

        }
    }

    cli.unshift(this.exePath === null ? "povray" : this.exePath);

    return { ini: ini.join("\n"), cli: cli.join(" ") };

}



// Intersection.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "intersection {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.components.length; i++) {
        content.push(this.components[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// IsoSurface.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "isosurface {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.source);
    if(this.containedBy !== null)
        content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(2) + "\n" + ppad + "}");
    if(this.threshold !== null)
        content.push(ppad + "threshold " + this.threshold);
    if(this.accuracy !== null)
        content.push(ppad + "accuracy " + this.accuracy);
    if(this.maxGradient !== null)
        content.push(ppad + "max_gradient " + this.maxGradient);
    if(this.evaluate !== null)
        content.push(ppad + "evaluate " + this.evaluate.join(", "));
    if(this.open)
        content.push(ppad + "open");
    if(this.maxTrace !== null)
        content.push(ppad + "max_trace " + this.maxTrace);

    $Primitive.toSDL-postamble
}



// JuliaFractal.toSDL //--------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if((this.slice !== null && this.distance === null) || (this.slice === null && this.distance !== null))
		cpov.error("fatal", "To use either, both slice and distance must be specified together.", "JuliaFractal.toSDL", this);

	var parts = this.type.split(/:/);

    content.push(pad + "julia_fractal {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + this.juliaParam.toSDL());
	content.push(ppad + parts[0]); // algebra type
    if(this.type == "hypercomplex:pwr") {
        if(this.power === null) {
            cpov.error("fatal", "For JuliaFractal type \"hypercomplex:pwr\", power must be defined.", "JuliaFractal.toSDL", this);
        } else {
            content.push(ppad + "pwr(" + this.power.x + ", " + this.power.y + ")");
        }
    } else {
    	content.push(ppad + parts[1]); // function type
    }
	if(this.maxIter !== null)
		content.push(ppad + "max_iteration " + this.maxIter);
	if(this.precision !== null)
		content.push(ppad + "precision " + this.precision);
	if(this.slice !== null)
		content.push(ppad + "slice " + this.slice.toSDL() + ", " + this.distance);

    $Primitive.toSDL-postamble
}



// Lathe.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	if(this.type == "linearSpline" && this.points.length < 2)
        cpov.error("fatal", "A linear spline requires at least two points.", "Lathe.toSDL", this);
   	else if(this.type == "quadraticSpline" && this.points.length < 3)
        cpov.error("fatal", "A quadratic spline requires at least three points.", "Lathe.toSDL", this);
   	else if(this.type == "cubicSpline" && this.points.length < 4)
        cpov.error("fatal", "A quadratic spline requires at least four points.", "Lathe.toSDL", this);
   	else if(this.type == "bezierSpline" && this.points.length < 4)
        cpov.error("fatal", "A quadratic spline requires at least four points.", "Lathe.toSDL", this);

    content.push(pad + "lathe {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + cpov.splineTypes[this.type]);

	var items = [ ];
	for(var i = 0; i < this.points.length; i++)
		items.push(this.points[i].toSDL());
	content.push(ppad + items.length + ", " + items.join(", "));

	if(this.sturm)
		content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// LightSource.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "light_source {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.location.toSDL() + ", " + this.color.toSDL());

    if(this.type !== null && this.type != "point")
        content.push(ppad + this.type);

    if(this.type == "spotlight" || this.type == "cylindrical") {
        if(this.pointAt === null)
            throw new Error("[Light]: pointAt must be specified.");
        if(this.radius !== null)
            content.push(ppad + "radius " + this.radius);
        if(this.falloff !== null)
            content.push(ppad + "falloff " + this.falloff);
        if(this.tightness !== null)
            content.push(ppad + "tightness " + this.tightness);
    }

    if(this.parallel)
        content.push(ppad + "parallel");

    if(this.pointAt !== null)
        content.push(ppad + "point_at " + this.pointAt.toSDL());

    if(this.areaLight) {
        if(this.axis1 === null || this.axis2 === null || this.size1 === null || this.size2 === null)
            throw new Error("[Light]: Area lights require axis1, axis2, size1, and size2 to be defined.");
        content.push(ppad + "area_light");
        content.push(ppad + this.axis1 + ", " + this.axis2 + ", " + this.size1 + ", " + this.size2);
        if(this.adaptive !== null)
            content.push(ppad + "adaptive " + this.adaptive);
        if(this.jitter)
            content.push(ppad + "jitter");
        if(this.circular)
            content.push(ppad + "circular");
        if(this.orient)
            content.push(ppad + "orient");
    }

    if(this.shadowless)
        content.push(ppad + "shadowless");

    // TODO: looksLike
    // TODO: projectedThrough

    if(this.fadeDistance !== null)
        content.push(ppad + "fade_distance " + this.fadeDistance);
    if(this.fadePower !== null)
        content.push(ppad + "fade_power " + this.fadePower);

    if(this.mediaInteraction === false)
        content.push(ppad + "media_interaction off");
    if(this.mediaAttenuation === true)
        content.push(ppad + "media_attenuation on");

    content.push(pad + "}");

    return content.join("\n");
}



// Matrix //--------------------------------------------------------------------

//==============================================================================
// Matrix class. This was originally generated along with the Vector/Color
// classes, but the need for efficient computation that I couldn't readily get
// from codegen made it easier to copy the original generated code over to
// the snippets file and use it as a starting point for a largely hand-coded
// class.
//==============================================================================

class Matrix {

    constructor(v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32) {

        // Initialization //

        this.raw = [ // private array representation
			1, 0, 0,
			0, 1, 0,
			0, 0, 1,
			0, 0, 0
		];

		if(v00 == "none") // identity matrix
			return;

        if(cpov.isClassInstance(v00, "Matrix")) {  // make a copy of an existing Matrix
            for(var i = 0; i < 12; i++) {
                this.raw[i] = v00.raw[i];
            }
        }

		if(Array.isArray(v01)) {
            for(var i = 0; i < v01.length; i++) {
                if(!(cpov.isNullOrFunction(v01[i]) || cpov.isFloat(v01[i])))
                    cpov.error("fatal", "When given as an array, v01 must be an array of three floats.", "Matrix", this);
            }
			v10 = v01[2]; v02 = v01[1]; v01 = v01[0];
		}


		if(cpov.isArrayOfFloats(v00) && v00.length == 12) {

			this.raw = v00.slice(0);

		} else if(v00 == "scale") {

            if(v02 === undefined) v02 = v10 = v01;

            if((cpov.isNullOrFunction(v01) || cpov.isFloat(v01))
                && (cpov.isNullOrFunction(v02) || cpov.isFloat(v02))
                && (cpov.isNullOrFunction(v10) || cpov.isFloat(v10))) {

                this.raw[0] = v01; // x
                this.raw[4] = v02; // y
                this.raw[8] = v10; // z

            } else {
                cpov.error("fatal", "All arguments to \"scale\" short form must be floats or functions returning floats.", "Matrix", this);
            }

        } else if(v00 == "rotate") {

            if(v02 === undefined) v02 = v10 = v01;

            if((cpov.isNullOrFunction(v01) || cpov.isFloat(v01))
                && (cpov.isNullOrFunction(v02) || cpov.isFloat(v02))
                && (cpov.isNullOrFunction(v10) || cpov.isFloat(v10))) {

                if(v01 != 0) {                             // X
                    this.raw = Matrix._xMatrix(this.raw, [
                        1,              0,             0,
                        0,  Math.cos(cpov.deg2rad(v01)), Math.sin(cpov.deg2rad(v01)),
                        0, -Math.sin(cpov.deg2rad(v01)), Math.cos(cpov.deg2rad(v01)),
                        0,              0,             0
                    ]);
                }

                if(v02 != 0) {                             // Y
                    this.raw = Matrix._xMatrix(this.raw, [
                        Math.cos(cpov.deg2rad(v02)), 0, -Math.sin(cpov.deg2rad(v02)),
                        0,             1,              0,
                        Math.sin(cpov.deg2rad(v02)), 0,  Math.cos(cpov.deg2rad(v02)),
                        0,             0,              0
                    ]);
                }

                if(v10 != 0) {                             // Z
                    this.raw = Matrix._xMatrix(this.raw, [
                         Math.cos(cpov.deg2rad(v10)), Math.sin(cpov.deg2rad(v10)), 0,
                        -Math.sin(cpov.deg2rad(v10)), Math.cos(cpov.deg2rad(v10)), 0,
                                     0,             0, 1,
                                     0,             0, 0
                    ]);
                }

            } else {
                cpov.error("fatal", "All arguments to \"rotate\" short form must be floats or functions returning floats.", "Matrix", this);
            }

        } else if(v00 == "translate") {

            if(v02 === undefined) v02 = v10 = v01;

            if((cpov.isNullOrFunction(v01) || cpov.isFloat(v01))
                && (cpov.isNullOrFunction(v02) || cpov.isFloat(v02))
                && (cpov.isNullOrFunction(v10) || cpov.isFloat(v10))) {

                this.raw[9]  = v01; // x
                this.raw[10] = v02; // y
                this.raw[11] = v10; // z

            } else {
                cpov.error("fatal", "All arguments to \"translate\" short form must be floats or functions returning floats.", "Matrix", this);
            }

        } else if(v00 == "skew") {

            // Since there are six possible values for skew xforms as
			// opposed to three for the others, just taking them as a list
			// doesn't buy the user much. So instead, they pass an object
			// with the axis-pairs they're interested in as labels: yx, zx,
			// xy, zy, xz, and yz.

			this.raw[1] = v01.yx === undefined ? 0 : v01.yx;
			this.raw[2] = v01.zx === undefined ? 0 : v01.zx;
			this.raw[3] = v01.xy === undefined ? 0 : v01.xy;
			this.raw[5] = v01.zy === undefined ? 0 : v01.zy;
			this.raw[6] = v01.xz === undefined ? 0 : v01.xz;
			this.raw[7] = v01.yz === undefined ? 0 : v01.yz;

        } else {

            var vals = [ v00, v01, v02, v10, v11, v12, v20, v21, v22, v30, v31, v32 ];

            for(var i = 0; i < vals.length; i++) {
                if(!(cpov.isNullOrFunction(vals[i]) || cpov.isFloat(vals[i])))
                    cpov.error("fatal", "All arguments to full form of constructor must be floats or functions returning floats.", "Matrix", this);
            }

            this.raw = vals;

        }


    }

    //--------------------------------------------------------------------------

    get v00() {
        if(typeof this.raw[0] == "function")
            return this.raw[0](cpov, this);
        else if(cpov.isSDLFunction(this.raw[0]))
            return this.raw[0].substr(1);
        else
            return this.raw[0];
    }

    set v00(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[0] = val;
        } else {
            cpov.error("fatal", "v00 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v01() {
        if(typeof this.raw[1] == "function")
            return this.raw[1](cpov, this);
        else if(cpov.isSDLFunction(this.raw[1]))
            return this.raw[1].substr(1);
        else
            return this.raw[1];
    }

    set v01(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[1] = val;
        } else {
            cpov.error("fatal", "v01 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v02() {
        if(typeof this.raw[2] == "function")
            return this.raw[2](cpov, this);
        else if(cpov.isSDLFunction(this.raw[2]))
            return this.raw[2].substr(1);
        else
            return this.raw[2];
    }

    set v02(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[2] = val;
        } else {
            cpov.error("fatal", "v02 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v10() {
        if(typeof this.raw[3] == "function")
            return this.raw[3](cpov, this);
        else if(cpov.isSDLFunction(this.raw[3]))
            return this.raw[3].substr(1);
        else
            return this.raw[3];
    }

    set v10(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[3] = val;
        } else {
            cpov.error("fatal", "v10 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v11() {
        if(typeof this.raw[4] == "function")
            return this.raw[4](cpov, this);
        else if(cpov.isSDLFunction(this.raw[4]))
            return this.raw[4].substr(1);
        else
            return this.raw[4];
    }

    set v11(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[4] = val;
        } else {
            cpov.error("fatal", "v11 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v12() {
        if(typeof this.raw[5] == "function")
            return this.raw[5](cpov, this);
        else if(cpov.isSDLFunction(this.raw[5]))
            return this.raw[5].substr(1);
        else
            return this.raw[5];
    }

    set v12(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[5] = val;
        } else {
            cpov.error("fatal", "v12 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v20() {
        if(typeof this.raw[6] == "function")
            return this.raw[6](cpov, this);
        else if(cpov.isSDLFunction(this.raw[6]))
            return this.raw[6].substr(1);
        else
            return this.raw[6];
    }

    set v20(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[6] = val;
        } else {
            cpov.error("fatal", "v20 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v21() {
        if(typeof this.raw[7] == "function")
            return this.raw[7](cpov, this);
        else if(cpov.isSDLFunction(this.raw[7]))
            return this.raw[7].substr(1);
        else
            return this.raw[7];
    }

    set v21(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[7] = val;
        } else {
            cpov.error("fatal", "v21 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v22() {
        if(typeof this.raw[8] == "function")
            return this.raw[8](cpov, this);
        else if(cpov.isSDLFunction(this.raw[8]))
            return this.raw[8].substr(1);
        else
            return this.raw[8];
    }

    set v22(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[8] = val;
        } else {
            cpov.error("fatal", "v22 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v30() {
        if(typeof this.raw[9] == "function")
            return this.raw[9](cpov, this);
        else if(cpov.isSDLFunction(this.raw[9]))
            return this.raw[9].substr(1);
        else
            return this.raw[9];
    }

    set v30(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[9] = val;
        } else {
            cpov.error("fatal", "v30 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v31() {
        if(typeof this.raw[10] == "function")
            return this.raw[10](cpov, this);
        else if(cpov.isSDLFunction(this.raw[10]))
            return this.raw[10].substr(1);
        else
            return this.raw[10];
    }

    set v31(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[10] = val;
        } else {
            cpov.error("fatal", "v31 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------

    get v32() {
        if(typeof this.raw[11] == "function")
            return this.raw[11](cpov, this);
        else if(cpov.isSDLFunction(this.raw[11]))
            return this.raw[11].substr(1);
        else
            return this.raw[11];
    }

    set v32(val) {
        if(cpov.isNullOrFunction(val) || cpov.isFloat(val)) {
            this.raw[11] = val;
        } else {
            cpov.error("fatal", "v32 must be a float or a function returning a float.", "Matrix");
        }
    }

    //--------------------------------------------------------------------------
    // Returns the contents of this.raw based on mode, which may be one of:
    //
    //     normal ... This is the default. Returns a copy of this.raw in which
    //                all JS functions have been replaced by their return
    //                values.
    //     literal ... Returns an exact copy.
    //     calc ...... As normal, except that the presence of an SDL function
    //                 will return null instead of the expected array.
    //     sdl ....... As normal, except that SDL functions are included, minus
    //                 their leading '&'.
    //--------------------------------------------------------------------------

    asArray(mode = "normal") {

        var result = [ ];

        switch(mode) {

            case "normal":
                for(var i = 0; i < 12; i++) {
                    if(typeof this.raw[i] == "function")
                        result[i] = this.raw[i](cpov, this);
                    else
                        result[i] = this.raw[i];
                }
                break;

            case "literal":
                for(var i = 0; i < 12; i++) {
                    result[i] = this.raw[i];
                }
                break;

            case "calc":
                for(var i = 0; i < 12; i++) {
                    if(typeof this.raw[i] == "function")
                        result[i] = this.raw[i](cpov, this);
                    else if(cpov.isSDLFunction(this.raw[i]))
                        return null;
                    else
                        result[i] = this.raw[i];
                }
                break;

            case "sdl":
                for(var i = 0; i < 12; i++) {
                    if(typeof this.raw[i] == "function")
                        result[i] = this.raw[i](cpov, this);
                    else if(cpov.isSDLFunction(this.raw[i]))
                        result[i] = this.raw[i].substr(1);
                    else
                        result[i] = this.raw[i];
                }
                break;

            default:
                cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "Matrix.asArray", this);
                break;
        }

        return result;
    }

    //--------------------------------------------------------------------------
    // Constructs and returns a shallow copy of the object.
    //--------------------------------------------------------------------------

    copy() {

        return new Matrix(this.raw);

    }

    //--------------------------------------------------------------------------
    // Copies the values of that to this. Performs no conversions.
    //--------------------------------------------------------------------------

    copyFrom(that) {
        for(var i = 0; i < 12; i++)
            this.raw[i] = that.raw[i];
    }

    //--------------------------------------------------------------------------
    // Returns a boolean indicating whether the current value of this.raw is the
    // same as the initial identity matrix. This only checks for numeric values;
    // if raw is a function returning an identity matrix, it will still return
    // false.
    //--------------------------------------------------------------------------

    isIdentityMatrix() {
        var ident = [ 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ];

        for(var i = 0; i < 12; i++) {
            if(this.raw[i] !== ident[i])
                return false;
        }
        return true;
    }

    //--------------------------------------------------------------------------
    // Convenience method for applying a rotation to the current Matrix. If
    // y and z are undefined, the value of x is copied to them.
    //--------------------------------------------------------------------------

    rotate(x, y, z) {
        if(y === undefined)
            z = y = x;
        var that = new Matrix("rotate", x, y, z);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Convenience method for scaling the current Matrix. If y and z are
    // undefined, the value of x is copied to them.
    //--------------------------------------------------------------------------

    scale(x, y, z) {
        if(y === undefined)
            z = y = x;
        var that = new Matrix("scale", x, y, z);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Convenience method for skewing the current Matrix. As with the short-
    // hand version for initializing a skew matrix, the single argument is an
    // object with the desired axis pairs.
    //--------------------------------------------------------------------------

    skew(pairs) {
        var that = new Matrix("skew", pairs);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Convenience method for scaling the current Matrix. If y and z are
    // undefined, the value of x is copied to them.
    //--------------------------------------------------------------------------

    translate(x, y, z) {
        if(y === undefined)
            z = y = x;
        var that = new Matrix("translate", x, y, z);
        var newMatrix = this.xMatrix(that);
        this.copyFrom(newMatrix);
    }

    //--------------------------------------------------------------------------
    // Returns a copy of the raw array with any JS function members converted
    // into numbers. Will produce a fatal error if any of the members yield
    // non-numeric results.
    //--------------------------------------------------------------------------

    reify() {
        var result = [ ];

        for(var i = 0; i < 12; i++) {
            if(typeof this.raw[i] == "function") {
                var tmp = this.raw[i](cpov, this);
                if(typeof tmp != "number")
                    cpov.error("fatal", "Matrix elements must evaluate to floats.", "Matrix.reify", this);
                result[i] = tmp;
            } else if(typeof this.raw[i] == "number") {
                result[i] = this.raw[i];
            } else {
                cpov.error("fatal", "Matrix elements must evaluate to floats.", "Matrix.reify", this);
            }
        }
        return result;
    }

    //--------------------------------------------------------------------------
    // A private method for multiplying matrices in the form of arrays of 12
    // elements, returning the same.
    //--------------------------------------------------------------------------

    static _xMatrix(a, b) {

        if(cpov.isSDLFunction(a) || cpov.isSDLFunction(b))
            cpov.error("fatal", "Cannot perform JS math operations on SDL functions.", "Matrix._xMatrix", this);

    	return [
            /* v00] */ (a[0] * b[0] + a[1]  * b[3] + a[2]  * b[6]),
            /* v01] */ (a[0] * b[1] + a[1]  * b[4] + a[2]  * b[7]),
            /* v02] */ (a[0] * b[2] + a[1]  * b[5] + a[2]  * b[8]),
            /* v10] */ (a[3] * b[0] + a[4]  * b[3] + a[5]  * b[6]),
            /* v11] */ (a[3] * b[1] + a[4]  * b[4] + a[5]  * b[7]),
            /* v12] */ (a[3] * b[2] + a[4]  * b[5] + a[5]  * b[8]),
            /* v20] */ (a[6] * b[0] + a[7]  * b[3] + a[8]  * b[6]),
            /* v21] */ (a[6] * b[1] + a[7]  * b[4] + a[8]  * b[7]),
            /* v22] */ (a[6] * b[2] + a[7]  * b[5] + a[8]  * b[8]),
            /* v30] */ (a[9] * b[0] + a[10] * b[3] + a[11] * b[6] + b[9]),
            /* v31] */ (a[9] * b[1] + a[10] * b[4] + a[11] * b[7] + b[10]),
            /* v32] */ (a[9] * b[2] + a[10] * b[5] + a[11] * b[8] + b[11])
    	];
    }

    //--------------------------------------------------------------------------
    // Given another Matrix, that, returns a new Matrix this * that.
    //--------------------------------------------------------------------------

    xMatrix(that) {

        if(!cpov.isClassInstance(that, "Matrix"))
            cpov.error("fatal", "that is not a Matrix.", "Matrix.xMatrix", this);

        var a = this.asArray("calc");
        var b = that.asArray("calc");

        var badObj = false;
        if(b === null)
            badObj = that;
        if(a === null)
            badObj = this;
        if(badObj)
            cpov("fatal", "Cannot perform matrix computations if elements are SDL functions.", "Matrix.xMatrix", badObj);

		return new Matrix(Matrix._xMatrix(a, b));
    }

    //--------------------------------------------------------------------------
    // Given a VectorXYZ, point, returns a new VectorXYZ this * point.
    //--------------------------------------------------------------------------

    xPoint(point) {

        if(!cpov.isClassInstance(point, "VectorXYZ"))
            cpov.error("fatal", "point is not a VectorXYZ.", "Matrix.xPoint", this);

        var m = this.asArray("calc");
        if(m === null)
            cpov("fatal", "Cannot perform matrix computations if elements are SDL functions.", "Matrix.xPoint", this);

        var v = point.asArray("calc");
        if(v === null)
            cpov("fatal", "Cannot perform matrix computations if elements are SDL functions.", "Matrix.xPoint", this);

        return new VectorXYZ(
            m[0] * v[0] + m[3] * v[1] + m[6] * v[2] + m[9],
            m[1] * v[0] + m[4] * v[1] + m[7] * v[2] + m[10],
            m[2] * v[0] + m[5] * v[1] + m[8] * v[2] + m[11]
        );

/*
        return new VectorXYZ(
            this.v00 * point.x + this.v10 * point.y + this.v20 * point.z + this.v30,
            this.v01 * point.x + this.v11 * point.y + this.v21 * point.z + this.v31,
            this.v02 * point.x + this.v12 * point.y + this.v22 * point.z + this.v32
        );
*/
    }

    //--------------------------------------------------------------------------
	// Sets multiple attributes at once using an object.
	//--------------------------------------------------------------------------

	xset(vals) {
		cpov.initObject(this, vals);
	}

    //--------------------------------------------------------------------------
    // Produces the SDL representation of the Matrix.
    //--------------------------------------------------------------------------

    toSDL(stops = 0) {
        var pad = cpov.tab(stops);

        var m = this.asArray("sdl");

        return pad + "matrix <" + m.join(", ") + ">";
    }

}

exports.Matrix = Matrix;



// Merge.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "merge {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.components.length; i++) {
        content.push(this.components[i].toSDL(stops + 1));
    }

    $Primitive.toSDL-postamble
}



// Mesh.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "mesh {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.triangles.length; i++) {
        content.push(this.triangles[i].toSDL(1));
    }
    if(this.insideVector !== null)
        content.push(ppad + "inside_vector " + this.insideVector.toSDL());
	if(this.hierarchy !== null)
		content.push(ppad + "hierarchy " + (this.hierarchy ? "on" : "off"));

    $Primitive.toSDL-postamble
}



// Ovus.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "ovus {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.bottomRadius + ", " + this.topRadius);

    $Primitive.toSDL-postamble
}



// Parametric.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	content.push(pad + "parametric {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + this.funcX);
    content.push(ppad + this.funcY);
    content.push(ppad + this.funcZ);
    content.push(ppad + this.uv1.toSDL() + ", " + this.uv2.toSDL());

    if(this.containedBy)
        content.push(ppad + "contained_by {\n" + this.containedBy.toSDL(stops + 2) + "\n" + ppad + "}");
    if(this.maxGradient !== null)
        content.push(ppad + "max_gradient " + this.maxGradient);
    if(this.accuracy !== null)
        content.push(ppad + "accuracy " + this.accuracy);
    if(this.precomputeDepth) {
        if(this.precomputeX || this.precomputeY || this.precomputeZ) {
            var items = [ ];
            if(this.precomputeX)
                items.push("x");
            if(this.precomputeY)
                items.push("y");
            if(this.precomputeZ)
                items.push("z");
            content.push(ppad + "precompute " + this.precomputeDepth + " " + items.join(", "));
        } else {
            cpov.error("fatal", "When using precomputeDepth, at least one of precomputeX, precomputeY, or precomputeZ must also be defined.", "Parametric.toSDL", this);
        }
    }

	$Primitive.toSDL-postamble

}


// Pattern.toSDL //-------------------------------------------------------------

toSDL(stops = 0) {
    // TODO
}


// Plane.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

	content.push(pad + "plane {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + this.normal.toSDL() + ", " + this.distance);

    $Primitive.toSDL-postamble

}



// Poly.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;

    if(this.coefficients.length != ccnt)
        cpov.error("fatal", "A Poly of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Poly.toSDL", this);

	content.push(pad + "poly {" + (this.id === null ? "" : " // " + this.id));
    var items = this.coefficients.slice(0);
	content.push(ppad + this.order + ", < " + items.join(", ") + " >");
    if(this.sturm)
        content.push(ppad + "sturm")

    $Primitive.toSDL-postamble

}



// Polygon.toSDL //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

  	if(this.points.length < 3)
		cpov.error("fatal", "points must contain at least three VectorXY.", "Polygon.toSDL", this);

	content.push(pad + "polygon {" + (this.id === null ? "" : " // " + this.id));
	content.push(ppad + this.points.length + ",");
    var items = [ ];
    for(var i = 0; i < this.points.length; i++) {
        items.push(this.points[i].toSDL());
    }
    content.push(ppad + items.join(", "));

    $Primitive.toSDL-postamble

}



// Polynomial.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    var ccnt = ((this.order + 1) * (this.order + 2) * (this.order + 3)) / 6;

    /* // FIXME
    if(this.coefficients.length != ccnt)
        cpov.error("fatal", "A Polynomial of order " + this.order + " must have exactly " + ccnt + " coefficients.", "Polynomial.toSDL", this);
    */

	content.push(pad + "polynomial {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.order + ", ");
    var coefficients = [ ];
    for(var i = 0; i < this.coefficients.length; i++)
        coefficients.push(ppad + "xyz(" + this.coefficients[i].x + ", " + this.coefficients[i].y + ", " + this.coefficients[i].z + "):" + this.coefficients[i].w);
    content.push(coefficients.join(",\n"))
    if(this.sturm)
        content.push(ppad + "sturm")

    $Primitive.toSDL-postamble

}



// Primitive.adopt //-----------------------------------------------------------

//------------------------------------------------------------------------------
// Called on contained objects to aim their parent attributes at the container.
// Intelligently handles singletons, arrays, and functions.
//------------------------------------------------------------------------------

adopt(val) {
    if(Array.isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            this._adopt(val[i]);
        }
    } else {
        this._adopt(val);
    }
}

_adopt(val) {
    if(cpov.isSDLFunction(val)) {
        cpov.error("warn", "Cannot mark an SDL function as a child. You're on your own here.", "Primitive.adopt", this);
    } else if(typeof val == "function") {
        cpov.error("warn", "Cannot mark a JavaScript function as a child. You're on your own here.", "Primitive.adopt", this);
    } else if(cpov.inheritsFrom(val, "Primitive")) {
        val._parent = this;
    }
}



// Primitive.baseTransform.get-set //-------------------------------------------

//--------------------------------------------------------------------------
// The accessors for baseTransform are much simpler than for transform. Any
// legal value -- Matrix, JS function, SDL function, or "none" -- can be
// stuffed into it, and except for "none", they are returned unchanged.
//--------------------------------------------------------------------------

get baseTransform() {
    return this._baseTransform;
}

set baseTransform(val) {
    if(cpov.isClassInstance(val, "Matrix") || typeof val == "function" || cpov.isSDLFunction(val))
        this._baseTransform = val;
    else if(val == "none")
        this._baseTransform = new Matrix("none");
}



// Primitive.children.get-set //------------------------------------------------

//--------------------------------------------------------------------------

get children() {
    if(typeof this._children == "function")
        return this._children(cpov, this);
    else if(cpov.isSDLFunction(this._children))
        return this._children.substr(1);
    else
        return this._children;
}

set children(val) {
    cpov.error("fatal", "children is read-only.", "Primitive", this);
}



// Primitive.conBlock //--------------------------------------------------------

this.active = true;
this.transform = new Matrix("none");
cpov.initObject(this, options);

// Create serial number and register with cpov object

cpov.objectSerial++;
this._serial = cpov.objectSerial;
cpov.serialMap[this.serial] = this;



// Primitive.copyCommonFrom //--------------------------------------------------

copyFrom(obj) {
    this.active           = obj.active;
    this.baseTransform    = obj.baseTransform;
    this.boundedBy        = obj.boundedBy;
    this.children         = obj.children;
    this.clippedBy        = obj.clippedBy;
    this.doubleIlluminate = obj.doubleIlluminate;
    this.finish           = obj.finish;
    this.frameBegin       = obj.frameBegin;
    this.frameEnd         = obj.frameEnd;
    this.hollow           = obj.hollow;
    this.id               = obj.id;
    this.interior         = obj.interior;
    this.inverse          = obj.inverse;
    this.material         = obj.material;
    this.noImage          = obj.noImage;
    this.noRadiosity      = obj.noRadiosity;
    this.noReflection     = obj.noReflection;
    this.noShadow         = obj.noShadow;
    this.parent           = obj.parent;
    this.photons          = obj.photons;
    this.radiosity        = obj.radiosity;
    this.serial           = obj.serial;
    this.texture          = obj.texture;
    this.transform        = obj.transform;
}



// Primitive.destroy //---------------------------------------------------------

destroy() {
    delete cpov.serialMap[this.serial];
    if(this.id)
        delete cpov.idMap[this.id];
}



// Primitive.disown //----------------------------------------------------------

//------------------------------------------------------------------------------
// Called on formerly contained objects to set their parent attribute to null.
// Intelligently handles singletons, arrays, and functions.
//------------------------------------------------------------------------------

disown(val) {
    if(Array.isArray(val)) {
        for(var i = 0; i < val.length; i++) {
            this._adopt(val[i]);
        }
    } else {
        this._adopt(val);
    }
}

_adopt(val) {
    if(cpov.isSDLFunction(val)) {
        cpov.error("warn", "Cannot mark an SDL function as a child. You're on your own here.", "Primitive.adopt", this);
    } else if(typeof val == "function") {
        cpov.error("warn", "Cannot mark a JavaScript function as a child. You're on your own here.", "Primitive.adopt", this);
    } else if(cpov.inheritsFrom(val, "Primitive")) {
        val._parent = null;
    }
}



// Primitive.immutables //------------------------------------------------------

//--------------------------------------------------------------------------

get finite() {
	return this._finite;
}

set finite(val) {
	cpov.error("fatal", "finite is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
}

//--------------------------------------------------------------------------

get solid() {
	return this._solid;
}

set solid(val) {
	cpov.error("fatal", "solid is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
}

//--------------------------------------------------------------------------

get csg() {
	return this._csg;
}

set csg(val) {
	cpov.error("fatal", "csg is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
}

//--------------------------------------------------------------------------

get csgOperand() {
	return this._csgOperand;
}

set csgOperand(val) {
	cpov.error("fatal", "csgOperand is a read-only property.", Object.getPrototypeOf(this).constructor.name, this);
}



// Primitive.parent.get-set //--------------------------------------------------

//--------------------------------------------------------------------------

get parent() {
    if(typeof this._parent == "function")
        return this._parent(cpov, this);
    else if(cpov.isSDLFunction(this._parent))
        return this._parent.substr(1);
    else
        return this._parent;
}

set parent(val) {
    cpov.error("fatal", "parent is read-only.", "Primitive", this);
}



// Primitive.requiredParameterTest //-------------------------------------------

//--------------------------------------------------------------------------
// Tests to see whether the required parameters for the class have been
// filled prior to output. Aborts if not. There are currently (10/15/2018)
// no required params for the Primitive base class; this is meant to be
// called from the subclasses.
//--------------------------------------------------------------------------

requiredParameterTest(requiredParams) {
    var missing = [ ];

    for(var i = 0; i < requiredParams.length; i++) {
        if(this[requiredParams[i]] === null) {
            missing.push(requiredParams[i]);
        }
    }

    if(missing.length > 0) {
        cpov.error("fatal", "Missing required parameters: " + missing.join(", ")
            + ".", Object.getPrototypeOf(this).constructor.name + ".requiredParameterTest", this);
    }
}



// Primitive.resetTransform //--------------------------------------------------

resetTransform() {
    this._transform = new Matrix(this._baseTransform);
}



// Primitive.satellites.get-set //----------------------------------------------

//--------------------------------------------------------------------------

get satellites() {
    if(typeof this._satellites == "function")
        return this._satellites(cpov, this);
    else if(cpov.isSDLFunction(this._satellites))
        return this._satellites.substr(1);
    else
        return this._satellites;
}

set satellites(val) {
    if(cpov.isNullOrFunction(val) || (cpov.isArrayOfBaseClass(val, "Primitive", 0, Infinity))) {
        this._satellites = val;
        for(var i = 0; i < this._satellites.length; i++) {
            this._satellites[i]._parent = this;
        }
    } else {
        cpov.error("fatal", "satellites must be an array of Primitives.", "Primitive", this);
    }
}



// Primitive.serial.get-set //--------------------------------------------------

//--------------------------------------------------------------------------

get serial() {
    if(typeof this._serial == "function")
        return this._serial(cpov, this);
    else if(cpov.isSDLFunction(this._serial))
        return this._serial.substr(1);
    else
        return this._serial;
}

set serial(val) {
    cpov.error("fatal", "The serial attribute is read-only.", "Primitive", this);
}



// Primitive.snapshot //--------------------------------------------------------

//--------------------------------------------------------------------------
// Copies current SDL representation of the object to the snapshot buffer.
//--------------------------------------------------------------------------

snapshot() {
    cpov.snapshots.push(this.toSDL());
}



// Primitive.toSDL //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Generates SDL from parameters.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    if(!this.active)
        return "";

    var pad = cpov.tab(stops);
    var content = [ ];

    if(this.clippedBy !== null) {
        content.push(pad + "clipped_by {");
        content.push(this.clippedBy.toSDL(stops + 1));
        content.push(pad + "}");
    }

    if(this.boundedBy !== null) {
        content.push(pad + "bounded_by {");
        if(this.boundedBy === this.clippedBy) {
            content.push(pad + "    clipped_by");
        } else {
            content.push(this.boundedBy.toSDL(stops + 1));
        }
        content.push(pad + "}");
    }

    if(this.noShadow)
        content.push(pad + "no_shadow");

    if(this.noImage)
        content.push(pad + "no_image");

    if(this.noRadiosity)
        content.push(pad + "no_radiosity");

    if(this.noReflection)
        content.push(pad + "no_reflection");

    if(this.inverse)
        content.push(pad + "inverse");

    if(this.double_illuminate)
        content.push(pad + "double_illuminate");

    if(this.hollow)
        content.push(pad + "hollow");

    // TODO: interior
    // TODO: interior_texture
    // TODO: texture (real)

    if(this.texture)
        content.push(pad + this.texture);

    // TODO: photons
    // TODO: radiosity

    if(this.transform !== undefined && this.transform !== null && !this.transform.isIdentityMatrix())
        content.push(this.transform.toSDL(stops));

    return content.join("\n");
}



// Primitive.toSDL-postamble //-------------------------------------------------

var superSDL = super.toSDL(stops + 1);
if(superSDL)
    content.push(superSDL);
content.push(pad + "}");

if(this.SDLAppend !== null)
    content.push("\n" + this.SDLAppend);

// Emit satellites

if(Array.isArray(this._satellites) && this._satellites.length > 0) {
    for(var i = 0; i < this._satellites.length; i++) {
        content.push(this._satellites[i].toSDL(stops));
    }
}

return content.join("\n");



// Primitive.toSDL-preamble //--------------------------------------------------

if(!this.active)
    return "";

super.requiredParameterTest(this.requiredParams);

var pad     = cpov.tab(stops);
var ppad    = cpov.tab(stops + 1);
var content = [ ];

if(this.SDLPrepend !== null)
    content.push(this.SDLPrepend + "\n");



// Primitive.transform.get-set //-----------------------------------------------

//--------------------------------------------------------------------------
// CephaloPOV objects have two associated transformation matrices, transform
// and baseTransform. The transform Matrix is what is emitted when the toSDL
// method is called. It is also the Matrix to which subsequent
// transformations are applied. If transform is not set (i.e., it is null)
// when it is accessed, baseTransform is copied to it first. Conversely, if
// transform is set before baseTransform, baseTransform will be set at the
// same time. The transformReset method may be called to copy baseTransform
// to transform when needed.
//
// The intended function of baseTransform is to serve as a default state,
// particularly for complex objects which will be reused.
//
// Important: To perform operations on a transform, it is necessary that it
// be an actual Matrix. You *can* assign an SDL function to the transforms,
// but operations at the JS level will of course croak with an error. (If
// you're not performing operations on it, no worries.) If a transform is JS
// function returning a Matrix or a Matrix whose elements are JS functions,
// it will be converted to an array of floats first.
//
// Extension (2/20/2019): Primitives now have a satellites attribute, which
// is an array of other Primitives that will have the same transformations
// applied to them as to the parent. This has the effect of keeping the
// satellites in the same relation to the parent as at the time of their
// definition. Mainly intended for Cameras, but there's no reason it
// couldn't be used for other objects, though Union and Merge CSG operations
// are probably better.
//--------------------------------------------------------------------------

get transform() {

    if(this._transform === null) {
        if(this._baseTransform === null) {
            return null;
        } else if(typeof this._baseTransform == "function") {
            this._transform = this._baseTransform;
        } else {
            this._transform.copyFrom(this._baseTransform);
        }
    }

    if(typeof this._transform == "function")
        return this._transform(cpov, this);
    else
        return this._transform;
}

set transform(val) {

    if(val === null) {
        this._transform = this.baseTransform;
        return;
    }

    if(val == "none")
        val = new Matrix("none");

    if(!cpov.isClassInstance(val, "Matrix") && !cpov.isNullOrFunction(val))
        cpov.error("fatal", "transform value must be a Matrix, JavaScript function, or SDL function", "Primitive.transform", this);

    if(this._baseTransform === null) {
        this._baseTransform = val;
        this._transform = val;
    } else {
        var val = new Matrix(val.reify());
        this._transform = this.transform.xMatrix(val);
    }

    // Apply the transformation to any satellites... (FIXME: DRY this out)

    if(Array.isArray(this._satellites) && this._satellites.length > 0) {
        for(var i = 0; i < this._satellites.length; i++) {
            this._satellites[i].transform = val;
        }
    }

}



// Primitive.transformations //-------------------------------------------------

//--------------------------------------------------------------------------
// This set of four methods, rotate, scale, skew, and translate, are
// convenience methods for applying transformations to Primitives. They all
// call the corresponding Matrix methods after checking that the transform
// member has been initialized.
//--------------------------------------------------------------------------

rotate(x, y, z) {
    if(this.transform === null)
        cpov.error("fatal", "Cannot perform rotation on uninitialized transform.", "Primitive.rotate", this);
    this.transform.rotate(x, y, z);

    // Apply the transformation to any satellites... (FIXME: DRY this out)

    if(Array.isArray(this._satellites) && this._satellites.length > 0) {
        for(var i = 0; i < this._satellites.length; i++) {
            this._satellites[i].rotate(x, y, z);
        }
    }
}

scale(x, y, z) {
    if(this.transform === null)
        cpov.error("fatal", "Cannot perform scale on uninitialized transform.", "Primitive.scale", this);
    this.transform.scale(x, y, z);

    // Apply the transformation to any satellites... (FIXME: DRY this out)

    if(Array.isArray(this._satellites) && this._satellites.length > 0) {
        for(var i = 0; i < this._satellites.length; i++) {
            this._satellites[i].scale(x, y, z);
        }
    }
}

skew(pairs) {
    if(this.transform === null)
        cpov.error("fatal", "Cannot perform skew on uninitialized transform.", "Primitive.skew", this);
    this.transform.skew(pairs);

    // Apply the transformation to any satellites... (FIXME: DRY this out)

    if(Array.isArray(this._satellites) && this._satellites.length > 0) {
        for(var i = 0; i < this._satellites.length; i++) {
            this._satellites[i].skew(x, y, z);
        }
    }
}

translate(x, y, z) {
    if(this.transform === null)
        cpov.error("fatal", "Cannot perform translation on uninitialized transform.", "Primitive.translate", this);
    this.transform.translate(x, y, z);

    // Apply the transformation to any satellites... (FIXME: DRY this out)

    if(Array.isArray(this._satellites) && this._satellites.length > 0) {
        for(var i = 0; i < this._satellites.length; i++) {
            this._satellites[i].translate(x, y, z);
        }
    }
}



// Primitive.xset //------------------------------------------------------------

//------------------------------------------------------------------------------
// Sets multiple attributes at once using an object.
//------------------------------------------------------------------------------

xset(vals) {
	cpov.initObject(this, vals);
}



// Prism.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

  	if(this.points.length < 3)
		cpov.error("fatal", "points must contain at least three VectorXY.", "Prism.toSDL", this);

	content.push(pad + "prism {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + cpov.prismTypes[this.type]);
    content.push(ppad + this.height1 + ", " + this.height2 + ", " + this.points.length + ",");
    var items = [ ];
    for(var i = 0; i < this.points.length; i++) {
        items.push(this.points[i].toSDL());
    }
    content.push(ppad + items.join(", "));
    if(this.open)
        content.push(ppad + "open");
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble

}



// Quadric.toSDL //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "quadric {" + (this.id === null ? "" : " // " + this.id));
    content.push(
        ppad
        + "<" + this.coefficients[0] + ", " + this.coefficients[1] + ", " + this.coefficients[2] + ">, "
        + "<" + this.coefficients[3] + ", " + this.coefficients[4] + ", " + this.coefficients[5] + ">, "
        + "<" + this.coefficients[6] + ", " + this.coefficients[7] + ", " + this.coefficients[8] + ">, "
        + this.coefficients[9]
    );

    $Primitive.toSDL-postamble
}



// Quartic.toSDL //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "quartic {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + "< " + this.coefficients.join(", ") + " >");
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// README //--------------------------------------------------------------------

/*

Copyright 2018-2019 Eric O'Dell and subsequent contributors

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

This file contains chunks of manually written code intended to be inserted into
the generated code produced by the codegen.js script. The code generator is
mainly intended to handle the reams of boilerplate and validation involved in
managing data that will be handled by POV-Ray. But it is far easier to write the
complex custom CephaloPOV methods by hand, and this snippets file makes it
relatively painless to integrate those methods with the code generation process.

Keys are defined by specially formatted comments and the values are the lines in
between those comments, with leading and trailing whitespace trimmed. The
comments are formatted thus:

         // Keyname // (anything after the second // is ignored)
         ^
         |
         +------------- first column

Note that the spaces on either side of the keyname are mandatory and that
there cannot be any spaces in the keyname itself.

*/



// Sor.toSDL //-----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "sor {" + (this.id === null ? "" : " // " + this.id));
    var items = [ this.points.length ];
    for(var i = 0; i < this.points.length; i++)
        items.push(this.points[i].toSDL());
    content.push(ppad + items.join(", "));
    if(this.open)
        content.push(ppad + "open");
    if(this.sturm)
        content.push(ppad + "sturm");

    $Primitive.toSDL-postamble
}



// Sphere.toSDL //--------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined. This and the Cylinder.toSDL
// method take an optional second argument, component, which will emit code
// appropriate for a Blob component if true.
//--------------------------------------------------------------------------

toSDL(stops = 0, component = false) {

    $Primitive.toSDL-preamble

    if(component) {
        return pad + "sphere { " + this.center.toSDL() + ", " + this.radius
            + (this.strength !== null ? ", " + this.strength : "")
            + " }";
    } else {
        content.push(pad + "sphere {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.center.toSDL() + ", " + this.radius);
        $Primitive.toSDL-postamble
    }

}



// SphereSweep.toSDL //---------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(this.type == "linearSpline" && this.spheres.length < 2)
        cpov.error("fatal", "A linear spline requires at least two spheres.", "SphereSweep.toSDL", this);
    else if((this.type == "bezierSpline" || this.type == "cubicSpline") && this.spheres.length < 4)
        cpov.error("fatal", "Bezier and cubic splines require at least four spheres.", "SphereSweep.toSDL", this);

    content.push(pad + "sphere_sweep {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + cpov.internalSplineTypes[this.type]);
    content.push(ppad + this.spheres.length + ",");
    var items = [ ];
    for(var i = 0; i < this.spheres.length; i++) {
        items.push(ppad + this.spheres[i].center.toSDL() + ", " + this.spheres[i].radius);
    }
    content.push(items.join(",\n"));
    if(this.tolerance !== null)
        content.push(ppad + "tolerance " + this.tolerance);

    $Primitive.toSDL-postamble
}



// Superellipsoid.toSDL //------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "superellipsoid {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + "<" + this.e + ", " + this.n + ">");

    $Primitive.toSDL-postamble
}



// Text.toSDL //----------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    // TODO: Handle escaping of double quotes in this.displayText

    content.push(pad + "text {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.fontType + " " + "\"" + this.font + "\" \"" + this.displayText.replace(/"/g, "\\\"") + "\"");
    content.push(ppad + this.thickness + ", " + this.offset);

    $Primitive.toSDL-postamble
}



// Torus.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "torus {" + (this.id === null ? "" : " // " + this.id));
    content.push(ppad + this.majorRadius + ", " + this.minorRadius);

    $Primitive.toSDL-postamble

}



// Triangle.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//
// The CephaloPOV Triangle object incorporates both the triangle and
// smooth_triangle types. If smooth is true and normal1-3 are defined, it
// will output a smooth_triangle. Otherwise a triangle is output.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    if(!this.smooth) {

        content.push(pad + "triangle {" + (this.id === null ? "" : " // " + this.id));
        content.push(ppad + this.corner1.toSDL() + ", " + this.corner2.toSDL() + ", " + this.corner3.toSDL());

    } else {

        if(this.normal1 === null)
            cpov.error("fatal", "normal1 is undefined.", "Triangle.toSDL", this);
        if(this.normal2 === null)
            cpov.error("fatal", "normal2 is undefined.", "Triangle.toSDL", this);
        if(this.normal3 === null)
            cpov.error("fatal", "normal3 is undefined.", "Triangle.toSDL", this);

        content.push(pad + "smooth_triangle {");
        content.push(ppad
            + this.corner1.toSDL() + ", " + this.normal1.toSDL() + ", "
            + this.corner2.toSDL() + ", " + this.normal2.toSDL() + ", "
            + this.corner3.toSDL() + ", " + this.normal3.toSDL());

    }

    $Primitive.toSDL-postamble
}



// Union.toSDL //---------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the object. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Primitive.toSDL-preamble

    content.push(pad + "union {" + (this.id === null ? "" : " // " + this.id));
    for(var i = 0; i < this.components.length; i++) {
        content.push(this.components[i].toSDL(stops + 1));
    }

    var splitUnion = this._splitUnion !== null ? this._splitUnion : cpov.imageOptions.splitUnions;

    content.push(pad + "    split_union " + (splitUnion ? "on" : "off"));

    $Primitive.toSDL-postamble
}



// Vector.toSDL-preamble //-----------------------------------------------------

this.requiredParameterTest(this.requiredParams);



// VectorUV.asArray //----------------------------------------------------------

//--------------------------------------------------------------------------
// Returns the VectorUV as an array [u, v] based on mode, which may be one
// of:
//
//     normal ... This is the default. Returns an array in which
//                all JS functions have been replaced by their return
//                values.
//     literal ... Returns an exact copy.
//     calc ...... As normal, except that the presence of an SDL function
//                 will return null instead of the expected array.
//     sdl ....... As normal, except that SDL functions are included, minus
//                 their leading '&'.
//--------------------------------------------------------------------------

asArray(mode = "normal") {

    var result = [ ];
    var source = [ this._u, this._v ];

    switch(mode) {

        case "normal":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else
                    result[i] = source[i];
            }
            break;

        case "literal":
            result = source;
            break;

        case "calc":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    return null;
                else
                    result[i] = source[i];
            }
            break;

        case "sdl":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    result[i] = source[i].substr(1);
                else
                    result[i] = source[i];
            }
            break;

        default:
            cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorUV.asArray", this);
            break;
    }

    return result;
}



// VectorUV.conBlock //---------------------------------------------------------

if(options !== undefined) {
    if(cpov.isClassInstance(options, "VectorUV")) { // copy
        options = { u: options.u, v: options.v };
    }

    if(Array.isArray(options)) {
        if(options.length != 2) {
            cpov.error("fatal", "When initializing a VectorUV with an array, it must have exactly two values.", "VectorUV.constructor", this);
        } else {
            this.u = options[0];
            this.v = options[1];
        }
    } else if(typeof options == "object") {
        if(options.u === undefined || options.v === undefined)
            cpov.error("fatal", "When initializing a VectorUV with an object, u and v must be defined.", "VectorUV.constructor", this);
        cpov.initObject(this, options);
    } else {
        cpov.error("fatal", "Invalid initializer.", "VectorUV.constructor", this);
    }
}



// VectorUV.copy //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorUV();
    that._u = this._u;
    that._v = this._v;

    return that;
}



// VectorUV.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Vector.toSDL-preamble

    return cpov.tab(stops) + "<" + this.u + ", " + this.v + ">";
}



// VectorXY.asArray //----------------------------------------------------------

//--------------------------------------------------------------------------
// Returns the VectorXY as an array [x, y] based on mode, which may be one
// of:
//
//     normal ... This is the default. Returns an array in which
//                all JS functions have been replaced by their return
//                values.
//     literal ... Returns an exact copy.
//     calc ...... As normal, except that the presence of an SDL function
//                 will return null instead of the expected array.
//     sdl ....... As normal, except that SDL functions are included, minus
//                 their leading '&'.
//--------------------------------------------------------------------------

asArray(mode = "normal") {

    var result = [ ];
    var source = [ this._x, this._y ];

    switch(mode) {

        case "normal":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else
                    result[i] = source[i];
            }
            break;

        case "literal":
            result = source;
            break;

        case "calc":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    return null;
                else
                    result[i] = source[i];
            }
            break;

        case "sdl":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    result[i] = source[i].substr(1);
                else
                    result[i] = source[i];
            }
            break;

        default:
            cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorXY.asArray", this);
            break;
    }

    return result;
}



// VectorXY.conBlock //---------------------------------------------------------

if(options !== undefined) {
    if(cpov.isClassInstance(options, "VectorXY")) { // copy
        options = { x: options.x, y: options.y };
    }

    if(Array.isArray(options)) {
        if(options.length != 2) {
            cpov.error("fatal", "When initializing a VectorXY with an array, it must have exactly two values.", "VectorXY.constructor", this);
        } else {
            this.x = options[0];
            this.y = options[1];
        }
    } else if(typeof options == "object") {
        if(options.x === undefined || options.y === undefined)
            cpov.error("fatal", "When initializing a VectorXY with an object, x and y must be defined.", "VectorXY.constructor", this);
        cpov.initObject(this, options);
    } else {
        cpov.error("fatal", "Invalid initializer.", "VectorXY.constructor", this);
    }
}



// VectorXY.copy //-------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorXY();
    that._x = this._x;
    that._y = this._y;

    return that;
}



// VectorXY.toSDL //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Vector.toSDL-preamble

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ">";
}



// VectorXYZ.asArray //---------------------------------------------------------

//--------------------------------------------------------------------------
// Returns the VectorXYZ as an array [x,y,z] based on mode, which may be one
// of:
//
//     normal ... This is the default. Returns an array in which
//                all JS functions have been replaced by their return
//                values.
//     literal ... Returns an exact copy.
//     calc ...... As normal, except that the presence of an SDL function
//                 will return null instead of the expected array.
//     sdl ....... As normal, except that SDL functions are included, minus
//                 their leading '&'.
//--------------------------------------------------------------------------

asArray(mode = "normal") {

    var result = [ ];
    var source = [ this._x, this._y, this._z ];

    switch(mode) {

        case "normal":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else
                    result[i] = source[i];
            }
            break;

        case "literal":
            result = source;
            break;

        case "calc":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    return null;
                else
                    result[i] = source[i];
            }
            break;

        case "sdl":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    result[i] = source[i].substr(1);
                else
                    result[i] = source[i];
            }
            break;

        default:
            cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorXYZ.asArray", this);
            break;
    }

    return result;
}



// VectorXYZ.conBlock //--------------------------------------------------------

if(options !== undefined) {
    if(cpov.isClassInstance(options, "VectorXYZ")) { // copy
        options = { x: options.x, y: options.y, z: options.z };
    }

    if(Array.isArray(options)) {
        if(options.length != 3) {
            cpov.error("fatal", "When initializing a VectorXYZ with an array, it must have exactly three values.", "VectorXYZ.constructor", this);
        } else {
            this.x = options[0];
            this.y = options[1];
            this.z = options[2];
        }
    } else if(typeof options == "object") {
        if(options.x === undefined || options.y === undefined || options.z === undefined)
            cpov.error("fatal", "When initializing a VectorXYZ with an object, x, y and z must be defined.", "VectorXYZ.constructor", this);
        cpov.initObject(this, options);
    } else {
        cpov.error("fatal", "Invalid initializer.", "VectorXYZ.constructor", this);
    }
}



// VectorXYZ.copy //------------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorXYZ();
    that._x = this._x;
    that._y = this._y;
    that._z = this._z;

    return that;
}



// VectorXYZ.toSDL //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Vector.toSDL-preamble

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ">";
}



// VectorXYZW.asArray //--------------------------------------------------------

//--------------------------------------------------------------------------
// Returns the VectorXYZW as an array [x,y,z,w] based on mode, which may be
// one of:
//
//     normal ... This is the default. Returns an array in which
//                all JS functions have been replaced by their return
//                values.
//     literal ... Returns an exact copy.
//     calc ...... As normal, except that the presence of an SDL function
//                 will return null instead of the expected array.
//     sdl ....... As normal, except that SDL functions are included, minus
//                 their leading '&'.
//--------------------------------------------------------------------------

asArray(mode = "normal") {

    var result = [ ];
    var source = [ this._x, this._y, this._z, this._w ];

    switch(mode) {

        case "normal":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else
                    result[i] = source[i];
            }
            break;

        case "literal":
            result = source;
            break;

        case "calc":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    return null;
                else
                    result[i] = source[i];
            }
            break;

        case "sdl":
            for(var i = 0; i < source.length; i++) {
                if(typeof source[i] == "function")
                    result[i] = source[i](cpov, this);
                else if(cpov.isSDLFunction(source[i]))
                    result[i] = source[i].substr(1);
                else
                    result[i] = source[i];
            }
            break;

        default:
            cpov.error("fatal", "mode argument must be one of 'normal', 'literal', 'calc', or 'sdl'.", "VectorXYZ.asArray", this);
            break;
    }

    return result;
}



// VectorXYZW.conBlock //-------------------------------------------------------

if(options !== undefined) {
    if(cpov.isClassInstance(options, "VectorXYZW")) { // copy
        options = { x: options.x, y: options.y, z: options.z, w: options.w };
    }

    if(Array.isArray(options)) {
        if(options.length != 4) {
            cpov.error("fatal", "When initializing a VectorXYZW with an array, it must have exactly four values.", "VectorXYZW.constructor", this);
        } else {
            this.x = options[0];
            this.y = options[1];
            this.z = options[2];
            this.w = options[3];
        }
    } else if(typeof options == "object") {
        if(options.x === undefined || options.y === undefined || options.z === undefined || options.w === undefined)
            cpov.error("fatal", "When initializing a VectorXYZW with an object, x, y, z, and w must be defined.", "VectorXYZW.constructor", this);
        cpov.initObject(this, options);
    } else {
        cpov.error("fatal", "Invalid initializer.", "VectorXYZW.constructor", this);
    }
}



// VectorXYZW.copy //-----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces a copy of the vector. Does so quickly by directly copying
// "private" members instead of going through get/set methods.
//--------------------------------------------------------------------------

copy() {

    var that = new VectorXYZW();
    that._x = this._x;
    that._y = this._y;
    that._z = this._z;
    that._w = this._w;

    return that;
}



// VectorXYZW.toSDL //----------------------------------------------------------

//--------------------------------------------------------------------------
// Produces SDL representation of the vector. Will terminate the program if
// any necessary attributes are undefined.
//--------------------------------------------------------------------------

toSDL(stops = 0) {

    $Vector.toSDL-preamble

    return cpov.tab(stops) + "<" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ">";
}



