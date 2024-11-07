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

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    let queue = [];

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      callback(queue[0]);
      queue.splice(0, 1);
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    function inOrderHelper(node, callback) {
      if (node !== null) {
        inOrderHelper(node.left, callback);
        callback(node);
        inOrderHelper(node.right, callback);
      }
    }

    inOrderHelper(this.root, callback);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    function preOrderHelper(node, callback) {
      if (node !== null) {
        callback(node);
        preOrderHelper(node.left, callback);
        preOrderHelper(node.right, callback);
      }
    }

    preOrderHelper(this.root, callback);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be a function");
    }

    function postOrderHelper(node, callback) {
      if (node !== null) {
        postOrderHelper(node.left, callback);
        postOrderHelper(node.right, callback);
        callback(node);
      }
    }

    postOrderHelper(this.root, callback);
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node) {
    let count = 0;
    let root = this.root;
    while (root) {
      if (node.data === root.data) {
        return count;
      } else if (node.data < root.data) {
        root = root.left;
        count += 1;
      } else if (node.data > root.data) {
        root = root.right;
        count += 1;
      }
    }
    return count;
  }

  isBalanced() {
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    function difference(a, b) {
      return Math.abs(a - b);
    }
    let diff = difference(leftHeight, rightHeight);
    console.log(diff);
    if (diff <= 1) {
      return true;
    } else {
      return false;
    }
  }

  rebalance() {
    if (!this.isBalanced()) {
      console.log("Tree is outta whack son, lemme straighten 'er up");
      let newArray = [];
      function populateNewArray(node) {
        newArray.push(node.data);
      }
      this.inOrder(populateNewArray);
      this.root = this.buildTree(newArray);
    }
  }
}
