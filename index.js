import { Tree, prettyPrint } from "./nodetree.js";

const demoArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// const demoArray = [1, 3, 4, 6, 7, 8, 10, 13, 14];

let tree1 = new Tree(demoArray);

// console.log(tree1.buildTree(demoArray));
tree1.insert(2);
tree1.insert(32);
tree1.insert(18);

prettyPrint(tree1.root);

console.log("-------------------");

tree1.deleteItem(67);

prettyPrint(tree1.root);
