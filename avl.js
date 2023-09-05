const readline = require("readline");

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.height = 1;
  }
}

class AvlTree {
  constructor(value) {
    this.root = null;
  }

  getHeight = (node)=>{
    return node ? node.height : 0;
  };

  getBalanceFactor = (node) => {
    return this.getHeight(node.left) - this.getHeight(node.right);
  };

  updateHeight = (node) => {
    const leftHeight = this.getHeight(node.left);
    const rightHeight = this.getHeight(node.right);
    node.height = 1 + Math.max(leftHeight, rightHeight);
  };

  leftRotate = (y) => {
    const x = y.right;
    const z = x.left;

    x.left = y;
    y.right = z;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  };

  rightRotate = (x) => {
    const y = x.left;
    const z = y.right;

    y.right = x;
    x.left = z;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  };


  getHeightOfTree = (node) =>{
    if (node === null) {
      return -1; // Altura de um nó vazio é -1.
    }

    const leftHeight = this.calculateHeight(node.left);
    const rightHeight = this.calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  insertValue = (value) => {
    this.root = this._insert(this.root, value);
  };

  _insert = (node, value) => {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.value) {
      node.left = this._insert(node.left, value);
    } else if (value > node.value) {
      node.right = this._insert(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);

    const balance = this.getBalanceFactor(node);

    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }
    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }
    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  };

  //IN-ORDER
  inOrder = (node) => {
    if (node) {
      this.inOrder(node.left);
      console.log(node.value);
      this.inOrder(node.right);
    }
  };

  showMenu = () => {
    console.log("Menu:");
    console.log("1. Inserir valor na árvore");
    console.log("2. Imprimir árvore em ordem crescente");
    console.log("3. Sair");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Escolha uma opção: ", (option) => {
      if (option === "1") {
        rl.question("Digite um valor para inserir: ", (value) => {
          this.insertValue(parseInt(value, 10));
          console.log(`Valor ${value} inserido na árvore.`);
          rl.close();
          this.showMenu();
        });
      } else if (option === "2") {
        console.log("Árvore AVL em ordem crescente:");
        this.inOrder(this.root);
        console.log(`Altura da arvore -> ${this.getHeightOfTree(this.root)}`);
        this.showMenu()
      } else if (option === "3") {
        rl.close();
      } else {
        console.log("Opção inválida. Por favor, escolha uma opção válida.");
        this.showMenu();
      }
    });
  };
}

const avlTree = new AvlTree();
avlTree.showMenu();

