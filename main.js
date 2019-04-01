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

function dfToggleButtonStates(selection) {
    // Go to Plugins > Development > Developer Console to see this log output
    // console.log("dfToggleButtonStates is running!");
    // if selected item is text toggle colors
    selection.items.forEach(node =>
    {
      if(node instanceof Text){
        toggleTextColor(node);
      }else if(node instanceof Path){
        toggleIconColor(newNode);
      }else if(node instanceof SymbolInstance || node instanceof Group){
        // if selected is a symbol group, loop the text and update color
        // duplicate this symbol before changing properties
        commands.duplicate();
        commands.ungroup();
        selection.items.forEach(newNode => {
            // loop inside symbol and update color
            if (newNode instanceof Text) {
              toggleTextColor(newNode);
            }else if(newNode instanceof Path){
              toggleIconColor(newNode);
            }
        })
        commands.group();

      }else{
        // don't do anything, not sure how to handle it
      }
    })

}
function toggleTextColor(node){
  // swap color if selected is Text
  switch (node.fill.toHex(true)){
    case textDefaultColor.toHex(true):
      node.fill = textDisabledColor;
      break;
    case textDisabledColor.toHex(true):
      node.fill = textDefaultColor;
      break;
    default:
      console.log("Selected text " + node.fill.toHex(true) + " not default behaviour so ignore it.");
    }
}
function toggleIconColor(node){
  // swap color if selected is a path
  switch (node.fill.toHex(true)){
    case iconDefaultColor.toHex(true):
      node.fill = iconDisabledColor;
      break;
    case iconDisabledColor.toHex(true):
      node.fill = iconDefaultColor;
      break;
    default:
      console.log("Selected path " + node.fill.toHex(true) + " not default behaviour so ignore it.");
    }
}

function dfToggleTabStates(selection) {
  // coming soon

}

function filterAndColor(selection, documentRoot) {
  // test ground

}


module.exports = {
    commands: {
        dfToggleButtonStates,
        dfToggleTabStates
    }
};
