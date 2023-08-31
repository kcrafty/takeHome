const Trie = require("./Trie");

module.exports = function generateTrieFromWords(wordList) {
  // Initialize the trie and insert the words
  const trie = new Trie();
  for (let word of wordList) {
    trie.insert(word);
  }

  return trie;
};
