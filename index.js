import { Tree, prettyPrint } from "./nodetree.js";

const demoArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

let tree1 = new Tree(demoArray);

tree1.insert(4);

prettyPrint(tree1.root);

console.log("-------------------");

// tree1.deleteItem(4);

// prettyPrint(tree1.root);

// console.log(tree1.find(18));
