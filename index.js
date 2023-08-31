// ====================================  INSTRUCTIONS  ====================================
// Please write a function that accepts a single string as input, and that returns a list of English words
// that can be created using some combination of the letters in the input string.

// Example input: "oogd"
// Example output: ["good", "god", "dog", "goo", "do", "go"]

// You can assume you'll be given an array of strings that enumerates all valid English words. To determine whether
// a word is a valid word, you can simply check for its presence in the array (e.g., `WORDS.includes(word)`)

// ==================================  GENERAL THOUGHTS  ==================================
// This solution is written to optimize the solution's performance but with a few key
//  liberties I've taken considering the prompt.
//
//  1. I can pass in my own word list to the function, but I'll default to a WORDS array
//        in global scope if one is not provided
//
//  2. I can process the word list in the manner I see fit to improve performance.
//
//  3. I can output my result list as a Set.
//
// ========================================================================================

const generateTrieFromWords = require("./generateTrieFromWords");

// The WORDS array is defined in global scope so my function can access it.
const WORDS = ["good", "god", "dog", "goo", "do", "go"];

// The function accepts a word list as an optional second parameter,
//   defaulting to WORDS if one is not provided
function findWordsFromLetters(inputStr, wordList = WORDS) {
  // We convert the inputString to lower case to match what's in WORDS.
  // I am making the assumption that the wordList contains all lowercase words.
  // I trust (user) input less than static data which should be formatted.
  const inputString = inputStr.toLowerCase();

  // We will use a trie data structure, also known as a prefix tree.
  // Tries allow for efficient word lookups and can be used to search for words based on prefixes.
  const prefixTree = generateTrieFromWords(wordList);

  // use a Set to prevent duplicate words in my solution
  const words = new Set();

  // This is a depth-first recursive function that will generate all combinations
  // of the input string (but pruning combination branches using the prefixTree)
  // and then check if each combination is a valid word, adding
  // it to our words Set if so.
  const generateValidWordsFromLetters = (
    currentWordCandidate = "",
    usedLetterTracker = Array(inputString.length).fill(false)
  ) => {
    // Note that depth-first traversal is preferred over breadth-first because
    // our tree will be much wider than it is tall due to the large number of
    // combinations vs the length of the input string, thus BFS would be memory-intensive

    // if currentWordCandidate is a word, add to results
    if (prefixTree.isWord(currentWordCandidate)) {
      // this isWord check is O(n) where n = length of currentWordCandidate
      // much better than using WORDS.includes() where n = length of WORDS aka wordList
      words.add(currentWordCandidate); // note: adding the same value to a set is fine, the set will ignore the duplicate
    }

    // Iterate through the letters of the input string and recursively generate string combinations
    // using a DFS backtracking technique while pruning dead-end branches/combinations.
    for (let i = 0; i < inputString.length; i++) {
      if (!usedLetterTracker[i]) {
        const newWordCandidate = currentWordCandidate + inputString[i];

        // Before we explore further combinations with the currentWordCandidate as a prefix,
        // we make sure that there are valid words in the prefixTree that start with it.
        // If not, we can prune this branch from the recursive traversal.
        // This is a key optimization that is not used in naiveFindWordsFromLetters.
        if (prefixTree.isPrefix(newWordCandidate)) {
          // When we decide to use a letter in our current branch of exploration, we mark
          // it as "used" by setting usedLetterTracker[i] = true. This ensures that in subsequent
          // recursive calls for this branch, we don't reuse the same letter.
          usedLetterTracker[i] = true;

          // Recursively explore possible combinations having marked our current letter as used.
          generateValidWordsFromLetters(newWordCandidate, usedLetterTracker);

          // After exploring all possibilities with the current letter, we need to "undo"
          // or "reset" our choice to explore other possibilities without this letter.
          // This is where usedLetterTracker[i] = false comes into play. It ensures that
          // in the next iteration of the loop, the next letter can be considered for use.
          usedLetterTracker[i] = false;
        }
      }
    }
  };

  generateValidWordsFromLetters();

  return words;
}

module.exports = findWordsFromLetters;
