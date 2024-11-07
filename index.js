import { Tree, prettyPrint } from "./nodetree.js";

let demoArray = randomArray(50);

function randomArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    let random = Math.floor(Math.random() * 100);
    arr.push(random);
  }
  return arr;
}

let nodeVals = [];

function populateNodeVals(node) {
  nodeVals.push(node.data);
}

let tree1 = new Tree(demoArray);

prettyPrint(tree1.root);
console.log(`BST is balanced: ${tree1.isBalanced()}`);

// Print out all elements in level, pre, post and in order
nodeVals = [];
tree1.levelOrder(populateNodeVals);
console.log(`Here is the BST node values in level order ${nodeVals}`);
console.log("-----------------------------------------");

nodeVals = [];
tree1.preOrder(populateNodeVals);
console.log(`Here is the BST node values in pre-order ${nodeVals}`);
console.log("-----------------------------------------");

nodeVals = [];
tree1.postOrder(populateNodeVals);
console.log(`Here is the BST node values in post-order ${nodeVals}`);
console.log("-----------------------------------------");

nodeVals = [];
tree1.inOrder(populateNodeVals);
console.log(`Here is the BST node values in order ${nodeVals}`);
console.log("-----------------------------------------");

// Unbalance the tree
tree1.insert(140);
tree1.insert(145);
tree1.insert(148);
tree1.insert(169);

prettyPrint(tree1.root);
console.log(`BST is balanced: ${tree1.isBalanced()}`);
console.log("-----------------------------------------");

tree1.rebalance();
console.log(`BST is balanced: ${tree1.isBalanced()}`);
prettyPrint(tree1.root);

// Print out all elements in level, pre, post and in order again.

nodeVals = [];
tree1.levelOrder(populateNodeVals);
console.log(`Here is the BST node values in level order ${nodeVals}`);
console.log("-----------------------------------------");

nodeVals = [];
tree1.preOrder(populateNodeVals);
console.log(`Here is the BST node values in pre-order ${nodeVals}`);
console.log("-----------------------------------------");

nodeVals = [];
tree1.postOrder(populateNodeVals);
console.log(`Here is the BST node values in post-order ${nodeVals}`);
console.log("-----------------------------------------");

nodeVals = [];
tree1.inOrder(populateNodeVals);
console.log(`Here is the BST node values in order ${nodeVals}`);
console.log("-----------------------------------------");
