var cpov = require("./cpov.js").cpov;

//==============================================================================
//==============================================================================

class Primitive {

    constructor(objType, args) {
        this._active = null;
        this._baseTransform = null;
        this._boundedBy = null;
        this._children = null;
        this._clippedBy = null;
        this._doubleIlluminate = null;
        this._finish = null;
        this._frameBegin = null;
        this._frameEnd = null;
        this._hierarchy = null;
        this._hollow = null;
        this._id = null;
        this._interior = null;
        this._inverse = null;
        this._material = null;
        this._noImage = null;
        this._noRadiosity = null;
        this._noReflection = null;
        this._normal = null;
        this._noShadow = null;
        this._parent = null;
        this._photons = null;
        this._radiosity = null;
        this._serial = null;
        this._texture = null;
        this._transform = null;
    }

    //--------------------------------------------------------------------------

    get active() {
        if(typeof this._active == "function")
            return this._active();
        else if(typeof this._active == "string" && this._active.substr(0, 1) == "&")
            return this._active.substr(1);
        else
            return this._active;
    }

    //--------------------------------------------------------------------------

    set active(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._active = val;
        } else {
            cpov.error("fatal", "active must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get baseTransform() {
        if(typeof this._baseTransform == "function")
            return this._baseTransform();
        else if(typeof this._baseTransform == "string" && this._baseTransform.substr(0, 1) == "&")
            return this._baseTransform.substr(1);
        else
            return this._baseTransform;
    }

    //--------------------------------------------------------------------------

    set baseTransform(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Matrix'))) {
            this._baseTransform = val;
        } else {
            cpov.error("fatal", "baseTransform must be a Matrix.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get boundedBy() {
        if(typeof this._boundedBy == "function")
            return this._boundedBy();
        else if(typeof this._boundedBy == "string" && this._boundedBy.substr(0, 1) == "&")
            return this._boundedBy.substr(1);
        else
            return this._boundedBy;
    }

    //--------------------------------------------------------------------------

    set boundedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom('Primitive') )) {
            this._boundedBy = val;
        } else {
            cpov.error("fatal", "boundedBy must be a Primitive.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get children() {
        if(typeof this._children == "function")
            return this._children();
        else if(typeof this._children == "string" && this._children.substr(0, 1) == "&")
            return this._children.substr(1);
        else
            return this._children;
    }

    //--------------------------------------------------------------------------

    set children(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfSubclass(val, 'Primitive'))) {
            this._children = val;
        } else {
            cpov.error("fatal", "children must be an array of Primitives.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get clippedBy() {
        if(typeof this._clippedBy == "function")
            return this._clippedBy();
        else if(typeof this._clippedBy == "string" && this._clippedBy.substr(0, 1) == "&")
            return this._clippedBy.substr(1);
        else
            return this._clippedBy;
    }

    //--------------------------------------------------------------------------

    set clippedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._clippedBy = val;
        } else {
            cpov.error("fatal", "clippedBy", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get doubleIlluminate() {
        if(typeof this._doubleIlluminate == "function")
            return this._doubleIlluminate();
        else if(typeof this._doubleIlluminate == "string" && this._doubleIlluminate.substr(0, 1) == "&")
            return this._doubleIlluminate.substr(1);
        else
            return this._doubleIlluminate;
    }

    //--------------------------------------------------------------------------

    set doubleIlluminate(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._doubleIlluminate = val;
        } else {
            cpov.error("fatal", "doubleIlluminate must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get finish() {
        if(typeof this._finish == "function")
            return this._finish();
        else if(typeof this._finish == "string" && this._finish.substr(0, 1) == "&")
            return this._finish.substr(1);
        else
            return this._finish;
    }

    //--------------------------------------------------------------------------

    set finish(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Finish'))) {
            this._finish = val;
        } else {
            cpov.error("fatal", "finish must be a Finish.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get frameBegin() {
        if(typeof this._frameBegin == "function")
            return this._frameBegin();
        else if(typeof this._frameBegin == "string" && this._frameBegin.substr(0, 1) == "&")
            return this._frameBegin.substr(1);
        else
            return this._frameBegin;
    }

    //--------------------------------------------------------------------------

    set frameBegin(val) {
        if(cpov.isNullOrFunction(val) || (typeof val == 'function')) {
            this._frameBegin = val;
        } else {
            cpov.error("fatal", "frameBegin must be a JavaScript function.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get frameEnd() {
        if(typeof this._frameEnd == "function")
            return this._frameEnd();
        else if(typeof this._frameEnd == "string" && this._frameEnd.substr(0, 1) == "&")
            return this._frameEnd.substr(1);
        else
            return this._frameEnd;
    }

    //--------------------------------------------------------------------------

    set frameEnd(val) {
        if(cpov.isNullOrFunction(val) || (typeof val == 'function')) {
            this._frameEnd = val;
        } else {
            cpov.error("fatal", "frameEnd must be a JavaScript function.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    //--------------------------------------------------------------------------

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get hollow() {
        if(typeof this._hollow == "function")
            return this._hollow();
        else if(typeof this._hollow == "string" && this._hollow.substr(0, 1) == "&")
            return this._hollow.substr(1);
        else
            return this._hollow;
    }

    //--------------------------------------------------------------------------

    set hollow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hollow = val;
        } else {
            cpov.error("fatal", "hollow must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get id() {
        if(typeof this._id == "function")
            return this._id();
        else if(typeof this._id == "string" && this._id.substr(0, 1) == "&")
            return this._id.substr(1);
        else
            return this._id;
    }

    //--------------------------------------------------------------------------

    set id(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._id = val;
        } else {
            cpov.error("fatal", "id must be a non-empty string.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get interior() {
        if(typeof this._interior == "function")
            return this._interior();
        else if(typeof this._interior == "string" && this._interior.substr(0, 1) == "&")
            return this._interior.substr(1);
        else
            return this._interior;
    }

    //--------------------------------------------------------------------------

    set interior(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Interior'))) {
            this._interior = val;
        } else {
            cpov.error("fatal", "interior must be an Interior.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get inverse() {
        if(typeof this._inverse == "function")
            return this._inverse();
        else if(typeof this._inverse == "string" && this._inverse.substr(0, 1) == "&")
            return this._inverse.substr(1);
        else
            return this._inverse;
    }

    //--------------------------------------------------------------------------

    set inverse(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._inverse = val;
        } else {
            cpov.error("fatal", "inverse must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get material() {
        if(typeof this._material == "function")
            return this._material();
        else if(typeof this._material == "string" && this._material.substr(0, 1) == "&")
            return this._material.substr(1);
        else
            return this._material;
    }

    //--------------------------------------------------------------------------

    set material(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Material'))) {
            this._material = val;
        } else {
            cpov.error("fatal", "material must be a Material.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noImage() {
        if(typeof this._noImage == "function")
            return this._noImage();
        else if(typeof this._noImage == "string" && this._noImage.substr(0, 1) == "&")
            return this._noImage.substr(1);
        else
            return this._noImage;
    }

    //--------------------------------------------------------------------------

    set noImage(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noImage = val;
        } else {
            cpov.error("fatal", "noImage must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noRadiosity() {
        if(typeof this._noRadiosity == "function")
            return this._noRadiosity();
        else if(typeof this._noRadiosity == "string" && this._noRadiosity.substr(0, 1) == "&")
            return this._noRadiosity.substr(1);
        else
            return this._noRadiosity;
    }

    //--------------------------------------------------------------------------

    set noRadiosity(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noRadiosity = val;
        } else {
            cpov.error("fatal", "noRadiosity must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noReflection() {
        if(typeof this._noReflection == "function")
            return this._noReflection();
        else if(typeof this._noReflection == "string" && this._noReflection.substr(0, 1) == "&")
            return this._noReflection.substr(1);
        else
            return this._noReflection;
    }

    //--------------------------------------------------------------------------

    set noReflection(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noReflection = val;
        } else {
            cpov.error("fatal", "noReflection must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(typeof this._normal == "string" && this._normal.substr(0, 1) == "&")
            return this._normal.substr(1);
        else
            return this._normal;
    }

    //--------------------------------------------------------------------------

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get noShadow() {
        if(typeof this._noShadow == "function")
            return this._noShadow();
        else if(typeof this._noShadow == "string" && this._noShadow.substr(0, 1) == "&")
            return this._noShadow.substr(1);
        else
            return this._noShadow;
    }

    //--------------------------------------------------------------------------

    set noShadow(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._noShadow = val;
        } else {
            cpov.error("fatal", "noShadow must be a boolean.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get parent() {
        if(typeof this._parent == "function")
            return this._parent();
        else if(typeof this._parent == "string" && this._parent.substr(0, 1) == "&")
            return this._parent.substr(1);
        else
            return this._parent;
    }

    //--------------------------------------------------------------------------

    set parent(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._parent = val;
        } else {
            cpov.error("fatal", "parent must be a Primitive.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get photons() {
        if(typeof this._photons == "function")
            return this._photons();
        else if(typeof this._photons == "string" && this._photons.substr(0, 1) == "&")
            return this._photons.substr(1);
        else
            return this._photons;
    }

    //--------------------------------------------------------------------------

    set photons(val) {
        if(true) { // FIXME
            this._photons = val;
        } else {
            cpov.error("fatal", "photons", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get radiosity() {
        if(typeof this._radiosity == "function")
            return this._radiosity();
        else if(typeof this._radiosity == "string" && this._radiosity.substr(0, 1) == "&")
            return this._radiosity.substr(1);
        else
            return this._radiosity;
    }

    //--------------------------------------------------------------------------

    set radiosity(val) {
        if(true) { // FIXME
            this._radiosity = val;
        } else {
            cpov.error("fatal", "radiosity", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get serial() {
        if(typeof this._serial == "function")
            return this._serial();
        else if(typeof this._serial == "string" && this._serial.substr(0, 1) == "&")
            return this._serial.substr(1);
        else
            return this._serial;
    }

    //--------------------------------------------------------------------------

    set serial(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._serial = val;
        } else {
            cpov.error("fatal", "serial must be an integer.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get texture() {
        if(typeof this._texture == "function")
            return this._texture();
        else if(typeof this._texture == "string" && this._texture.substr(0, 1) == "&")
            return this._texture.substr(1);
        else
            return this._texture;
    }

    //--------------------------------------------------------------------------

    set texture(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Texture'))) {
            this._texture = val;
        } else {
            cpov.error("fatal", "texture must be a Texture.", "Primitive");
        }
    }

    //--------------------------------------------------------------------------

    get transform() {
        if(typeof this._transform == "function")
            return this._transform();
        else if(typeof this._transform == "string" && this._transform.substr(0, 1) == "&")
            return this._transform.substr(1);
        else
            return this._transform;
    }

    //--------------------------------------------------------------------------

    set transform(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Matrix'))) {
            this._transform = val;
        } else {
            cpov.error("fatal", "transform must be a Matrix.", "Primitive");
        }
    }


}

exports.Primitive = Primitive;

//==============================================================================
//==============================================================================

class Blob extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._components = null;
        this._threshold = null;
        this._sturm = null;
        this._hierarchy = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Blob]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Blob]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Blob]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get components() {
        if(typeof this._components == "function")
            return this._components();
        else if(typeof this._components == "string" && this._components.substr(0, 1) == "&")
            return this._components.substr(1);
        else
            return this._components;
    }

    //--------------------------------------------------------------------------

    set components(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, ['Sphere', 'Cylinder']) && components.length)) {
            this._components = val;
        } else {
            cpov.error("fatal", "components must be an array of Spheres and/or Cylinders.", "Blob");
        }
    }

    //--------------------------------------------------------------------------

    get threshold() {
        if(typeof this._threshold == "function")
            return this._threshold();
        else if(typeof this._threshold == "string" && this._threshold.substr(0, 1) == "&")
            return this._threshold.substr(1);
        else
            return this._threshold;
    }

    //--------------------------------------------------------------------------

    set threshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._threshold = val;
        } else {
            cpov.error("fatal", "threshold", "Blob");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Blob");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    //--------------------------------------------------------------------------

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Blob");
        }
    }


}

exports.Blob = Blob;

//==============================================================================
//==============================================================================

class Box extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._corner1 = null;
        this._corner2 = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Box]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Box]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Box]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1();
        else if(typeof this._corner1 == "string" && this._corner1.substr(0, 1) == "&")
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    //--------------------------------------------------------------------------

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Box");
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2();
        else if(typeof this._corner2 == "string" && this._corner2.substr(0, 1) == "&")
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    //--------------------------------------------------------------------------

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2", "Box");
        }
    }


}

exports.Box = Box;

//==============================================================================
//==============================================================================

class Camera extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = false;
        this._csg = false;
        this._type = null;
        this._angle = null;
        this._apertureSize = null;
        this._blurSamples = null;
        this._bokeh = null;
        this._confidence = null;
        this._cylinderType = null;
        this._direction = null;
        this._focalPoint = null;
        this._location = null;
        this._lookAt = null;
        this._right = null;
        this._sky = null;
        this._up = null;
        this._variance = null;
        this._vertAngle = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Camera]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Camera]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Camera]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    //--------------------------------------------------------------------------

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, ['perspective', 'orthographic', 'fisheye', 'ultra_wide_angle', 'omnimax', 'panoramic', 'spherical', 'cylinder', 'mesh_camera']))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of perspective, orthographic, fisheye, ultra_wide_angle, omnimax, panoramic, spherical, cylinder, or mesh_camera.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get angle() {
        if(typeof this._angle == "function")
            return this._angle();
        else if(typeof this._angle == "string" && this._angle.substr(0, 1) == "&")
            return this._angle.substr(1);
        else
            return this._angle;
    }

    //--------------------------------------------------------------------------

    set angle(val) {
        if(true) { // FIXME
            this._angle = val;
        } else {
            cpov.error("fatal", "angle", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get apertureSize() {
        if(typeof this._apertureSize == "function")
            return this._apertureSize();
        else if(typeof this._apertureSize == "string" && this._apertureSize.substr(0, 1) == "&")
            return this._apertureSize.substr(1);
        else
            return this._apertureSize;
    }

    //--------------------------------------------------------------------------

    set apertureSize(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._apertureSize = val;
        } else {
            cpov.error("fatal", "apertureSize must be a float.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get blurSamples() {
        if(typeof this._blurSamples == "function")
            return this._blurSamples();
        else if(typeof this._blurSamples == "string" && this._blurSamples.substr(0, 1) == "&")
            return this._blurSamples.substr(1);
        else
            return this._blurSamples;
    }

    //--------------------------------------------------------------------------

    set blurSamples(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 2, 2) && val[0] >= 0 && val[1] >= 0)) {
            this._blurSamples = val;
        } else {
            cpov.error("fatal", "blurSamples must be an array of two floats greater than or equal to zero.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get bokeh() {
        if(typeof this._bokeh == "function")
            return this._bokeh();
        else if(typeof this._bokeh == "string" && this._bokeh.substr(0, 1) == "&")
            return this._bokeh.substr(1);
        else
            return this._bokeh;
    }

    //--------------------------------------------------------------------------

    set bokeh(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorRGB') && val.r >= 0 && val.r <= 1 && val.g >= 0 && val.g <= 1 && val.b == 0)) {
            this._bokeh = val;
        } else {
            cpov.error("fatal", "bokeh must be a VectorRGB in the range <0, 0, 0> to <1, 1, 0>.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get confidence() {
        if(typeof this._confidence == "function")
            return this._confidence();
        else if(typeof this._confidence == "string" && this._confidence.substr(0, 1) == "&")
            return this._confidence.substr(1);
        else
            return this._confidence;
    }

    //--------------------------------------------------------------------------

    set confidence(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._confidence = val;
        } else {
            cpov.error("fatal", "confidence must be a float.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get cylinderType() {
        if(typeof this._cylinderType == "function")
            return this._cylinderType();
        else if(typeof this._cylinderType == "string" && this._cylinderType.substr(0, 1) == "&")
            return this._cylinderType.substr(1);
        else
            return this._cylinderType;
    }

    //--------------------------------------------------------------------------

    set cylinderType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && val > 0 && val < 5)) {
            this._cylinderType = val;
        } else {
            cpov.error("fatal", "cylinderType must be an integer in the range (1 - 4).", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get direction() {
        if(typeof this._direction == "function")
            return this._direction();
        else if(typeof this._direction == "string" && this._direction.substr(0, 1) == "&")
            return this._direction.substr(1);
        else
            return this._direction;
    }

    //--------------------------------------------------------------------------

    set direction(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._direction = val;
        } else {
            cpov.error("fatal", "direction must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get focalPoint() {
        if(typeof this._focalPoint == "function")
            return this._focalPoint();
        else if(typeof this._focalPoint == "string" && this._focalPoint.substr(0, 1) == "&")
            return this._focalPoint.substr(1);
        else
            return this._focalPoint;
    }

    //--------------------------------------------------------------------------

    set focalPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._focalPoint = val;
        } else {
            cpov.error("fatal", "focalPoint must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location();
        else if(typeof this._location == "string" && this._location.substr(0, 1) == "&")
            return this._location.substr(1);
        else
            return this._location;
    }

    //--------------------------------------------------------------------------

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get lookAt() {
        if(typeof this._lookAt == "function")
            return this._lookAt();
        else if(typeof this._lookAt == "string" && this._lookAt.substr(0, 1) == "&")
            return this._lookAt.substr(1);
        else
            return this._lookAt;
    }

    //--------------------------------------------------------------------------

    set lookAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._lookAt = val;
        } else {
            cpov.error("fatal", "lookAt must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get right() {
        if(typeof this._right == "function")
            return this._right();
        else if(typeof this._right == "string" && this._right.substr(0, 1) == "&")
            return this._right.substr(1);
        else
            return this._right;
    }

    //--------------------------------------------------------------------------

    set right(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._right = val;
        } else {
            cpov.error("fatal", "right must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get sky() {
        if(typeof this._sky == "function")
            return this._sky();
        else if(typeof this._sky == "string" && this._sky.substr(0, 1) == "&")
            return this._sky.substr(1);
        else
            return this._sky;
    }

    //--------------------------------------------------------------------------

    set sky(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._sky = val;
        } else {
            cpov.error("fatal", "sky must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get up() {
        if(typeof this._up == "function")
            return this._up();
        else if(typeof this._up == "string" && this._up.substr(0, 1) == "&")
            return this._up.substr(1);
        else
            return this._up;
    }

    //--------------------------------------------------------------------------

    set up(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._up = val;
        } else {
            cpov.error("fatal", "up must be a VectorXYZ.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get variance() {
        if(typeof this._variance == "function")
            return this._variance();
        else if(typeof this._variance == "string" && this._variance.substr(0, 1) == "&")
            return this._variance.substr(1);
        else
            return this._variance;
    }

    //--------------------------------------------------------------------------

    set variance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._variance = val;
        } else {
            cpov.error("fatal", "variance must be a float.", "Camera");
        }
    }

    //--------------------------------------------------------------------------

    get vertAngle() {
        if(typeof this._vertAngle == "function")
            return this._vertAngle();
        else if(typeof this._vertAngle == "string" && this._vertAngle.substr(0, 1) == "&")
            return this._vertAngle.substr(1);
        else
            return this._vertAngle;
    }

    //--------------------------------------------------------------------------

    set vertAngle(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._vertAngle = val;
        } else {
            cpov.error("fatal", "vertAngle must be an integer.", "Camera");
        }
    }


}

exports.Camera = Camera;

//==============================================================================
//==============================================================================

class Cone extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._basePoint = null;
        this._baseRadius = null;
        this._capPoint = null;
        this._capRadius = null;
        this._open = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Cone]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Cone]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Cone]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint();
        else if(typeof this._basePoint == "string" && this._basePoint.substr(0, 1) == "&")
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    //--------------------------------------------------------------------------

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get baseRadius() {
        if(typeof this._baseRadius == "function")
            return this._baseRadius();
        else if(typeof this._baseRadius == "string" && this._baseRadius.substr(0, 1) == "&")
            return this._baseRadius.substr(1);
        else
            return this._baseRadius;
    }

    //--------------------------------------------------------------------------

    set baseRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._baseRadius = val;
        } else {
            cpov.error("fatal", "baseRadius must be a float.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get capPoint() {
        if(typeof this._capPoint == "function")
            return this._capPoint();
        else if(typeof this._capPoint == "string" && this._capPoint.substr(0, 1) == "&")
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    //--------------------------------------------------------------------------

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get capRadius() {
        if(typeof this._capRadius == "function")
            return this._capRadius();
        else if(typeof this._capRadius == "string" && this._capRadius.substr(0, 1) == "&")
            return this._capRadius.substr(1);
        else
            return this._capRadius;
    }

    //--------------------------------------------------------------------------

    set capRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._capRadius = val;
        } else {
            cpov.error("fatal", "capRadius must be a float.", "Cone");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    //--------------------------------------------------------------------------

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Cone");
        }
    }


}

exports.Cone = Cone;

//==============================================================================
//==============================================================================

class Cylinder extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._basePoint = null;
        this._capPoint = null;
        this._radius = null;
        this._open = null;
        this._strength = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Cylinder]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Cylinder]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Cylinder]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get basePoint() {
        if(typeof this._basePoint == "function")
            return this._basePoint();
        else if(typeof this._basePoint == "string" && this._basePoint.substr(0, 1) == "&")
            return this._basePoint.substr(1);
        else
            return this._basePoint;
    }

    //--------------------------------------------------------------------------

    set basePoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._basePoint = val;
        } else {
            cpov.error("fatal", "basePoint must be a VectorXYZ.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get capPoint() {
        if(typeof this._capPoint == "function")
            return this._capPoint();
        else if(typeof this._capPoint == "string" && this._capPoint.substr(0, 1) == "&")
            return this._capPoint.substr(1);
        else
            return this._capPoint;
    }

    //--------------------------------------------------------------------------

    set capPoint(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._capPoint = val;
        } else {
            cpov.error("fatal", "capPoint must be a VectorXYZ.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    //--------------------------------------------------------------------------

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    //--------------------------------------------------------------------------

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Cylinder");
        }
    }

    //--------------------------------------------------------------------------

    get strength() {
        if(typeof this._strength == "function")
            return this._strength();
        else if(typeof this._strength == "string" && this._strength.substr(0, 1) == "&")
            return this._strength.substr(1);
        else
            return this._strength;
    }

    //--------------------------------------------------------------------------

    set strength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._strength = val;
        } else {
            cpov.error("fatal", "strength must be a float", "Cylinder");
        }
    }


}

exports.Cylinder = Cylinder;

//==============================================================================
//==============================================================================

class HeightField extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._source = null;
        this._hfType = null;
        this._smooth = null;
        this._waterLevel = null;
        this._hierarchy = null;
        this._gamma = null;
        this._premult = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[HeightField]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[HeightField]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[HeightField]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get source() {
        if(typeof this._source == "function")
            return this._source();
        else if(typeof this._source == "string" && this._source.substr(0, 1) == "&")
            return this._source.substr(1);
        else
            return this._source;
    }

    //--------------------------------------------------------------------------

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val) || cpov.isString(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get hfType() {
        if(typeof this._hfType == "function")
            return this._hfType();
        else if(typeof this._hfType == "string" && this._hfType.substr(0, 1) == "&")
            return this._hfType.substr(1);
        else
            return this._hfType;
    }

    //--------------------------------------------------------------------------

    set hfType(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInArray(val, cpov.hfTypes))) {
            this._hfType = val;
        } else {
            cpov.error("fatal", "hfType must be one of exr, gif, hdr, iff, jpeg, pgm, png, pot, ppm, sys, tga, or tiff.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get smooth() {
        if(typeof this._smooth == "function")
            return this._smooth();
        else if(typeof this._smooth == "string" && this._smooth.substr(0, 1) == "&")
            return this._smooth.substr(1);
        else
            return this._smooth;
    }

    //--------------------------------------------------------------------------

    set smooth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._smooth = val;
        } else {
            cpov.error("fatal", "smooth must be a boolean.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get waterLevel() {
        if(typeof this._waterLevel == "function")
            return this._waterLevel();
        else if(typeof this._waterLevel == "string" && this._waterLevel.substr(0, 1) == "&")
            return this._waterLevel.substr(1);
        else
            return this._waterLevel;
    }

    //--------------------------------------------------------------------------

    set waterLevel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._waterLevel = val;
        } else {
            cpov.error("fatal", "waterLevel must be a float.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    //--------------------------------------------------------------------------

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get gamma() {
        if(typeof this._gamma == "function")
            return this._gamma();
        else if(typeof this._gamma == "string" && this._gamma.substr(0, 1) == "&")
            return this._gamma.substr(1);
        else
            return this._gamma;
    }

    //--------------------------------------------------------------------------

    set gamma(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._gamma = val;
        } else {
            cpov.error("fatal", "gamma must be a float.", "HeightField");
        }
    }

    //--------------------------------------------------------------------------

    get premult() {
        if(typeof this._premult == "function")
            return this._premult();
        else if(typeof this._premult == "string" && this._premult.substr(0, 1) == "&")
            return this._premult.substr(1);
        else
            return this._premult;
    }

    //--------------------------------------------------------------------------

    set premult(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._premult = val;
        } else {
            cpov.error("fatal", "premult must be a boolean.", "HeightField");
        }
    }


}

exports.HeightField = HeightField;

//==============================================================================
//==============================================================================

class IsoSurface extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._source = null;
        this._containedBy = null;
        this._threshold = null;
        this._accuracy = null;
        this._maxGradient = null;
        this._evaluate = null;
        this._open = null;
        this._maxTrace = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[IsoSurface]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[IsoSurface]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[IsoSurface]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get source() {
        if(typeof this._source == "function")
            return this._source();
        else if(typeof this._source == "string" && this._source.substr(0, 1) == "&")
            return this._source.substr(1);
        else
            return this._source;
    }

    //--------------------------------------------------------------------------

    set source(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._source = val;
        } else {
            cpov.error("fatal", "source must be an SDL function.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy();
        else if(typeof this._containedBy == "string" && this._containedBy.substr(0, 1) == "&")
            return this._containedBy.substr(1);
        else
            return this._containedBy;
    }

    //--------------------------------------------------------------------------

    set containedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box'))) {
            this._containedBy = val;
        } else {
            cpov.error("fatal", "containedBy must be a Sphere or a Box.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get threshold() {
        if(typeof this._threshold == "function")
            return this._threshold();
        else if(typeof this._threshold == "string" && this._threshold.substr(0, 1) == "&")
            return this._threshold.substr(1);
        else
            return this._threshold;
    }

    //--------------------------------------------------------------------------

    set threshold(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._threshold = val;
        } else {
            cpov.error("fatal", "threshold", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get accuracy() {
        if(typeof this._accuracy == "function")
            return this._accuracy();
        else if(typeof this._accuracy == "string" && this._accuracy.substr(0, 1) == "&")
            return this._accuracy.substr(1);
        else
            return this._accuracy;
    }

    //--------------------------------------------------------------------------

    set accuracy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._accuracy = val;
        } else {
            cpov.error("fatal", "accuracy must be a float.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get maxGradient() {
        if(typeof this._maxGradient == "function")
            return this._maxGradient();
        else if(typeof this._maxGradient == "string" && this._maxGradient.substr(0, 1) == "&")
            return this._maxGradient.substr(1);
        else
            return this._maxGradient;
    }

    //--------------------------------------------------------------------------

    set maxGradient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._maxGradient = val;
        } else {
            cpov.error("fatal", "maxGradient must be a float.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get evaluate() {
        if(typeof this._evaluate == "function")
            return this._evaluate();
        else if(typeof this._evaluate == "string" && this._evaluate.substr(0, 1) == "&")
            return this._evaluate.substr(1);
        else
            return this._evaluate;
    }

    //--------------------------------------------------------------------------

    set evaluate(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 3, 3))) {
            this._evaluate = val;
        } else {
            cpov.error("fatal", "evaluate must be an array of three floats.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    //--------------------------------------------------------------------------

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "IsoSurface");
        }
    }

    //--------------------------------------------------------------------------

    get maxTrace() {
        if(typeof this._maxTrace == "function")
            return this._maxTrace();
        else if(typeof this._maxTrace == "string" && this._maxTrace.substr(0, 1) == "&")
            return this._maxTrace.substr(1);
        else
            return this._maxTrace;
    }

    //--------------------------------------------------------------------------

    set maxTrace(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) || (typeof val == 'string' && val == 'allIntersections'))) {
            this._maxTrace = val;
        } else {
            cpov.error("fatal", "maxTrace must be either an integer or 'allIntersections'.", "IsoSurface");
        }
    }


}

exports.IsoSurface = IsoSurface;

//==============================================================================
//==============================================================================

class JuliaFractal extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._type = null;
        this._power = null;
        this._maxIter = null;
        this._precision = null;
        this._slice = null;
        this._distance = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[JuliaFractal]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[JuliaFractal]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[JuliaFractal]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    //--------------------------------------------------------------------------

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inArray(val, cpov.juliaFractalTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of hypercomplex:acos, hypercomplex:acosh, hypercomplex:asin, hypercomplex:atan, hypercomplex:atanh, hypercomplex:cos, hypercomplex:cosh, hypercomplex:cube, hypercomplex:exp, hypercomplex:ln, hypercomplex:pwr, hypercomplex:reciprocal, hypercomplex:sin, hypercomplex:sinh, hypercomplex:sqr, hypercomplex:tan, hypercomplex:tanh, quaternion:cube, or quaternion:sqr.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get power() {
        if(typeof this._power == "function")
            return this._power();
        else if(typeof this._power == "string" && this._power.substr(0, 1) == "&")
            return this._power.substr(1);
        else
            return this._power;
    }

    //--------------------------------------------------------------------------

    set power(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXY'))) {
            this._power = val;
        } else {
            cpov.error("fatal", "power must be a VectorXY.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get maxIter() {
        if(typeof this._maxIter == "function")
            return this._maxIter();
        else if(typeof this._maxIter == "string" && this._maxIter.substr(0, 1) == "&")
            return this._maxIter.substr(1);
        else
            return this._maxIter;
    }

    //--------------------------------------------------------------------------

    set maxIter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._maxIter = val;
        } else {
            cpov.error("fatal", "maxIter must be an integer.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get precision() {
        if(typeof this._precision == "function")
            return this._precision();
        else if(typeof this._precision == "string" && this._precision.substr(0, 1) == "&")
            return this._precision.substr(1);
        else
            return this._precision;
    }

    //--------------------------------------------------------------------------

    set precision(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._precision = val;
        } else {
            cpov.error("fatal", "precision must be an integer.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get slice() {
        if(typeof this._slice == "function")
            return this._slice();
        else if(typeof this._slice == "string" && this._slice.substr(0, 1) == "&")
            return this._slice.substr(1);
        else
            return this._slice;
    }

    //--------------------------------------------------------------------------

    set slice(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZW'))) {
            this._slice = val;
        } else {
            cpov.error("fatal", "slice must be a VectorXYZW.", "JuliaFractal");
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance();
        else if(typeof this._distance == "string" && this._distance.substr(0, 1) == "&")
            return this._distance.substr(1);
        else
            return this._distance;
    }

    //--------------------------------------------------------------------------

    set distance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._distance = val;
        } else {
            cpov.error("fatal", "distance must be a float.", "JuliaFractal");
        }
    }


}

exports.JuliaFractal = JuliaFractal;

//==============================================================================
//==============================================================================

class Lathe extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._type = null;
        this._points = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Lathe]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Lathe]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Lathe]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    //--------------------------------------------------------------------------

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.splineTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'bezierSpline', 'cubicSpline', 'linearSpline', or 'quadraticSpline'.", "Lathe");
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    //--------------------------------------------------------------------------

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of two or more VectorXY.", "Lathe");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Lathe");
        }
    }


}

exports.Lathe = Lathe;

//==============================================================================
//==============================================================================

class LightSource extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = false;
        this._csg = false;
        this._location = null;
        this._color = null;
        this._adaptive = null;
        this._areaIllumination = null;
        this._areaLight = null;
        this._axis1 = null;
        this._axis2 = null;
        this._circular = null;
        this._fadeDistance = null;
        this._fadePower = null;
        this._falloff = null;
        this._jitter = null;
        this._looksLike = null;
        this._mediaAttenuation = null;
        this._mediaInteraction = null;
        this._orient = null;
        this._parallel = null;
        this._pointAt = null;
        this._projectedThrough = null;
        this._radius = null;
        this._shadowless = null;
        this._size1 = null;
        this._size2 = null;
        this._tightness = null;
        this._type = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[LightSource]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[LightSource]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[LightSource]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get location() {
        if(typeof this._location == "function")
            return this._location();
        else if(typeof this._location == "string" && this._location.substr(0, 1) == "&")
            return this._location.substr(1);
        else
            return this._location;
    }

    //--------------------------------------------------------------------------

    set location(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._location = val;
        } else {
            cpov.error("fatal", "location must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get color() {
        if(typeof this._color == "function")
            return this._color();
        else if(typeof this._color == "string" && this._color.substr(0, 1) == "&")
            return this._color.substr(1);
        else
            return this._color;
    }

    //--------------------------------------------------------------------------

    set color(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorRGB'))) {
            this._color = val;
        } else {
            cpov.error("fatal", "color must be a VectorRGB.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get adaptive() {
        if(typeof this._adaptive == "function")
            return this._adaptive();
        else if(typeof this._adaptive == "string" && this._adaptive.substr(0, 1) == "&")
            return this._adaptive.substr(1);
        else
            return this._adaptive;
    }

    //--------------------------------------------------------------------------

    set adaptive(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0)) {
            this._adaptive = val;
        } else {
            cpov.error("fatal", "adaptive must be a float greater than or equal to zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get areaIllumination() {
        if(typeof this._areaIllumination == "function")
            return this._areaIllumination();
        else if(typeof this._areaIllumination == "string" && this._areaIllumination.substr(0, 1) == "&")
            return this._areaIllumination.substr(1);
        else
            return this._areaIllumination;
    }

    //--------------------------------------------------------------------------

    set areaIllumination(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._areaIllumination = val;
        } else {
            cpov.error("fatal", "areaIllumination must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get areaLight() {
        if(typeof this._areaLight == "function")
            return this._areaLight();
        else if(typeof this._areaLight == "string" && this._areaLight.substr(0, 1) == "&")
            return this._areaLight.substr(1);
        else
            return this._areaLight;
    }

    //--------------------------------------------------------------------------

    set areaLight(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._areaLight = val;
        } else {
            cpov.error("fatal", "areaLight must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get axis1() {
        if(typeof this._axis1 == "function")
            return this._axis1();
        else if(typeof this._axis1 == "string" && this._axis1.substr(0, 1) == "&")
            return this._axis1.substr(1);
        else
            return this._axis1;
    }

    //--------------------------------------------------------------------------

    set axis1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._axis1 = val;
        } else {
            cpov.error("fatal", "axis1 must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get axis2() {
        if(typeof this._axis2 == "function")
            return this._axis2();
        else if(typeof this._axis2 == "string" && this._axis2.substr(0, 1) == "&")
            return this._axis2.substr(1);
        else
            return this._axis2;
    }

    //--------------------------------------------------------------------------

    set axis2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._axis2 = val;
        } else {
            cpov.error("fatal", "axis2 must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get circular() {
        if(typeof this._circular == "function")
            return this._circular();
        else if(typeof this._circular == "string" && this._circular.substr(0, 1) == "&")
            return this._circular.substr(1);
        else
            return this._circular;
    }

    //--------------------------------------------------------------------------

    set circular(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._circular = val;
        } else {
            cpov.error("fatal", "circular must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get fadeDistance() {
        if(typeof this._fadeDistance == "function")
            return this._fadeDistance();
        else if(typeof this._fadeDistance == "string" && this._fadeDistance.substr(0, 1) == "&")
            return this._fadeDistance.substr(1);
        else
            return this._fadeDistance;
    }

    //--------------------------------------------------------------------------

    set fadeDistance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0.)) {
            this._fadeDistance = val;
        } else {
            cpov.error("fatal", "fadeDistance must be a float greater than zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get fadePower() {
        if(typeof this._fadePower == "function")
            return this._fadePower();
        else if(typeof this._fadePower == "string" && this._fadePower.substr(0, 1) == "&")
            return this._fadePower.substr(1);
        else
            return this._fadePower;
    }

    //--------------------------------------------------------------------------

    set fadePower(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._fadePower = val;
        } else {
            cpov.error("fatal", "fadePower must be a float.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get falloff() {
        if(typeof this._falloff == "function")
            return this._falloff();
        else if(typeof this._falloff == "string" && this._falloff.substr(0, 1) == "&")
            return this._falloff.substr(1);
        else
            return this._falloff;
    }

    //--------------------------------------------------------------------------

    set falloff(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val < 90.)) {
            this._falloff = val;
        } else {
            cpov.error("fatal", "falloff must be a float less than 90.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get jitter() {
        if(typeof this._jitter == "function")
            return this._jitter();
        else if(typeof this._jitter == "string" && this._jitter.substr(0, 1) == "&")
            return this._jitter.substr(1);
        else
            return this._jitter;
    }

    //--------------------------------------------------------------------------

    set jitter(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._jitter = val;
        } else {
            cpov.error("fatal", "jitter must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get looksLike() {
        if(typeof this._looksLike == "function")
            return this._looksLike();
        else if(typeof this._looksLike == "string" && this._looksLike.substr(0, 1) == "&")
            return this._looksLike.substr(1);
        else
            return this._looksLike;
    }

    //--------------------------------------------------------------------------

    set looksLike(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._looksLike = val;
        } else {
            cpov.error("fatal", "looksLike must be a Primitive.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get mediaAttenuation() {
        if(typeof this._mediaAttenuation == "function")
            return this._mediaAttenuation();
        else if(typeof this._mediaAttenuation == "string" && this._mediaAttenuation.substr(0, 1) == "&")
            return this._mediaAttenuation.substr(1);
        else
            return this._mediaAttenuation;
    }

    //--------------------------------------------------------------------------

    set mediaAttenuation(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._mediaAttenuation = val;
        } else {
            cpov.error("fatal", "mediaAttenuation must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get mediaInteraction() {
        if(typeof this._mediaInteraction == "function")
            return this._mediaInteraction();
        else if(typeof this._mediaInteraction == "string" && this._mediaInteraction.substr(0, 1) == "&")
            return this._mediaInteraction.substr(1);
        else
            return this._mediaInteraction;
    }

    //--------------------------------------------------------------------------

    set mediaInteraction(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._mediaInteraction = val;
        } else {
            cpov.error("fatal", "mediaInteraction must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get orient() {
        if(typeof this._orient == "function")
            return this._orient();
        else if(typeof this._orient == "string" && this._orient.substr(0, 1) == "&")
            return this._orient.substr(1);
        else
            return this._orient;
    }

    //--------------------------------------------------------------------------

    set orient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._orient = val;
        } else {
            cpov.error("fatal", "orient must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get parallel() {
        if(typeof this._parallel == "function")
            return this._parallel();
        else if(typeof this._parallel == "string" && this._parallel.substr(0, 1) == "&")
            return this._parallel.substr(1);
        else
            return this._parallel;
    }

    //--------------------------------------------------------------------------

    set parallel(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._parallel = val;
        } else {
            cpov.error("fatal", "parallel must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get pointAt() {
        if(typeof this._pointAt == "function")
            return this._pointAt();
        else if(typeof this._pointAt == "string" && this._pointAt.substr(0, 1) == "&")
            return this._pointAt.substr(1);
        else
            return this._pointAt;
    }

    //--------------------------------------------------------------------------

    set pointAt(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._pointAt = val;
        } else {
            cpov.error("fatal", "pointAt must be a VectorXYZ.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get projectedThrough() {
        if(typeof this._projectedThrough == "function")
            return this._projectedThrough();
        else if(typeof this._projectedThrough == "string" && this._projectedThrough.substr(0, 1) == "&")
            return this._projectedThrough.substr(1);
        else
            return this._projectedThrough;
    }

    //--------------------------------------------------------------------------

    set projectedThrough(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._projectedThrough = val;
        } else {
            cpov.error("fatal", "projectedThrough", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    //--------------------------------------------------------------------------

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val < 90)) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float less than 90.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get shadowless() {
        if(typeof this._shadowless == "function")
            return this._shadowless();
        else if(typeof this._shadowless == "string" && this._shadowless.substr(0, 1) == "&")
            return this._shadowless.substr(1);
        else
            return this._shadowless;
    }

    //--------------------------------------------------------------------------

    set shadowless(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._shadowless = val;
        } else {
            cpov.error("fatal", "shadowless must be a boolean.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get size1() {
        if(typeof this._size1 == "function")
            return this._size1();
        else if(typeof this._size1 == "string" && this._size1.substr(0, 1) == "&")
            return this._size1.substr(1);
        else
            return this._size1;
    }

    //--------------------------------------------------------------------------

    set size1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._size1 = val;
        } else {
            cpov.error("fatal", "size1 must be a float greater than zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get size2() {
        if(typeof this._size2 == "function")
            return this._size2();
        else if(typeof this._size2 == "string" && this._size2.substr(0, 1) == "&")
            return this._size2.substr(1);
        else
            return this._size2;
    }

    //--------------------------------------------------------------------------

    set size2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val > 0)) {
            this._size2 = val;
        } else {
            cpov.error("fatal", "size2 must be a float greater than zero.", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get tightness() {
        if(typeof this._tightness == "function")
            return this._tightness();
        else if(typeof this._tightness == "string" && this._tightness.substr(0, 1) == "&")
            return this._tightness.substr(1);
        else
            return this._tightness;
    }

    //--------------------------------------------------------------------------

    set tightness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val) && val >= 0 && val <= 100)) {
            this._tightness = val;
        } else {
            cpov.error("fatal", "tightness must be a float in the range (0 - 100).", "LightSource");
        }
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    //--------------------------------------------------------------------------

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isString(val) && (val == 'spotlight' || val == 'cylinder'))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be either 'spotlight' or 'cylinder'.", "LightSource");
        }
    }


}

exports.LightSource = LightSource;

//==============================================================================
//==============================================================================

class Ovus extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._bottomRadius = null;
        this._topRadius = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Ovus]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Ovus]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Ovus]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get bottomRadius() {
        if(typeof this._bottomRadius == "function")
            return this._bottomRadius();
        else if(typeof this._bottomRadius == "string" && this._bottomRadius.substr(0, 1) == "&")
            return this._bottomRadius.substr(1);
        else
            return this._bottomRadius;
    }

    //--------------------------------------------------------------------------

    set bottomRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._bottomRadius = val;
        } else {
            cpov.error("fatal", "bottomRadius must be a float.", "Ovus");
        }
    }

    //--------------------------------------------------------------------------

    get topRadius() {
        if(typeof this._topRadius == "function")
            return this._topRadius();
        else if(typeof this._topRadius == "string" && this._topRadius.substr(0, 1) == "&")
            return this._topRadius.substr(1);
        else
            return this._topRadius;
    }

    //--------------------------------------------------------------------------

    set topRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._topRadius = val;
        } else {
            cpov.error("fatal", "topRadius must be a float.", "Ovus");
        }
    }


}

exports.Ovus = Ovus;

//==============================================================================
//==============================================================================

class Parametric extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._funcX = null;
        this._funcY = null;
        this._funcZ = null;
        this._uv1 = null;
        this._uv2 = null;
        this._containedBy = null;
        this._maxGradient = null;
        this._accuracy = null;
        this._precomputeDepth = null;
        this._precomputeX = null;
        this._precomputeY = null;
        this._precomputeZ = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Parametric]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Parametric]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Parametric]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get funcX() {
        if(typeof this._funcX == "function")
            return this._funcX();
        else if(typeof this._funcX == "string" && this._funcX.substr(0, 1) == "&")
            return this._funcX.substr(1);
        else
            return this._funcX;
    }

    //--------------------------------------------------------------------------

    set funcX(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._funcX = val;
        } else {
            cpov.error("fatal", "funcX must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get funcY() {
        if(typeof this._funcY == "function")
            return this._funcY();
        else if(typeof this._funcY == "string" && this._funcY.substr(0, 1) == "&")
            return this._funcY.substr(1);
        else
            return this._funcY;
    }

    //--------------------------------------------------------------------------

    set funcY(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._funcY = val;
        } else {
            cpov.error("fatal", "funcY must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get funcZ() {
        if(typeof this._funcZ == "function")
            return this._funcZ();
        else if(typeof this._funcZ == "string" && this._funcZ.substr(0, 1) == "&")
            return this._funcZ.substr(1);
        else
            return this._funcZ;
    }

    //--------------------------------------------------------------------------

    set funcZ(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isSdlFunction(val))) {
            this._funcZ = val;
        } else {
            cpov.error("fatal", "funcZ must be an SDL function.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get uv1() {
        if(typeof this._uv1 == "function")
            return this._uv1();
        else if(typeof this._uv1 == "string" && this._uv1.substr(0, 1) == "&")
            return this._uv1.substr(1);
        else
            return this._uv1;
    }

    //--------------------------------------------------------------------------

    set uv1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorUV'))) {
            this._uv1 = val;
        } else {
            cpov.error("fatal", "uv1 must be a VectorUV.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get uv2() {
        if(typeof this._uv2 == "function")
            return this._uv2();
        else if(typeof this._uv2 == "string" && this._uv2.substr(0, 1) == "&")
            return this._uv2.substr(1);
        else
            return this._uv2;
    }

    //--------------------------------------------------------------------------

    set uv2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorUV'))) {
            this._uv2 = val;
        } else {
            cpov.error("fatal", "uv2 must be a VectorUV.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get containedBy() {
        if(typeof this._containedBy == "function")
            return this._containedBy();
        else if(typeof this._containedBy == "string" && this._containedBy.substr(0, 1) == "&")
            return this._containedBy.substr(1);
        else
            return this._containedBy;
    }

    //--------------------------------------------------------------------------

    set containedBy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'Sphere') || cpov.isClass(val, 'Box'))) {
            this._containedBy = val;
        } else {
            cpov.error("fatal", "containedBy must be a Sphere or Box.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get maxGradient() {
        if(typeof this._maxGradient == "function")
            return this._maxGradient();
        else if(typeof this._maxGradient == "string" && this._maxGradient.substr(0, 1) == "&")
            return this._maxGradient.substr(1);
        else
            return this._maxGradient;
    }

    //--------------------------------------------------------------------------

    set maxGradient(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._maxGradient = val;
        } else {
            cpov.error("fatal", "maxGradient must be a float.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get accuracy() {
        if(typeof this._accuracy == "function")
            return this._accuracy();
        else if(typeof this._accuracy == "string" && this._accuracy.substr(0, 1) == "&")
            return this._accuracy.substr(1);
        else
            return this._accuracy;
    }

    //--------------------------------------------------------------------------

    set accuracy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._accuracy = val;
        } else {
            cpov.error("fatal", "accuracy must be a float.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeDepth() {
        if(typeof this._precomputeDepth == "function")
            return this._precomputeDepth();
        else if(typeof this._precomputeDepth == "string" && this._precomputeDepth.substr(0, 1) == "&")
            return this._precomputeDepth.substr(1);
        else
            return this._precomputeDepth;
    }

    //--------------------------------------------------------------------------

    set precomputeDepth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._precomputeDepth = val;
        } else {
            cpov.error("fatal", "precomputeDepth must be an integer.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeX() {
        if(typeof this._precomputeX == "function")
            return this._precomputeX();
        else if(typeof this._precomputeX == "string" && this._precomputeX.substr(0, 1) == "&")
            return this._precomputeX.substr(1);
        else
            return this._precomputeX;
    }

    //--------------------------------------------------------------------------

    set precomputeX(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeX = val;
        } else {
            cpov.error("fatal", "precomputeX must be a boolean.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeY() {
        if(typeof this._precomputeY == "function")
            return this._precomputeY();
        else if(typeof this._precomputeY == "string" && this._precomputeY.substr(0, 1) == "&")
            return this._precomputeY.substr(1);
        else
            return this._precomputeY;
    }

    //--------------------------------------------------------------------------

    set precomputeY(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeY = val;
        } else {
            cpov.error("fatal", "precomputeY must be a boolean.", "Parametric");
        }
    }

    //--------------------------------------------------------------------------

    get precomputeZ() {
        if(typeof this._precomputeZ == "function")
            return this._precomputeZ();
        else if(typeof this._precomputeZ == "string" && this._precomputeZ.substr(0, 1) == "&")
            return this._precomputeZ.substr(1);
        else
            return this._precomputeZ;
    }

    //--------------------------------------------------------------------------

    set precomputeZ(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._precomputeZ = val;
        } else {
            cpov.error("fatal", "precomputeZ must be a boolean.", "Parametric");
        }
    }


}

exports.Parametric = Parametric;

//==============================================================================
//==============================================================================

class Prism extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._type = null;
        this._height1 = null;
        this._height2 = null;
        this._points = null;
        this._open = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Prism]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Prism]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Prism]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    //--------------------------------------------------------------------------

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.prismTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'bezierSpline', 'conicSweep', 'cubicSpline', 'linearSpline', 'linearSweep', or 'quadraticSpline'.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get height1() {
        if(typeof this._height1 == "function")
            return this._height1();
        else if(typeof this._height1 == "string" && this._height1.substr(0, 1) == "&")
            return this._height1.substr(1);
        else
            return this._height1;
    }

    //--------------------------------------------------------------------------

    set height1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._height1 = val;
        } else {
            cpov.error("fatal", "height1 must be a float.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get height2() {
        if(typeof this._height2 == "function")
            return this._height2();
        else if(typeof this._height2 == "string" && this._height2.substr(0, 1) == "&")
            return this._height2.substr(1);
        else
            return this._height2;
    }

    //--------------------------------------------------------------------------

    set height2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._height2 = val;
        } else {
            cpov.error("fatal", "height2 must be a float", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    //--------------------------------------------------------------------------

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 0, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of VectorXY.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    //--------------------------------------------------------------------------

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Prism");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Prism");
        }
    }


}

exports.Prism = Prism;

//==============================================================================
//==============================================================================

class Sphere extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._center = null;
        this._radius = null;
        this._strength = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Sphere]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Sphere]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Sphere]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get center() {
        if(typeof this._center == "function")
            return this._center();
        else if(typeof this._center == "string" && this._center.substr(0, 1) == "&")
            return this._center.substr(1);
        else
            return this._center;
    }

    //--------------------------------------------------------------------------

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Sphere");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    //--------------------------------------------------------------------------

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Sphere");
        }
    }

    //--------------------------------------------------------------------------

    get strength() {
        if(typeof this._strength == "function")
            return this._strength();
        else if(typeof this._strength == "string" && this._strength.substr(0, 1) == "&")
            return this._strength.substr(1);
        else
            return this._strength;
    }

    //--------------------------------------------------------------------------

    set strength(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._strength = val;
        } else {
            cpov.error("fatal", "strength must be a float.", "Sphere");
        }
    }


}

exports.Sphere = Sphere;

//==============================================================================
//==============================================================================

class SphereSweep extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._type = null;
        this._spheres = null;
        this._tolerance = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[SphereSweep]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[SphereSweep]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[SphereSweep]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    //--------------------------------------------------------------------------

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isKey(val, cpov.internalSplineTypes))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be one of 'linearSpline', 'bSpline', or 'cubicSpline'.", "SphereSweep");
        }
    }

    //--------------------------------------------------------------------------

    get spheres() {
        if(typeof this._spheres == "function")
            return this._spheres();
        else if(typeof this._spheres == "string" && this._spheres.substr(0, 1) == "&")
            return this._spheres.substr(1);
        else
            return this._spheres;
    }

    //--------------------------------------------------------------------------

    set spheres(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Sphere', 2, infinity))) {
            this._spheres = val;
        } else {
            cpov.error("fatal", "spheres must be an an array of two or more Sphere.", "SphereSweep");
        }
    }

    //--------------------------------------------------------------------------

    get tolerance() {
        if(typeof this._tolerance == "function")
            return this._tolerance();
        else if(typeof this._tolerance == "string" && this._tolerance.substr(0, 1) == "&")
            return this._tolerance.substr(1);
        else
            return this._tolerance;
    }

    //--------------------------------------------------------------------------

    set tolerance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._tolerance = val;
        } else {
            cpov.error("fatal", "tolerance must be a float.", "SphereSweep");
        }
    }


}

exports.SphereSweep = SphereSweep;

//==============================================================================
//==============================================================================

class Superellipsoid extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._vector = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Superellipsoid]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Superellipsoid]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Superellipsoid]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get vector() {
        if(typeof this._vector == "function")
            return this._vector();
        else if(typeof this._vector == "string" && this._vector.substr(0, 1) == "&")
            return this._vector.substr(1);
        else
            return this._vector;
    }

    //--------------------------------------------------------------------------

    set vector(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXY'))) {
            this._vector = val;
        } else {
            cpov.error("fatal", "vector must be a VectorXY.", "Superellipsoid");
        }
    }


}

exports.Superellipsoid = Superellipsoid;

//==============================================================================
//==============================================================================

class Sor extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._points = null;
        this._open = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Sor]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Sor]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Sor]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    //--------------------------------------------------------------------------

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 2, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of two or more VectorXY.", "Sor");
        }
    }

    //--------------------------------------------------------------------------

    get open() {
        if(typeof this._open == "function")
            return this._open();
        else if(typeof this._open == "string" && this._open.substr(0, 1) == "&")
            return this._open.substr(1);
        else
            return this._open;
    }

    //--------------------------------------------------------------------------

    set open(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._open = val;
        } else {
            cpov.error("fatal", "open must be a boolean.", "Sor");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Sor");
        }
    }


}

exports.Sor = Sor;

//==============================================================================
//==============================================================================

class Text extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._font = null;
        this._displayText = null;
        this._thickness = null;
        this._offset = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Text]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Text]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Text]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get font() {
        if(typeof this._font == "function")
            return this._font();
        else if(typeof this._font == "string" && this._font.substr(0, 1) == "&")
            return this._font.substr(1);
        else
            return this._font;
    }

    //--------------------------------------------------------------------------

    set font(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._font = val;
        } else {
            cpov.error("fatal", "font must be a non-empty string.", "Text");
        }
    }

    //--------------------------------------------------------------------------

    get displayText() {
        if(typeof this._displayText == "function")
            return this._displayText();
        else if(typeof this._displayText == "string" && this._displayText.substr(0, 1) == "&")
            return this._displayText.substr(1);
        else
            return this._displayText;
    }

    //--------------------------------------------------------------------------

    set displayText(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isNonEmptyString(val))) {
            this._displayText = val;
        } else {
            cpov.error("fatal", "displayText must be a non-empty string.", "Text");
        }
    }

    //--------------------------------------------------------------------------

    get thickness() {
        if(typeof this._thickness == "function")
            return this._thickness();
        else if(typeof this._thickness == "string" && this._thickness.substr(0, 1) == "&")
            return this._thickness.substr(1);
        else
            return this._thickness;
    }

    //--------------------------------------------------------------------------

    set thickness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._thickness = val;
        } else {
            cpov.error("fatal", "thickness must be a float.", "Text");
        }
    }

    //--------------------------------------------------------------------------

    get offset() {
        if(typeof this._offset == "function")
            return this._offset();
        else if(typeof this._offset == "string" && this._offset.substr(0, 1) == "&")
            return this._offset.substr(1);
        else
            return this._offset;
    }

    //--------------------------------------------------------------------------

    set offset(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._offset = val;
        } else {
            cpov.error("fatal", "offset must be a float.", "Text");
        }
    }


}

exports.Text = Text;

//==============================================================================
//==============================================================================

class Torus extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = true;
        this._csg = false;
        this._majorRadius = null;
        this._minorRadius = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Torus]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Torus]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Torus]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get majorRadius() {
        if(typeof this._majorRadius == "function")
            return this._majorRadius();
        else if(typeof this._majorRadius == "string" && this._majorRadius.substr(0, 1) == "&")
            return this._majorRadius.substr(1);
        else
            return this._majorRadius;
    }

    //--------------------------------------------------------------------------

    set majorRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._majorRadius = val;
        } else {
            cpov.error("fatal", "majorRadius must be a float.", "Torus");
        }
    }

    //--------------------------------------------------------------------------

    get minorRadius() {
        if(typeof this._minorRadius == "function")
            return this._minorRadius();
        else if(typeof this._minorRadius == "string" && this._minorRadius.substr(0, 1) == "&")
            return this._minorRadius.substr(1);
        else
            return this._minorRadius;
    }

    //--------------------------------------------------------------------------

    set minorRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._minorRadius = val;
        } else {
            cpov.error("fatal", "minorRadius must be a float.", "Torus");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Torus");
        }
    }


}

exports.Torus = Torus;

//==============================================================================
//==============================================================================

class BicubicPatch extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = false;
        this._csg = false;
        this._type = null;
        this._points = null;
        this._uSteps = null;
        this._vSteps = null;
        this._flatness = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[BicubicPatch]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[BicubicPatch]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[BicubicPatch]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get type() {
        if(typeof this._type == "function")
            return this._type();
        else if(typeof this._type == "string" && this._type.substr(0, 1) == "&")
            return this._type.substr(1);
        else
            return this._type;
    }

    //--------------------------------------------------------------------------

    set type(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val) && (val == 0 || val == 1))) {
            this._type = val;
        } else {
            cpov.error("fatal", "type must be either 0 or 1.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    //--------------------------------------------------------------------------

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXYZ', 16, 16))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of 16 VectorXYZ.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get uSteps() {
        if(typeof this._uSteps == "function")
            return this._uSteps();
        else if(typeof this._uSteps == "string" && this._uSteps.substr(0, 1) == "&")
            return this._uSteps.substr(1);
        else
            return this._uSteps;
    }

    //--------------------------------------------------------------------------

    set uSteps(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._uSteps = val;
        } else {
            cpov.error("fatal", "uSteps must be an integer.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get vSteps() {
        if(typeof this._vSteps == "function")
            return this._vSteps();
        else if(typeof this._vSteps == "string" && this._vSteps.substr(0, 1) == "&")
            return this._vSteps.substr(1);
        else
            return this._vSteps;
    }

    //--------------------------------------------------------------------------

    set vSteps(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._vSteps = val;
        } else {
            cpov.error("fatal", "vSteps must be an integer.", "BicubicPatch");
        }
    }

    //--------------------------------------------------------------------------

    get flatness() {
        if(typeof this._flatness == "function")
            return this._flatness();
        else if(typeof this._flatness == "string" && this._flatness.substr(0, 1) == "&")
            return this._flatness.substr(1);
        else
            return this._flatness;
    }

    //--------------------------------------------------------------------------

    set flatness(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._flatness = val;
        } else {
            cpov.error("fatal", "flatness must be a float.", "BicubicPatch");
        }
    }


}

exports.BicubicPatch = BicubicPatch;

//==============================================================================
//==============================================================================

class Disc extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = false;
        this._csg = false;
        this._center = null;
        this._normal = null;
        this._radius = null;
        this._holeRadius = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Disc]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Disc]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Disc]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get center() {
        if(typeof this._center == "function")
            return this._center();
        else if(typeof this._center == "string" && this._center.substr(0, 1) == "&")
            return this._center.substr(1);
        else
            return this._center;
    }

    //--------------------------------------------------------------------------

    set center(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._center = val;
        } else {
            cpov.error("fatal", "center must be a VectorXYZ.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(typeof this._normal == "string" && this._normal.substr(0, 1) == "&")
            return this._normal.substr(1);
        else
            return this._normal;
    }

    //--------------------------------------------------------------------------

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get radius() {
        if(typeof this._radius == "function")
            return this._radius();
        else if(typeof this._radius == "string" && this._radius.substr(0, 1) == "&")
            return this._radius.substr(1);
        else
            return this._radius;
    }

    //--------------------------------------------------------------------------

    set radius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._radius = val;
        } else {
            cpov.error("fatal", "radius must be a float.", "Disc");
        }
    }

    //--------------------------------------------------------------------------

    get holeRadius() {
        if(typeof this._holeRadius == "function")
            return this._holeRadius();
        else if(typeof this._holeRadius == "string" && this._holeRadius.substr(0, 1) == "&")
            return this._holeRadius.substr(1);
        else
            return this._holeRadius;
    }

    //--------------------------------------------------------------------------

    set holeRadius(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._holeRadius = val;
        } else {
            cpov.error("fatal", "holeRadius must be a float.", "Disc");
        }
    }


}

exports.Disc = Disc;

//==============================================================================
//==============================================================================

class Mesh extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = false;
        this._csg = false;
        this._triangles = null;
        this._insideVector = null;
        this._hierarchy = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Mesh]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Mesh]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Mesh]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get triangles() {
        if(typeof this._triangles == "function")
            return this._triangles();
        else if(typeof this._triangles == "string" && this._triangles.substr(0, 1) == "&")
            return this._triangles.substr(1);
        else
            return this._triangles;
    }

    //--------------------------------------------------------------------------

    set triangles(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Triangle', 1, Infinity))) {
            this._triangles = val;
        } else {
            cpov.error("fatal", "triangles", "Mesh");
        }
    }

    //--------------------------------------------------------------------------

    get insideVector() {
        if(typeof this._insideVector == "function")
            return this._insideVector();
        else if(typeof this._insideVector == "string" && this._insideVector.substr(0, 1) == "&")
            return this._insideVector.substr(1);
        else
            return this._insideVector;
    }

    //--------------------------------------------------------------------------

    set insideVector(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._insideVector = val;
        } else {
            cpov.error("fatal", "insideVector must be a VectorXYZ.", "Mesh");
        }
    }

    //--------------------------------------------------------------------------

    get hierarchy() {
        if(typeof this._hierarchy == "function")
            return this._hierarchy();
        else if(typeof this._hierarchy == "string" && this._hierarchy.substr(0, 1) == "&")
            return this._hierarchy.substr(1);
        else
            return this._hierarchy;
    }

    //--------------------------------------------------------------------------

    set hierarchy(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._hierarchy = val;
        } else {
            cpov.error("fatal", "hierarchy must be a boolean.", "Mesh");
        }
    }


}

exports.Mesh = Mesh;

//==============================================================================
//==============================================================================

class Polygon extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = false;
        this._csg = false;
        this._points = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Polygon]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Polygon]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Polygon]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get points() {
        if(typeof this._points == "function")
            return this._points();
        else if(typeof this._points == "string" && this._points.substr(0, 1) == "&")
            return this._points.substr(1);
        else
            return this._points;
    }

    //--------------------------------------------------------------------------

    set points(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'VectorXY', 3, Infinity))) {
            this._points = val;
        } else {
            cpov.error("fatal", "points must be an array of three or more VectorXY.", "Polygon");
        }
    }


}

exports.Polygon = Polygon;

//==============================================================================
//==============================================================================

class Triangle extends Primitive {

    constructor(objType, args) {
        this._finite = true;
        this._solid = false;
        this._csg = false;
        this._corner1 = null;
        this._corner2 = null;
        this._corner3 = null;
        this._smooth = null;
        this._normal1 = null;
        this._normal2 = null;
        this._normal3 = null;
        this._textures = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Triangle]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Triangle]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Triangle]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get corner1() {
        if(typeof this._corner1 == "function")
            return this._corner1();
        else if(typeof this._corner1 == "string" && this._corner1.substr(0, 1) == "&")
            return this._corner1.substr(1);
        else
            return this._corner1;
    }

    //--------------------------------------------------------------------------

    set corner1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner1 = val;
        } else {
            cpov.error("fatal", "corner1 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get corner2() {
        if(typeof this._corner2 == "function")
            return this._corner2();
        else if(typeof this._corner2 == "string" && this._corner2.substr(0, 1) == "&")
            return this._corner2.substr(1);
        else
            return this._corner2;
    }

    //--------------------------------------------------------------------------

    set corner2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner2 = val;
        } else {
            cpov.error("fatal", "corner2 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get corner3() {
        if(typeof this._corner3 == "function")
            return this._corner3();
        else if(typeof this._corner3 == "string" && this._corner3.substr(0, 1) == "&")
            return this._corner3.substr(1);
        else
            return this._corner3;
    }

    //--------------------------------------------------------------------------

    set corner3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._corner3 = val;
        } else {
            cpov.error("fatal", "corner3 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get smooth() {
        if(typeof this._smooth == "function")
            return this._smooth();
        else if(typeof this._smooth == "string" && this._smooth.substr(0, 1) == "&")
            return this._smooth.substr(1);
        else
            return this._smooth;
    }

    //--------------------------------------------------------------------------

    set smooth(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._smooth = val;
        } else {
            cpov.error("fatal", "smooth must be a boolean.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal1() {
        if(typeof this._normal1 == "function")
            return this._normal1();
        else if(typeof this._normal1 == "string" && this._normal1.substr(0, 1) == "&")
            return this._normal1.substr(1);
        else
            return this._normal1;
    }

    //--------------------------------------------------------------------------

    set normal1(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal1 = val;
        } else {
            cpov.error("fatal", "normal1 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal2() {
        if(typeof this._normal2 == "function")
            return this._normal2();
        else if(typeof this._normal2 == "string" && this._normal2.substr(0, 1) == "&")
            return this._normal2.substr(1);
        else
            return this._normal2;
    }

    //--------------------------------------------------------------------------

    set normal2(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal2 = val;
        } else {
            cpov.error("fatal", "normal2 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get normal3() {
        if(typeof this._normal3 == "function")
            return this._normal3();
        else if(typeof this._normal3 == "string" && this._normal3.substr(0, 1) == "&")
            return this._normal3.substr(1);
        else
            return this._normal3;
    }

    //--------------------------------------------------------------------------

    set normal3(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal3 = val;
        } else {
            cpov.error("fatal", "normal3 must be a VectorXYZ.", "Triangle");
        }
    }

    //--------------------------------------------------------------------------

    get textures() {
        if(typeof this._textures == "function")
            return this._textures();
        else if(typeof this._textures == "string" && this._textures.substr(0, 1) == "&")
            return this._textures.substr(1);
        else
            return this._textures;
    }

    //--------------------------------------------------------------------------

    set textures(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfInt(val))) {
            this._textures = val;
        } else {
            cpov.error("fatal", "textures must be an array of integers.", "Triangle");
        }
    }


}

exports.Triangle = Triangle;

//==============================================================================
//==============================================================================

class Plane extends Primitive {

    constructor(objType, args) {
        this._finite = false;
        this._solid = true;
        this._csg = false;
        this._normal = null;
        this._distance = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Plane]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Plane]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Plane]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get normal() {
        if(typeof this._normal == "function")
            return this._normal();
        else if(typeof this._normal == "string" && this._normal.substr(0, 1) == "&")
            return this._normal.substr(1);
        else
            return this._normal;
    }

    //--------------------------------------------------------------------------

    set normal(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZ'))) {
            this._normal = val;
        } else {
            cpov.error("fatal", "normal must be a VectorXYZ.", "Plane");
        }
    }

    //--------------------------------------------------------------------------

    get distance() {
        if(typeof this._distance == "function")
            return this._distance();
        else if(typeof this._distance == "string" && this._distance.substr(0, 1) == "&")
            return this._distance.substr(1);
        else
            return this._distance;
    }

    //--------------------------------------------------------------------------

    set distance(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._distance = val;
        } else {
            cpov.error("fatal", "distance must be a float.", "Plane");
        }
    }


}

exports.Plane = Plane;

//==============================================================================
//==============================================================================

class Poly extends Primitive {

    constructor(objType, args) {
        this._finite = false;
        this._solid = true;
        this._csg = false;
        this._coefficients = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Poly]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Poly]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Poly]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    //--------------------------------------------------------------------------

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 2, 35))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 2 to 35 floats.", "Poly");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Poly");
        }
    }


}

exports.Poly = Poly;

//==============================================================================
//==============================================================================

class Cubic extends Primitive {

    constructor(objType, args) {
        this._finite = false;
        this._solid = true;
        this._csg = false;
        this._coefficients = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Cubic]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Cubic]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Cubic]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    //--------------------------------------------------------------------------

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 20, 20))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 20 floats.", "Cubic");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Cubic");
        }
    }


}

exports.Cubic = Cubic;

//==============================================================================
//==============================================================================

class Quartic extends Primitive {

    constructor(objType, args) {
        this._finite = false;
        this._solid = true;
        this._csg = false;
        this._coefficients = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Quartic]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Quartic]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Quartic]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    //--------------------------------------------------------------------------

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfFloats(val, 20, 20))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be an array of 20 floats.", "Quartic");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Quartic");
        }
    }


}

exports.Quartic = Quartic;

//==============================================================================
//==============================================================================

class Polynomial extends Primitive {

    constructor(objType, args) {
        this._finite = false;
        this._solid = true;
        this._csg = false;
        this._order = null;
        this._coefficients = null;
        this._sturm = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Polynomial]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Polynomial]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Polynomial]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get order() {
        if(typeof this._order == "function")
            return this._order();
        else if(typeof this._order == "string" && this._order.substr(0, 1) == "&")
            return this._order.substr(1);
        else
            return this._order;
    }

    //--------------------------------------------------------------------------

    set order(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isInt(val))) {
            this._order = val;
        } else {
            cpov.error("fatal", "order must be an integer.", "Polynomial");
        }
    }

    //--------------------------------------------------------------------------

    get coefficients() {
        if(typeof this._coefficients == "function")
            return this._coefficients();
        else if(typeof this._coefficients == "string" && this._coefficients.substr(0, 1) == "&")
            return this._coefficients.substr(1);
        else
            return this._coefficients;
    }

    //--------------------------------------------------------------------------

    set coefficients(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isClass(val, 'VectorXYZW'))) {
            this._coefficients = val;
        } else {
            cpov.error("fatal", "coefficients must be a VectorXYZW.", "Polynomial");
        }
    }

    //--------------------------------------------------------------------------

    get sturm() {
        if(typeof this._sturm == "function")
            return this._sturm();
        else if(typeof this._sturm == "string" && this._sturm.substr(0, 1) == "&")
            return this._sturm.substr(1);
        else
            return this._sturm;
    }

    //--------------------------------------------------------------------------

    set sturm(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._sturm = val;
        } else {
            cpov.error("fatal", "sturm must be a boolean.", "Polynomial");
        }
    }


}

exports.Polynomial = Polynomial;

//==============================================================================
//==============================================================================

class Quadric extends Primitive {

    constructor(objType, args) {
        this._finite = false;
        this._solid = true;
        this._csg = false;
        this._a = null;
        this._b = null;
        this._c = null;
        this._d = null;
        this._e = null;
        this._f = null;
        this._g = null;
        this._h = null;
        this._i = null;
        this._j = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Quadric]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Quadric]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Quadric]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get a() {
        if(typeof this._a == "function")
            return this._a();
        else if(typeof this._a == "string" && this._a.substr(0, 1) == "&")
            return this._a.substr(1);
        else
            return this._a;
    }

    //--------------------------------------------------------------------------

    set a(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._a = val;
        } else {
            cpov.error("fatal", "a must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get b() {
        if(typeof this._b == "function")
            return this._b();
        else if(typeof this._b == "string" && this._b.substr(0, 1) == "&")
            return this._b.substr(1);
        else
            return this._b;
    }

    //--------------------------------------------------------------------------

    set b(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._b = val;
        } else {
            cpov.error("fatal", "b must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get c() {
        if(typeof this._c == "function")
            return this._c();
        else if(typeof this._c == "string" && this._c.substr(0, 1) == "&")
            return this._c.substr(1);
        else
            return this._c;
    }

    //--------------------------------------------------------------------------

    set c(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._c = val;
        } else {
            cpov.error("fatal", "c must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get d() {
        if(typeof this._d == "function")
            return this._d();
        else if(typeof this._d == "string" && this._d.substr(0, 1) == "&")
            return this._d.substr(1);
        else
            return this._d;
    }

    //--------------------------------------------------------------------------

    set d(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._d = val;
        } else {
            cpov.error("fatal", "d must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get e() {
        if(typeof this._e == "function")
            return this._e();
        else if(typeof this._e == "string" && this._e.substr(0, 1) == "&")
            return this._e.substr(1);
        else
            return this._e;
    }

    //--------------------------------------------------------------------------

    set e(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._e = val;
        } else {
            cpov.error("fatal", "e must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get f() {
        if(typeof this._f == "function")
            return this._f();
        else if(typeof this._f == "string" && this._f.substr(0, 1) == "&")
            return this._f.substr(1);
        else
            return this._f;
    }

    //--------------------------------------------------------------------------

    set f(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._f = val;
        } else {
            cpov.error("fatal", "f must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get g() {
        if(typeof this._g == "function")
            return this._g();
        else if(typeof this._g == "string" && this._g.substr(0, 1) == "&")
            return this._g.substr(1);
        else
            return this._g;
    }

    //--------------------------------------------------------------------------

    set g(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._g = val;
        } else {
            cpov.error("fatal", "g must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get h() {
        if(typeof this._h == "function")
            return this._h();
        else if(typeof this._h == "string" && this._h.substr(0, 1) == "&")
            return this._h.substr(1);
        else
            return this._h;
    }

    //--------------------------------------------------------------------------

    set h(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._h = val;
        } else {
            cpov.error("fatal", "h must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get i() {
        if(typeof this._i == "function")
            return this._i();
        else if(typeof this._i == "string" && this._i.substr(0, 1) == "&")
            return this._i.substr(1);
        else
            return this._i;
    }

    //--------------------------------------------------------------------------

    set i(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._i = val;
        } else {
            cpov.error("fatal", "i must be a float.", "Quadric");
        }
    }

    //--------------------------------------------------------------------------

    get j() {
        if(typeof this._j == "function")
            return this._j();
        else if(typeof this._j == "string" && this._j.substr(0, 1) == "&")
            return this._j.substr(1);
        else
            return this._j;
    }

    //--------------------------------------------------------------------------

    set j(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isFloat(val))) {
            this._j = val;
        } else {
            cpov.error("fatal", "j must be a float.", "Quadric");
        }
    }


}

exports.Quadric = Quadric;

//==============================================================================
//==============================================================================

class Union extends Primitive {

    constructor(objType, args) {
        this._finite = null;
        this._solid = true;
        this._csg = true;
        this._objects = null;
        this._splitUnion = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Union]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Union]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Union]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get objects() {
        if(typeof this._objects == "function")
            return this._objects();
        else if(typeof this._objects == "string" && this._objects.substr(0, 1) == "&")
            return this._objects.substr(1);
        else
            return this._objects;
    }

    //--------------------------------------------------------------------------

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Union");
        }
    }

    //--------------------------------------------------------------------------

    get splitUnion() {
        if(typeof this._splitUnion == "function")
            return this._splitUnion();
        else if(typeof this._splitUnion == "string" && this._splitUnion.substr(0, 1) == "&")
            return this._splitUnion.substr(1);
        else
            return this._splitUnion;
    }

    //--------------------------------------------------------------------------

    set splitUnion(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isBoolean(val))) {
            this._splitUnion = val;
        } else {
            cpov.error("fatal", "splitUnion must be a boolean.", "Union");
        }
    }


}

exports.Union = Union;

//==============================================================================
//==============================================================================

class Intersection extends Primitive {

    constructor(objType, args) {
        this._finite = null;
        this._solid = true;
        this._csg = true;
        this._objects = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Intersection]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Intersection]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Intersection]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get objects() {
        if(typeof this._objects == "function")
            return this._objects();
        else if(typeof this._objects == "string" && this._objects.substr(0, 1) == "&")
            return this._objects.substr(1);
        else
            return this._objects;
    }

    //--------------------------------------------------------------------------

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Intersection");
        }
    }


}

exports.Intersection = Intersection;

//==============================================================================
//==============================================================================

class Difference extends Primitive {

    constructor(objType, args) {
        this._finite = null;
        this._solid = true;
        this._csg = true;
        this._positiveObject = null;
        this._negativeObjects = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Difference]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Difference]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Difference]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get positiveObject() {
        if(typeof this._positiveObject == "function")
            return this._positiveObject();
        else if(typeof this._positiveObject == "string" && this._positiveObject.substr(0, 1) == "&")
            return this._positiveObject.substr(1);
        else
            return this._positiveObject;
    }

    //--------------------------------------------------------------------------

    set positiveObject(val) {
        if(cpov.isNullOrFunction(val) || (cpov.inheritsFrom(val, 'Primitive'))) {
            this._positiveObject = val;
        } else {
            cpov.error("fatal", "positiveObject must be a Primitive.", "Difference");
        }
    }

    //--------------------------------------------------------------------------

    get negativeObjects() {
        if(typeof this._negativeObjects == "function")
            return this._negativeObjects();
        else if(typeof this._negativeObjects == "string" && this._negativeObjects.substr(0, 1) == "&")
            return this._negativeObjects.substr(1);
        else
            return this._negativeObjects;
    }

    //--------------------------------------------------------------------------

    set negativeObjects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._negativeObjects = val;
        } else {
            cpov.error("fatal", "negativeObjects must be an array of Primitives.", "Difference");
        }
    }


}

exports.Difference = Difference;

//==============================================================================
//==============================================================================

class Merge extends Primitive {

    constructor(objType, args) {
        this._finite = null;
        this._solid = true;
        this._csg = true;
        this._objects = null;
    }

    //--------------------------------------------------------------------------

    get finite() {
        return this._finite;
    }

    //--------------------------------------------------------------------------

    set finite(val) {
        throw new TypeError("[Merge]: finite is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get solid() {
        return this._solid;
    }

    //--------------------------------------------------------------------------

    set solid(val) {
        throw new TypeError("[Merge]: solid is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get csg() {
        return this._csg;
    }

    //--------------------------------------------------------------------------

    set csg(val) {
        throw new TypeError("[Merge]: csg is a read-only property.");
    }

    //--------------------------------------------------------------------------

    get objects() {
        if(typeof this._objects == "function")
            return this._objects();
        else if(typeof this._objects == "string" && this._objects.substr(0, 1) == "&")
            return this._objects.substr(1);
        else
            return this._objects;
    }

    //--------------------------------------------------------------------------

    set objects(val) {
        if(cpov.isNullOrFunction(val) || (cpov.isArrayOfClass(val, 'Primitive'))) {
            this._objects = val;
        } else {
            cpov.error("fatal", "objects must be an array of Primitives.", "Merge");
        }
    }


}

exports.Merge = Merge;
