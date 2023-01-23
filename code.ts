// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
 
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
 
// This shows the HTML page in "ui.html".
figma.showUI(__html__);

import {groupNodesToFrame} from 'figma-utils';
 
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
 
 
  // const nodes = node.findAll(node => {
  //   return node.type === "TEXT"
  // })
  // console.log("groups?", node)
 
  if (msg.type === 'create-rectangles') {
    // let node = figma.currentPage;
    // let count = 0
    // function traverse(node) {
    //   if ("children" in node) {
    //     count++
    //     if (node.type !== "INSTANCE") {
    //       for (const child of node.children) {
    //         traverse(child)
    //       }
    //     }
    //   }
    // }
    // traverse(figma.currentPage)
    // let nodes: GroupNode
    // nodes = node.findAll(node => {
    //   return node.type === "TEXT"
    // })
    // let node = null;
    const input_array = figma.currentPage.findAll(node => {
      return node.type === "GROUP" //&& node.characters.length > 100
    })
    if(Array.isArray(input_array) === true && input_array !== null){
      console.log("WHAT")
      console.log("woop", input_array)
    }
    let group_array = [];
    let obj = {
      name: "",
      count: 1,
    };
    obj.name = input_array[0].name;
    // obj.count = 1;
 
    group_array.push(obj);
 
 
    for(let i = 1; i < input_array.length; i++){
      let found_match = false;
      let current_input = {
        name: input_array[i].name,
        count: 1,
      }
      for(let j = 0; j < group_array.length; j++){
        if(current_input.name === group_array[j].name){
          group_array[j].count += 1;
          found_match = true;
        }
      }
      console.log(i, current_input, found_match);
      if(found_match === false){
        group_array.push(current_input);
        console.log(i, group_array);
      }
    }
    console.log(input_array.length, group_array);
    figma.ui.postMessage(group_array);

    //set up a function that takes in a page object
const convertGroupsToFrames = (page) => {
  //loop through all nodes in the page
    for (let node of page.children) {
      //if the node is a group, create a new frame node
      if (node.type === "GROUP") {
        const frameNode = figma.createFrame();
        //copy all the style and content from the group node to the frame node
        frameNode.name = node.name;
        frameNode.backgrounds = node.backgrounds;
        frameNode.x = node.x;
        frameNode.y = node.y;
        frameNode.fills = node.fills;
        frameNode.strokes = node.strokes;
        frameNode.strokes = node.strokes;
        frameNode.opacity = node.opacity;
        frameNode.blendMode = node.blendMode;
        frameNode.children = node.children;
        //add the frame node to the page
        page.appendChild(frameNode);
        //remove the group node from the page

      }

    // for(let i = 1; i < input_array.length; i++){
    //   .type = "COMPONENT"
    // }
    // let this_id = input_array[0].id
    // // let type = 
    // // input_array[0].type = "COMPONENT"
    // console.log("changed?", input_array[0].type)
    // const this_node = figma.currentPage.findOne(node => {
    //   return node.type === "GROUP" && node.id === this_id
    // })
    // console.log("thisnode", this_node)
  
 
  }
 
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  // figma.closePlugin();
};

