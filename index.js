import Tree from "./nodetree.js";

const demoArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 666];

let tree1 = new Tree(demoArray);

console.log(tree1.buildTree(demoArray));
