import mergeSort from "./mergesort.js";

class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export function prettyPrint(node, prefix = "", isLeft = true) {
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

export class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    console.log("----------- Buildtree starts ------------");
    let orderedArray = mergeSort(array);
    let cleanedArray = removeDuplicates(orderedArray);
    console.log(cleanedArray);

    let start = 0;
    let end = cleanedArray.length - 1;
    let mid = Math.floor((start + end) / 2);

    if (end < start) {
      console.log(`Setting node to null`);
      return null;
    }

    let leftSubArr = createSubArr(cleanedArray, 0, mid - 1);
    let rightSubArr = createSubArr(cleanedArray, mid + 1, end);

    console.log(`Left sub array is: ${leftSubArr}`);
    console.log(`Right sub array is: ${rightSubArr}`);

    console.log(`Setting node to ${cleanedArray[mid]}`);
    let node = new Node(cleanedArray[mid]);
    node.left = this.buildTree(leftSubArr);
    node.right = this.buildTree(rightSubArr);

    return node;
  }

  insert(value) {
    let node = this.root;
    while (node) {
      if (value < node.data) {
        if (!node.left) {
          node.left = new Node(value);
          return;
        }
        node = node.left;
      } else {
        if (!node.right) {
          node.right = new Node(value);
          return;
        }
        node = node.right;
      }
    }
  }

  deleteItem(value) {
    let node = this.root;
    let prevNode = this.root;
    while (node) {
      if (value < node.data) {
        if (node.left.data === value) {
          // If node is a leaf node just delete the reference to it
          if (node.left.left === null && node.left.right === null) {
            node.left = null;
            return;
          }
          if (node.left.left && !node.left.right) {
            // If node to the LEFT has a left node and doesn't have a right node
            node.left = node.left.left;
            return;
          } else if (!node.left.left && node.left.right) {
            // If node to the LEFT has a right node and doesn't have a left node
            node.left = node.left.right;
            return;
          } else if (node.left.left && node.left.right) {
            // If node to the LEFT has both a left node and a right node
            node.left = node.left.left;
            node.right = node.left.right;
            console.log("Node to delete had both left and right nodes");
            return;
          }
        }
        prevNode = node;
        node = node.left;
      } else {
        if (node.right.data === value) {
          // If node is a leaf node just delete the reference to it
          if (node.right.left === null && node.right.right === null) {
            node.right = null;
            return;
          }
          if (node.right.left && !node.right.right) {
            // If node to the RIGHT has a left node and doesn't have a right node
            node.right = node.right.left;
            return;
          } else if (!node.right.left && node.right.right) {
            // If node to the RIGHT has a right node and doesn't have a left node
            node.right = node.right.right;
            return;
          } else if (node.right.left && node.right.right) {
            // If node to the RIGHT has both a left node and a right node
            // node.left = node.right.left;
            // node.right = node.right.right;
            let switchNode = node;
            while (switchNode) {
              console.log(switchNode);
              if (switchNode.right > switchNode.left) {
                switchNode = switchNode.left;
              } else {
                switchNode = switchNode.right;
              }
            }
            console.log(switchNode);
            node.right.data = switchNode.data;
            switchNode = null;
            console.log("Node to delete had both left and right nodes");
            return;
          }
        }
        prevNode = node;
        node = node.right;
      }
    }
  }
}
