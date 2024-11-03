import mergeSort from "./mergesort.js";

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

function removeDuplicates(array) {
  let cleanedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (!cleanedArray.includes(array[i])) {
      cleanedArray.push(array[i]);
    }
  }
  return cleanedArray;
}

function createSubArr(array, start, end) {
  let subArray = [];
  for (let i = start; i <= end; i++) {
    subArray.push(array[i]);
  }
  return subArray;
}

export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    let orderedArray = mergeSort(array);
    let cleanedArray = removeDuplicates(orderedArray);
    console.log(cleanedArray);

    let start = 0;
    let end = cleanedArray.length - 1;
    let mid = Math.floor((start + end) / 2);
    console.log(`*** Start is: ${start} | Mid is: ${mid} | End is: ${end} ***`);

    let leftSubArr = createSubArr(cleanedArray, 0, mid - 1);
    let rightSubArr = createSubArr(cleanedArray, mid + 1, end);

    console.log(`Left sub array is: ${leftSubArr}`);
    console.log(`Right sub array is: ${rightSubArr}`);

    // let a = new Node(cleanedArray[mid]);
    // a.left = this.buildTree();

    // return a;
  }
}
