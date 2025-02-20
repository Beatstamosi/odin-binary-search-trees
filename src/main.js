class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let sortedArr = this.sortArr(array);
        let start = 0;
        let end = sortedArr.length - 1;

        return this.sortedArrToBSTRec(sortedArr, start, end);
    }

    sortedArrToBSTRec(arr, start, end) {
        if (start > end) return null;

        let mid = Math.floor((start + end) / 2);
        let root = new Node(arr[mid]);

        root.left = this.sortedArrToBSTRec(arr, start, mid - 1);
        root.right = this.sortedArrToBSTRec(arr, mid + 1, end);

        return root;
    }

    sortArr(array) {
        return Array.from(new Set(array)).sort((a, b) => a - b);
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(value, node = this.root) {
        if (node == null) return new Node(value);

        if (node.data == value) return node; // no duplicates

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    

    }
