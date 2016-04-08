var inquirer = require("inquirer");
var cssbeautify = require("cssbeautify");
var colors = require('colors');
var fs = require("fs");

var options = [{
	type: "list",
	name: "options",
	message: "Which sizing element do you need ?",
	choices: ["px", "em", "rem", "%"]
}, {
	type: "input",
	name: "rangestart",
	message: "Range Start",
	validate: function(value) {
		var valid = !isNaN(parseFloat(value));
		return valid || "Please enter a number";
	},
	filter: Number
}, {
	type: "input",
	name: "rangeend",
	message: "Range End",
	validate: function(value) {
		var valid = !isNaN(parseFloat(value));
		return valid || "Please enter a number";
	},
	filter: Number
}, {
	type: "confirm",
	name: "margin",
	message: "Add margin ?",
	default: true
}, {
	type: "confirm",
	name: "padding",
	message: "Add padding",
	default: true
}, {
	type: "confirm",
	name: "more",
	message: "Do you need More Utilities like Floats, Display and Overflow",
	default: false
}, {
	type: "confirm",
	name: "minify",
	message: "minify",
	default: true
}, {
	type: "list",
	name: "output",
	message: "Do you want the css to store in a file or output here in console ?",
	choices: ["file", "console"]
}];

inquirer.prompt(options, function(answers) {
	var css = '';
	var classSuffix = '';

	switch (answers.options) {
		case 'px':
			classSuffix = 'x';
			break;
		case 'em':
			classSuffix = 'e';
			break;
		case 'rem':
			classSuffix = 'r';
			break;
		case '%':
			classSuffix = 'pr';
			break;

	}
	
	for (var i = answers.rangestart; i <= answers.rangeend; i++) {

		if (answers.margin) {
			css += ".m" + i + classSuffix + "{margin:" + i + "" + answers.options + ";}";

			css += ".mt" + i + classSuffix + "{margin-top:" + i + "" + answers.options + ";}";

			css += ".mr" + i + classSuffix + "{margin-right:" + i + "" + answers.options + ";}";

			css += ".mb" + i + classSuffix + "{margin-bottom:" + i + "" + answers.options + ";}";

			css += ".ml" + i + classSuffix + "{margin-left:" + i + "" + answers.options + ";}";
		}

		if (answers.padding) {
			css += ".p" + i + classSuffix + "{padding:" + i + "" + answers.options + ";}";

			css += ".pt" + i + classSuffix + "{padding-top:" + i + "" + answers.options + ";}";

			css += ".pr" + i + classSuffix + "{padding-right:" + i + "" + answers.options + ";}";

			css += ".pb" + i + classSuffix + "{padding-bottom:" + i + "" + answers.options + ";}";

			css += ".pl" + i + classSuffix + "{padding-left:" + i + "" + answers.options + ";}";
		}
	}

	if (answers.more) {
		css += ".db{display:block}.dib{display:inline-block}.di{display:inline}.dt{display:table}.dtc{display:table-cell}.fl{float:left}.fr{float:right}.oh{overflow:hidden}.cb,.clear{clear:both}";
	}

	var fname = "cssutilities.css";
	if (!answers.minify) {
		var beautified = cssbeautify(css, {
			indent: '  ',
			openbrace: 'separate-line',
			autosemicolon: true
		});

		css = beautified;
	} else {
		fname ="cssutilities.min.css";
	}

	if (!answers.margin && !answers.padding) {
		css = "Please select atleast one, margin or padding !".black.bgWhite;
	}
	
	if (answers.output == "file") {
		fs.writeFile(fname, css, (err) => {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
	} else {
		console.log(css);
	}
});