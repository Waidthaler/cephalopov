var cpov  = require("./cephalopov.js");
var File  = require("./file.js");
var chalk = require("chalk");


//==============================================================================
// The ClassBuilder object generates code for a JavaScript class from a set of
// parameters.
//
//      name ......... class name
//      obj
//          .immutable .... object defining immutable attributes
//              .custom ... key of snippet to replace autogenerated get/set
//          .mutable ...... object defining mutable attributes
//              .custom ... key of snippet to replace autogenerated get/set
//          .superclass ... name of superclass or false if none
//          .desc ......... text to put in header comment or false for none
//          .conArgs ...... constructor argument list or false for default (...args)
//          .conBlock ..... snippet block to put inside constructor or false for default
//          .snippets ..... snippets to append to class body
//      snippets ......... snippets definition file
//
// Not in the constructor arguments, but defaulting to true and settable after
// instantiation is the allowSDL member, which determines whether class values
// can be defined as SDL functions.
//==============================================================================

function ClassBuilder(name, obj, snippets = false) {
    this.name     = name;
    this.obj      = obj;
    this.snippets = snippets;
    this.allowSDL = true;

    if(this.snippets)
        this.snippets = cpov.objectImport(this.snippets);
    else
        this.snippets = { };
}


//------------------------------------------------------------------------------
// Produces comment divider lines up to 132 characters long.
//------------------------------------------------------------------------------

ClassBuilder.prototype.divider = function(stops, type, maxLength = 80) {
    var line = {
        "-": "//----------------------------------------------------------------------------------------------------------------------------------",
        "=": "//=================================================================================================================================="
    }

    var tabs = cpov.tab(stops);

    return tabs + line[type].substr(0, maxLength - tabs.length);
}


//------------------------------------------------------------------------------
// Pads a string with the specified character on the right or left.
//------------------------------------------------------------------------------

ClassBuilder.prototype.pad = function(str, num, padchar, side) {

	var padding = [ ];

	for(var i = 0; i < num; i++)
		padding.push(padchar);

	padding = padding.join("");

	return (side == "left" ? padding : "") + str + (side == "right" ? padding : "");
}

//------------------------------------------------------------------------------
// Given an array of arrays of strings, right-pads each column to make them all
// the same width. Assumes each row has the same number of elements. Returns a
// single string.
//------------------------------------------------------------------------------

ClassBuilder.prototype.align = function(rows) {

	var width = [ ];

	for(var i = 0; i < rows[0].length; i++)
		width[i] = 0;

	for(var r = 0; r < rows.length; r++) {
		for(var c = 0; c < rows[r].length; c++) {
			width[c] = Math.max(width[c], rows[r][c].length);
		}
	}

	for(var r = 0; r < rows.length; r++) {
		for(var c = 0; c < rows[r].length; c++) {
			if(rows[r][c].length < width[c])
				rows[r][c] = this.pad(rows[r][c], width[c] - rows[r][c].length, " ", "right");
		}
		rows[r] = rows[r].join("");
	}

	return rows.join("\n");
}


//------------------------------------------------------------------------------
// Takes src and replaces all instances of $snippet_name with the corresponding
// snippet, with a base indentation based on the location of $snippet_name. (In
// case it is not obvious, this means all snippets are blocks and not inline.)
// If the snippet is not found, a warning is issued. A single pass is made, so
// nested snippets are not supported presently.
//------------------------------------------------------------------------------

ClassBuilder.prototype.snippetInterpolate = function(src) {

    var snippets = this.snippets
    return src.replace(/([ \t]*)\$(\S+)/g, function(match, p1, p2, offset, string) {
        if(snippets[p2] === undefined) {
            cpov.error("warn", "Missing snippet '" + p2 + "'", "CODEGEN");
            return match;
        } else {
            var result = p1 + snippets[p2].replace(/\n/g, "\n" + p1)
            return result;
        }
    });


}



//------------------------------------------------------------------------------
// Generates source code for class.
//------------------------------------------------------------------------------

ClassBuilder.prototype.toString = function() {
    var src = [];
    var tab1 = cpov.tab(1);
    var tab2 = cpov.tab(2);
    var tab3 = cpov.tab(3);
    var tab4 = cpov.tab(4);

    // Class opening -----------------------------------------------------------

    src.push(this.divider(0, "="));
    if(this.obj.desc)
        src.push(cpov.wrap(this.obj.desc, { indent: "// ", width: 77 }));
    else
        src.push(cpov.wrap(this.name + " class", { indent: "// ", width: 77 }));
    src.push(this.divider(0, "=") + "\n");
    src.push("class " + this.name + (this.obj.superclass ? (" extends " + this.obj.superclass) : '') + " {\n");

    // Constructor -------------------------------------------------------------

    if(this.obj.conArgs) {
        src.push(tab1 + "constructor(" + this.obj.conArgs + ") {\n");
    } else {
        src.push(tab1 + "constructor(options) {\n")
    }

    if(this.obj.superclass) {
        src.push(tab2 + "// Superclass constructor //\n");
        src.push(tab2 + "super(options);\n");
    }

    // Immutable properties --------------------------------------------------------

    if(this.obj.immutable) {

		var rows = [ ];

		src.push(tab2 + "// Immutable properties //\n");

        for(var i in this.obj.immutable) {
			rows.push([tab2 + "this._" + i, " = ", this.obj.immutable[i] + ";"]);
        }

		src.push(this.align(rows) + "\n");
    }

    // Mutable properties ------------------------------------------------------

    if(this.obj.mutable) {

		if(this.obj.noInit) {

			// noop

		} else {

			var rows = [ ];

			src.push(tab2 + "// Mutable properties //\n");

			for(var i = 0; i < this.obj.mutable.length; i++) {
				if(this.obj.mutable[i].default) {
					var init = this.obj.mutable[i].default;
				} else {
					var init = "null";
				}
				rows.push([tab2 + "this._" + this.obj.mutable[i].name, " = ", init + ";"]);
			}

			src.push(this.align(rows) + "\n");

		}
    }

    // Object conBlock ---------------------------------------------------------

    if(this.obj.conBlock) {
        src.push(tab2 + "// Snippet constructor block //\n");
        src.push(cpov.indentTextBlock(this.snippets[this.obj.conBlock] + "\n\n", 2));
    }

    // Initialization ----------------------------------------------------------

    if(!this.obj.conBlock) {
    	src.push(tab2 + "// Initialization //\n");
        src.push(tab2 + "cpov.initObject(this, options);\n");
    }

    // Required parameters list ------------------------------------------------

    var req = [ ];
    for(var i = 0; i < this.obj.mutable.length; i++) {
        if(this.obj.mutable[i].req)
            req.push(this.obj.mutable[i].name);
    }

    src.push(tab2 + "// Required parameters //\n");
    if(req.length > 0) {
        src.push(tab2 + "this.requiredParams = [ \"" + req.join('", "') + "\" ];\n");
    } else {
        src.push(tab2 + "this.requiredParams = [ ];\n");
    }

    // End of constructor ------------------------------------------------------

    src.push(tab1 + "}\n");

    // Accessors and Mutators --------------------------------------------------

    if(this.obj.immutable) {
        for(var i in this.obj.immutable) {
            src.push(
                this.divider(1, "-") + "\n\n"
                + tab1 + "get " + i + "() {\n"
                + tab2 + "return this._" + i + ";\n"
                + tab1 + "}\n\n"
                + tab1 + "set " + i + "(val) {\n"
                + tab2 + "throw new TypeError(\"[" + this.name + "]: " + i + " is a read-only property.\");\n"
                + tab1 + "}\n"
            );
        }
    }

    if(this.obj.mutable) {
        for(var i = 0; i < this.obj.mutable.length; i++) {
            var item = this.obj.mutable[i];
            if(this.obj.mutable[i].custom) {
                if(this.snippets[this.obj.mutable[i].custom] === undefined)
                    cpov.error("fatal", "Undefined snippet '" + this.obj.mutable[i].custom, "CODEGEN");
                src.push(cpov.indentTextBlock(this.snippets[this.obj.mutable[i].custom], 1) + "\n\n");
            } else {
                src.push(
                    this.divider(1, "-") + "\n\n"
                    + tab1 + "get " + item.name + "() {\n"
                    + tab2 + "if(typeof this._" + item.name + " == \"function\")\n"
                    + tab3 + "return this._" + item.name + "(cpov, this);");
                if(this.allowSDL)
                    src.push(
                        tab2 + "else if(cpov.isSDLFunction(this._" + item.name + "))\n"
                        + tab3 + "return this._" + item.name + ".substr(1);"
                    );
                src.push(
                    tab2 + "else\n"
                    + tab3 + "return this._" + item.name + ";\n"
                    + tab1 + "}\n\n"
                    + tab1 + "set " + item.name + "(val) {"
                );
                if(item.valid) {
                    if(this.allowSDL) {
                        src.push(tab2 + "if(cpov.isNullOrFunction(val) || (" + item.valid + ")) {");
                    } else {
                        src.push(tab2 + "if(cpov.isNullOrJSFunction(val) || (" + item.valid + ")) {");
                    }
                } else {
                    src.push(tab2 + "if(true) { // FIXME");
                }
                src.push(
                    tab3 + "this._" + item.name + " = val;\n"
                    + (item.child ? (tab3 + "this.adopt(this._" + item.name + ");\n") : "")
                    + tab2 + "} else {\n"
                    + tab3 + "cpov.error(\"fatal\", \"" + item.err + "\", \"" + this.name + "\");\n"
                    + tab2 + "}\n"
                    + tab1 + "}\n"
                );
            }
        }
    }

    // Copy method -------------------------------------------------------------

    // TODO: Deep clones, etc.

    if(this.obj.mutable) {
        src.push(this.divider(1, "-") + "\n"
            + tab1 + "// Constructs and returns a shallow copy of the object.\n"
            + this.divider(1, "-") + "\n\n"
            + tab1 + "copy() {\n\n"
            + tab2 + "var newObj = new " + this.name + "();\n");
        if(this.obj.superclass && this.obj.superclass == "Primitive") {
            src.push(tab2 + "newObj.copyCommonFrom(this); // copy Primitive attributes");
        };
        var rows = [ ];
        for(var attr in this.obj.mutable) {
            var attrName = this.obj.mutable[attr].name;
            rows.push([tab2 + "newObj." + attrName, " = ", "this." + attrName + ";"]);
        }
        src.push(this.align(rows) + "\n");
        src.push(tab2 + "return newObj;");
        src.push(tab1 + "}\n");
    }

    // Snippet code ------------------------------------------------------------

    if(this.obj.snippets) {
        for(var i = 0; i < this.obj.snippets.length; i++) {
            if(this.snippets[this.obj.snippets[i]] === undefined) {
                cpov.error("fatal", "Cannot find snippet \"" + this.obj.snippets[i] + "\".", "ClassBuilder.toString");
            } else {
                src.push(cpov.indentTextBlock(this.snippets[this.obj.snippets[i]], 1) + "\n\n");
            }
        }
    }

    // Class closing -----------------------------------------------------------

    src.push("\n}");
    src = src.join("\n");

    return this.snippetInterpolate(src);

}


//==============================================================================
// Takes an array of objects and for each object key encountered, sets
// key == true in destObj.
//==============================================================================

function readParamKeys(array, destObj) {
    for(var i = 0; i < array.length; i++) {
        for(var k in array[i]) {
            destObj[k] = true;
        }
    }
}


//==============================================================================
// docHumper takes a string -- chiefly the CephaloPOV documentation file
// /docs/index.html -- and one of the same definition objects used by
// ClassBuilder. It looks through the docs for div/span elements with special
// attributes and replaces their contents with documentation generated from the
// definition objects. The markup looks like this:
//
//     <div dh="classname"> ... </div dh="classname">
//
// Note that the dh attribute has to be repeated in the closing tag, which
// spares us the non-trivial exercise of actually parsing the HTML.
//==============================================================================

function docHumper(doc, classname, def) {

    var immutableDesc = {
        finite:  "If <code>true</code>, the shape is finite in extent.",
        solid:   "If <code>true</code>, the shape is solid.",
        csg:     "If <code>true</code>, the primitive is a composite CSG type.",
        pseudo:  "If <code>true</code>, the object is not actually a POV-Ray primitive object, but CephaloPOV makes it act similar to one so it can be included in CSG objects."
    };

    var descDummy = "TODO: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec tellus quis turpis pretium condimentum ut eget neque. Integer pharetra imperdiet elit, eu malesuada tortor.";

	var content = [ ];
	var members = [ ];

	if(def.immutable !== undefined)
		for(var k in def.immutable)
			members.push(k);
	if(def.mutable !== undefined)
		for(var i = 0; i < def.mutable.length; i++)
			members.push(def.mutable[i].name);

	members.sort();

	content.push("<div dh=\"" + classname + "\">\n<table class='sgrid attrs'>\n"
        + "<thead>\n"
        + "<tr><th>&nbsp;</th><th>Req'd</th><th>Name</th><th>Type</th><th>Description</th></tr>\n"
        + "<thead><tbody>");

	for(var m = 0; m < members.length; m++) {
		if(def.immutable !== undefined && def.immutable[members[m]] !== undefined) {
            content.push("<tr><td>RO</td>"
                + "<td>n/a</td>"
                + "<td>" + members[m] + "</td>"
                + "<td>boolean</td>"
                + "<td>" + immutableDesc[members[m]] + " For a " + classname + ", this is always <code>" + (def.immutable[members[m]] ? "true" : "false") + "</code>.</td>"
                + "</td></tr>");
		} else if(def.mutable !== undefined) {
            for(var i = 0; i < def.mutable.length; i++) {
                if(def.mutable[i].name != members[m])
                    continue;

                if(def.mutable[i].desc === undefined || def.mutable[i].desc == "TODO") {
                    var desc = descDummy;
                    var td = "<td class='dummy'>";
                } else {
                    var desc = def.mutable[i].desc;
                    td = "<td>";
                }

                content.push("<tr><td>RW</td>"
                    + "<td>" + (def.mutable[i].req ? "Y" : "N") + "</td>"
                    + "<td>" + members[m] + "</td>"
                    + "<td>" + (def.mutable[i].tname === undefined ? "TODO" : def.mutable[i].tname) + "</td>"
                    + td + desc + "</td></tr>");
            }
		}
	}

    content.push("</tbody></table>\n</div dh=\"" + classname + "\">");

	regex = new RegExp('<div +dh="' + classname + '">[^]*</div +dh="' + classname + '">');

	return doc.replace(regex, content.join("\n")) + "\n";
}


//==============================================================================
// Takes an object representing a set of simple k/v pairs and emits an HTML
// table representing it.
//==============================================================================

function kvTabulate(obj, tclass, keyname, valname, title, sort = true, anchor = false) {
    var contents = [
        (anchor ? "<a name=\"" + anchor + "\"/>" : ''),
        "<table class=\"" + tclass + "\">",
        "<thead>",
        (title ? "<tr><th colspan=\"2\">" + title + "</th></tr>" : ""),
        "<tr><th>" + keyname + "</th><th>" + valname + "</th></tr>",
        "</thead><tbody>"
    ];

    var keys = [ ];
    for(var key in obj)
        keys.push(key);

    if(sort)
        keys.sort();

    for(var k = 0; k < keys.length; k++)
        contents.push("<tr><td>" + keys[k] + "</td><td>" + obj[keys[k]] + "</td></tr>");

    contents.push("</tbody></table>");

    return contents.join("\n") + "\n";
}


//==============================================================================
// Produces a single-column list of strings from a simple array. The strings are
// wrapped in <code> tags.
//==============================================================================

function stringTable(obj, tclass, title, sort = true, anchor = false) {
    var contents = [
        (anchor ? "<a name=\"" + anchor + "\"/>" : ''),
        "<table class=\"" + tclass + "\">",
        "<thead>",
        (title ? "<tr><th>" + title + "</th></tr>" : ""),
        "</thead><tbody>"
    ];

    var strings = obj.slice(0);

    if(sort)
        strings.sort();

    for(var i = 0; i < strings.length; i++)
        contents.push("<tr><td><code>" + strings[i] + "</code></td></tr>");

    contents.push("</tbody></table>");

    return contents.join("\n") + "\n";
}

//==============================================================================
// Produces a list of quoted strings from a simple array. The strings are
// wrapped in <code> tags and quotes.
//==============================================================================

function stringList(obj) {
    if(Array.isArray(obj)) {
        var list = obj.slice(0);
    }

    list.sort();

    return "<code>\"" + list.join("\"</code>, <code>\"") + "\"</code>";
}


//==============================================================================
// Main loop.
//==============================================================================

function main() {

    var opts = {
        classes:   { short: "c", cnt: 0 },
        snippets:  { short: "s", cnt: 0 },
        proplist:  { short: "p", cnt: 0 },
        objlist:   { short: "o", cnt: 0 },
        docs:      { short: "d", cnt: 0 },
        help:      { short: "h", cnt: 0 },
    };

    cpov.parseCLI(opts);

    var optCount = 0;
    for(var i in opts)
        optCount += opts[i].cnt;

    if(opts.help.cnt) {
        console.log("\nUsage: codegen [options]\n\n"
            + "-c, --classes   Generate classes.js\n"
            + "-s, --snippets  Regenerate snippets.js --> snippets.new.js\n"
            + "-o, --objlist   Produce list of object classes\n"
            + "-d, --docs      Update autogen text in index.html\n"
            + "-h, --help      Display this text\n\n");
        return;
    }

    // docs --------------------------------------------------------------------

    if(opts.docs.cnt) {
        var df = new File("./docs/index.html", "r");
        var docs = df.read();
        df.close();

        for(var k in cpov.objDef) {
            docs = docHumper(docs, k.substr(0, 1).toUpperCase() + k.substr(1), cpov.objDef[k]);
        }
        docs = docHumper(docs, "Primitive", cpov.primitiveDef);
        docs = docHumper(docs, "ImageOptions", cpov.ioDef);
        docs = docHumper(docs, "GlobalSettings", cpov.gsDef);
        for(var k in cpov.vectorDef) {
            docs = docHumper(docs, k.substr(0, 1).toUpperCase() + k.substr(1), cpov.vectorDef[k]);
        }

        docs = docs.replace(/\$keylist\.([A-Za-z]+)/g, function(match, p1) {
            if(cpov[p1] !== undefined) {
                return kvTabulate(cpov[p1], "sgrid codeDoc", "Code", "Meaning", false, true, false);
            }
        });

        docs = docs.replace(/\$strlist\.([A-Za-z]+)/g, function(match, p1) {
            if(cpov[p1] !== undefined) {
                return stringList(cpov[p1]);
            }
        });

        docs = docs.replace(/\$strtable\.([A-Za-z]+)/g, function(match, p1) {
            if(cpov[p1] !== undefined) {
                return stringTable(cpov[p1], "sgrid codeDoc", "Julia Fractal Types", true, false);
            }
        });

        df = new File("./docs/index.html", "w");
        df.write(docs.trim() + "\n");
        df.close();
    }

    // objlist -----------------------------------------------------------------

    if(opts.objlist.cnt) {
        var objects = [ "Primitive", "ImageOptions", "GlobalSettings" ];
        for(var name in cpov.objDef)
            objects.push(name.substr(0, 1).toUpperCase() + name.substr(1));
        for(var name in cpov.vectorDef)
            objects.push(name.substr(0, 1).toUpperCase() + name.substr(1));

        objects.sort();

        for(var i = 0; i < objects.length; i++)
            console.log(objects[i]);
    }

    // snippets.new.js ---------------------------------------------------------

    if(opts.snippets.cnt) {
        var fp = new File("./snippets.new.js", "w");
        var snippets = cpov.objectImport("./snippets.js");
        var keys = [ ];
        for(var key in snippets)
            keys.push(key);
        keys.sort(function(a, b) {
            if(a == "README")
                return -Infinity;
            else
                return a.localeCompare(b);
        });
        var dash80 = "--------------------------------------------------------------------------------";

        for(var i = 0; i < keys.length; i++) {
            var label = "// " + keys[i] + " //";
            label = label + dash80.substr(0, 80 - label.length) + "\n\n";
            fp.write(label);
            fp.write(snippets[keys[i]] + "\n\n\n\n")
        }

        fp.close();

    }

    // classes.js --------------------------------------------------------------

    if(optCount == 0 || opts.classes.cnt) {  // by default, classes.js is produced
        var fp = new File("./classes.js", "w");
        fp.write("var cpov = require(\"./cephalopov.js\");\n\n");

        fp.write(new ClassBuilder("GlobalSettings", cpov.gsDef, "./snippets.js") + "\n\n");
        fp.write("exports.GlobalSettings = GlobalSettings;\n\n\n");

        var ioObj = new ClassBuilder("ImageOptions", cpov.ioDef, "./snippets.js");
        ioObj.allowSDL = false;
        fp.write(ioObj + "\n\n");
        fp.write("exports.ImageOptions = ImageOptions;\n\n\n");

        fp.write(new ClassBuilder("Primitive", cpov.primitiveDef, "./snippets.js") + "\n\n");
        fp.write("exports.Primitive = Primitive;\n\n\n");

        for(var pname in cpov.objDef) {
            var cname = pname.substr(0, 1).toLocaleUpperCase() + pname.substr(1);
            fp.write(new ClassBuilder(cname, cpov.objDef[pname], "./snippets.js") + "\n\n");
            fp.write("exports." + cname + " = " + cname + ";\n\n\n");
        }

        for(var pname in cpov.vectorDef) {
            var cname = pname.substr(0, 1).toLocaleUpperCase() + pname.substr(1);
            fp.write(new ClassBuilder(cname, cpov.vectorDef[pname], "./snippets.js") + "\n\n");
            fp.write("exports." + cname + " = " + cname + ";\n\n\n");
        }

		var snippets = cpov.objectImport("./snippets.js");
		fp.write(snippets.Matrix + "\n\n\n");

        fp.close();
    }

}

main();


