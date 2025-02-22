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
        if (node === null) return new Node(value);

        if (value == node.data) return node;

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (node === null) return node;

        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            // node has no children or 1 child
            if (node.left === null) return node.right;

            if (node.right === null) return node.left;

            if (node.left !== null && node.right !== null) {
                let succ = this.getSuccessor(node);
                node.data = succ.data;
                node.right = this.deleteItem(succ.data, node.right);
            }
        }
        return node;
    }

    getSuccessor(curr) {
        curr = curr.right;

        while(curr !== null && curr.left !== null) {
            curr = curr.left;
        }

        return curr;
    }

    find(value, node = this.root) {
        if (value == node.data) return node;

        if (value < node.data) {
            return this.find(value, node.left);
        } else {
            return this.find(value, node.right);
        }
    }

    levelOrder(callback) {
        if (!callback) throw Error("Callback function needed as argument");

        let queue = [];
        queue.push(this.root);

        while (queue.length !== 0) {
            let node = queue.shift();
            callback(node);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
    }

    preOrder(callback, node = this.root) {
        if (!callback) throw Error("Callback function needed as argument");

        if (node == null) return;

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    inOrder(callback, node = this.root) {
        if (!callback) throw Error("Callback function needed as argument");

        if (node == null) return;

        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (!callback) throw Error("Callback function needed as argument");

        if (node == null) return;

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }


    height(node) {
        if (node === null) return -1;

        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node, root = this.root, dist = -1) {
        if (node === null) return dist;

        if (node.data < root.data) {
            return this.depth(node, root.left, dist + 1);
        } else if (node.data > root.data) {
            return this.depth(node, root.right, dist + 1);
        } else {
            return dist + 1;
        }
    }

    isBalanced() {
        let isBalancedTree = true;

        const compareHeight = (node) => {
            let leftHeight = this.height(node.left);
            let rightHeight = this.height(node.right);
    
            if (Math.abs(leftHeight - rightHeight) > 1) {
                isBalancedTree = false;
            }
        }
    
        this.levelOrder(compareHeight);
    
        return isBalancedTree;
    }

    rebalance() {
        let array = [];

        const add = (node) => {
            array.push(node.data)
        }

        this.inOrder(add);
        this.root = this.buildTree(array);
    }

    }
