const TrieNode = require("./TrieNode");

//   Note that the maximum depth of our tree will be the length of the longest word we insert.
module.exports = class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Inserting a word will create nodes in the trie with each node representing
  //   a single character of the word and whether or not that character marks a
  //   valid end of a word. Any word inserted into the tree is considered a complete and valid word.
  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // Check if the given prefix exists in the trie.
  isPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }

  //  We'll be checking if a word is valid by seeing if you can
  //   traverse the trie using its characters and ultimately
  //   reach a node with isEndOfWord set to true
  isWord(word) {
    let node = this.root;

    for (let char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }
};
