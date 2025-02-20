import "./styles.css";
import Tree from "./main";

document.addEventListener("DOMContentLoaded", () => {
    let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
    let tree = new Tree(array);

    // tree.prettyPrint(tree.root);
    tree.insert(13);
    tree.prettyPrint(tree.root);
    tree.deleteItem(67);
    tree.prettyPrint(tree.root);
})