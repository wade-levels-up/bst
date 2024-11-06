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
    let orderedArray = mergeSort(array);
    let cleanedArray = removeDuplicates(orderedArray);

    let start = 0;
    let end = cleanedArray.length - 1;
    let mid = Math.floor((start + end) / 2);

    if (end < start) {
      return null;
    }

    let leftSubArr = createSubArr(cleanedArray, 0, mid - 1);
    let rightSubArr = createSubArr(cleanedArray, mid + 1, end);

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
      } else if (value === node.data) {
        return;
      } else {
        if (!node.right) {
          node.right = new Node(value);
          return;
        }
        node = node.right;
      }
    }
  }

  // deleteItem(value) {
  //   let node = this.root;
  //   let prevNode = this.root;
  //   while (node) {
  //     if (value < node.data) {
  //       if (node.left.data === value) {
  //         // If node is a leaf node just delete the reference to it
  //         if (node.left.left === null && node.left.right === null) {
  //           node.left = null;
  //           return;
  //         }
  //         if (node.left.left && !node.left.right) {
  //           // If node to the LEFT has a left node and doesn't have a right node
  //           node.left = node.left.left;
  //           return;
  //         } else if (!node.left.left && node.left.right) {
  //           // If node to the LEFT has a right node and doesn't have a left node
  //           node.left = node.left.right;
  //           return;
  //         } else if (node.left.left && node.left.right) {
  //           let switchNode = node.left;
  //           let previous = node.left;
  //           while (switchNode.left || switchNode.right) {
  //             if (switchNode.left && switchNode.right) {
  //               if (switchNode.right.data > switchNode.left.data) {
  //                 previous = switchNode;
  //                 switchNode = switchNode.left;
  //               } else {
  //                 previous = switchNode;
  //                 switchNode = switchNode.right;
  //               }
  //             } else if (switchNode.left && !switchNode.right) {
  //               previous = switchNode;
  //               switchNode = switchNode.left;
  //             } else {
  //               previous = switchNode;
  //               switchNode = switchNode.right;
  //             }
  //           }
  //           node.left.data = switchNode.data;
  //           // Find which side leaf node was on and remove it
  //           if (previous.left && switchNode.data === previous.left.data) {
  //             previous.left = null;
  //           } else if (
  //             previous.right &&
  //             switchNode.data === previous.right.data
  //           ) {
  //             previous.right = null;
  //           }
  //           return;
  //         }
  //       }
  //       prevNode = node;
  //       node = node.left;
  //     } else {
  //       if (node.right.data === value) {
  //         // If node is a leaf node just delete the reference to it
  //         if (node.right.left === null && node.right.right === null) {
  //           node.right = null;
  //           return;
  //         }
  //         if (node.right.left && !node.right.right) {
  //           // If node to the RIGHT has a left node and doesn't have a right node
  //           node.right = node.right.left;
  //           return;
  //         } else if (!node.right.left && node.right.right) {
  //           // If node to the RIGHT has a right node and doesn't have a left node
  //           node.right = node.right.right;
  //           return;
  //         } else if (node.right.left && node.right.right) {
  //           let switchNode = node.right;
  //           let previous = node.right;
  //           while (switchNode.left || switchNode.right) {
  //             if (switchNode.left && switchNode.right) {
  //               if (switchNode.right.data > switchNode.left.data) {
  //                 previous = switchNode;
  //                 switchNode = switchNode.left;
  //               } else {
  //                 previous = switchNode;
  //                 switchNode = switchNode.right;
  //               }
  //             } else if (switchNode.left && !switchNode.right) {
  //               previous = switchNode;
  //               switchNode = switchNode.left;
  //             } else {
  //               previous = switchNode;
  //               switchNode = switchNode.right;
  //             }
  //           }
  //           node.right.data = switchNode.data;
  //           // Find which side leaf node was on and remove it
  //           if (previous.left && switchNode.data === previous.left.data) {
  //             previous.left = null;
  //           } else if (
  //             previous.right &&
  //             switchNode.data === previous.right.data
  //           ) {
  //             previous.right = null;
  //           }
  //           return;
  //         }
  //       }
  //       prevNode = node;
  //       node = node.right;
  //     }
  //   }
  // }

  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(node, value) {
    if (node === null) {
      return null;
    }

    if (node.data > value) {
      node.left = this.deleteItem(node.left, value);
    } else if (node.data < value) {
      node.right = this.deleteItem(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let succ = this.getSuccessor(node);
      node.data = succ.data;
      node.right = this.deleteItem(node.right, succ.data);
    }
    return node;
  }

  find(value) {
    let node = this.root;
    if (node.data === value) {
      return node;
    }
    while (node) {
      if (value < node.data) {
        node = node.left;
        if (node.data === value) {
          return node;
        }
      }
      if (value > node.data) {
        node = node.right;
        if (node.data === value) {
          return node;
        }
      }
    }
  }

  levelOrder(callback) {}
}
