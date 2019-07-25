/*
 * Homemade plugin for Adobe XD.
 *
 * Visit http://adobexdplatform.com/ for API docs and more sample code.
 */
var commands = require("commands");
var { Artboard, Rectangle, Ellipse, Text, Color, Path, SymbolInstance, Group } = require("scenegraph");

var textDefaultColor = new Color("#000000"); // not #2D2926?
var textDisabledColor = new Color("#B7B7B7"); // not #AAAAAA?
var iconDefaultColor = new Color("#1E51BF"); // not #003DA5?
var iconDisabledColor = new Color("#B7B7B7");

var guidelineColor = ["#000000","#969696","#cccccc"];

var violationColorArray = [];

function dfToggleButtonStates(selection) {
    traverseTree(node, toggleTextColor);
}

function toggleColor(node){
  // swap color if selected is Text
  if(node instanceof Text){
  switch (node.fill.toHex(true)){
    case textDefaultColor.toHex(true):
      node.fill = textDisabledColor;
      break;
    case textDisabledColor.toHex(true):
      node.fill = textDefaultColor;
      break;
    default:
      console.log(node.name + " :" + node.fill.toHex(true) + " not an acceptable button color, ignore it.");
    }
  }

  if(node instanceof Path){
    switch (node.fill.toHex(true)){
      case iconDefaultColor.toHex(true):
        node.fill = iconDisabledColor;
        break;
      case iconDisabledColor.toHex(true):
        node.fill = iconDefaultColor;
        break;
      default:
        console.log(node.name + " :" + node.fill.toHex(true) + " not an acceptable button color, ignore it.");
      }
  }
}


function dfToggleTabStates(selection) {
  // coming soon

}


function checkFillStroke(node){
  // see if there's any color in file or border that doesn't belong to DF palette under the color guideline

    if(node instanceof Text || node instanceof Rectangle ||
    node instanceof Path || node instanceof Ellipse){

      // fill color fail
      if((node.fill instanceof Color) && !guidelineColor.includes(node.fill.toHex(true))){
        console.log(node.name.substring(0,30) + " fill color not in guideline: " + node.fill.toHex(true));
        violationColorArray.push(node.fill);
      }

      // stroke color fail
      if((node.stroke instanceof Color)  && !guidelineColor.includes(node.stroke.toHex(true))){
        console.log(node.name.substring(0,30)+ " stroke color not in guideline: " + node.stroke.toHex(true));
        violationColorArray.push(node.fill);
      }


    } // else is a group
      // console.log("is a group or undefined" + node);

}
function traverseTree(node, command, value = null)
{
  command(node, value);

  if (node.isContainer) {
    var childNodes = node.children;

    for(var i=0;i<childNodes.length;i++) {
      let childNode = childNodes.at(i);

      traverseTree(childNode, command, value);
    }
  }
}
function dfCheckPalette(selection, documentRoot){

  traverseTree(documentRoot, checkFillStroke);

  // consolidate violation colors, sort and get unique list of hex code
  // generate dialog UI to ask if user wants to replace with a similar color that's in the guideline

}


module.exports = {
    commands: {
        dfToggleButtonStates,
        dfToggleTabStates,
        dfCheckPalette
    }
};
