import mergeSort from "./mergesort.js";

class Node {
  constructor(data, leftCh, rightCh) {
    this.data = data;
    this.leftCh = leftCh;
    this.rightCh = rightCh;
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

export default class Tree {
  constructor(array) {
    this.array = array;
    this.root = 0;
  }

  buildTree(array) {
    let orderedArray = mergeSort(array);
    let cleanedArray = removeDuplicates(orderedArray);
    console.log(cleanedArray);
  }
}
