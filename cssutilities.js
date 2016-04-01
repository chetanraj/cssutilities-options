var inquirer = require("inquirer");

var options = [
	{
    type: "list",
    name: "options",
    message: "Which sizing element do you need ?",
    choices: [ "px", "em", "rem", "%" ]
  },
	{
    type: "input",
    name: "rangestart",
    message: "Range Start",
    validate: function( value ) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
	{
    type: "input",
    name: "rangeend",
    message: "Range End",
    validate: function( value ) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a number";
    },
    filter: Number
  },
	{
    type: "confirm",
    name: "more",
    message: "Do you need More Utilities like Floats, Display and Overflow",
    default: false
  }
];

inquirer.prompt(options, function( answers ) {
	 var css = '';
	 
	 for(var i = answers.rangestart; i <= answers.rangeend; i++) {
		 css += ".m"+i+"{margin:"+i+""+answers.options+";}";
		 
		 css += ".mt"+i+"{margin-top:"+i+""+answers.options+";}";
		 
		 css += ".mr"+i+"{margin-right:"+i+""+answers.options+";}";
		 
		 css += ".mb"+i+"{margin-bottom:"+i+""+answers.options+";}";
		 
		 css += ".ml"+i+"{margin-left:"+i+""+answers.options+";}";
	 }
	 
	 if(answers.more) {
		 css += ".db{display:block}.dib{display:inline-block}.di{display:inline}.dt{display:table}.dtc{display:table-cell}.fl{float:left}.fr{float:right}.oh{overflow:hidden}.cb,.clear{clear:both}";
	 }
	 
	 console.log(css);
});