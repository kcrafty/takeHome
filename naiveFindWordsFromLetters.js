const { LETTERS_ONLY_REGEX } = require("./constants");

// ====================================  INSTRUCTIONS  ====================================
// Please write a function that accepts a single string as input, and that returns a list of English words
// that can be created using some combination of the letters in the input string.

// Example input: "oogd"
// Example output: ["good", "god", "dog", "goo", "do", "go"]

// You can assume you'll be given an array of strings that enumerates all valid English words. To determine whether
// a word is a valid word, you can simply check for its presence in the array (e.g., `WORDS.includes(word)`)

// ==================================  GENERAL THOUGHTS  ==================================
// This solution is written to obey the constraints of the prompt as closely as possible.
//
// Constraint 1. The function only accepts a single string input, so WORDS list cannot
//                be passed in as a parameter but is instead accessed in global scope
//
// Constraint 2. `WORDS.includes(word)` should be how I check for the validity of a word.
//                As a corollary to this, I cannot mutate WORDS to improve the linear time
//                complexity of accessing an item in an array like this. If WORDS were to
//                include all possible English words, it's size would be well into the
//                100s of thousands.
//
// Constraint 3. The given example output shows an array, so I'll be outputing my solution
//                as an array
//
// I forsee performance issues with this current implementation, mainly due to the
// exponentially growing number of combinations to explore for the input string.
// e.g. the number of combinations for a string of length 12 is 12! which is nearly half a billion.
// In my solution in index.js I use a pruning strategy that helps alleviate this concern.
// ========================================================================================

// The WORDS array is defined in global scope so my function can access it.
// I'm also noting that all caps signifies the list as a constant by convention, which
// reinforces my belief that I shouldn't be mutating this based on the prompt.
const WORDS = ["good", "god", "dog", "goo", "do", "go"];

// I'm naming the function with "naive" as a prefix for illustrative purposes.
// I think my solution in index.js without the prefix is the ideal solution in
// any kind of production environment so that one gets the same name sans prefix.
function naiveFindWordsFromLetters(inputStr) {
  if (inputStr === "") return [];
  if (!LETTERS_ONLY_REGEX.test(inputStr)) {
    throw new Error("Input string must only contain letters");
  }

  // We convert the inputString to lower case to match what's in WORDS.
  // I am making the assumption that WORDS contains all lowercase words.
  // I trust (user) input less than static data which should be formatted.
  const inputString = inputStr.toLowerCase();

  // use a Set to prevent duplicate words in my solution
  const words = new Set();

  // This is a depth-first recursive function that will generate all combinations
  // of the input string and then check if each combination is a valid word, adding
  // it to our words Set if so.
  const generateValidWordsFromLetters = (
    currentWordCandidate = "",
    usedLetterTracker = Array(inputString.length).fill(false)
  ) => {
    // Note that depth-first traversal is preferred over breadth-first because
    // our tree will be much wider than it is tall due to the large number of
    // combinations vs the length of the input string, thus BFS would be memory-intensive

    // Checking for word validity according to the prompt guidelines
    if (WORDS.includes(currentWordCandidate)) {
      // this check is O(n) with n = WORDS.length
      // this could be improved to O(1) by converting the WORDS array to a Set,
      //    or O(log n ) by making sure WORDS is sorted, which would be desirable
      //    since the length of all words in English is over 100k
      words.add(currentWordCandidate); // note: adding the same value to a set is fine, the set will ignore the duplicate
    }

    // Iterate through the letters of the input string and recursively generate string combinations
    // using a DFS backtracking technique.
    for (let i = 0; i < inputString.length; i++) {
      // iterate up to a maximum of inputString length so we don't generate combinations longer than the input string itself
      if (!usedLetterTracker[i]) {
        // When we decide to use a letter in our current branch of exploration, we mark
        // it as "used" by setting usedLetterTracker[i] = true. This ensures that in subsequent
        // recursive calls for this branch, we don't reuse the same letter.
        usedLetterTracker[i] = true;

        // Recursively explore possible combinations having marked our current letter as used.
        generateValidWordsFromLetters(
          currentWordCandidate + inputString[i],
          usedLetterTracker
        );

        // After exploring all possibilities with the current letter, we need to "undo"
        // or "reset" our choice to explore other possibilities without this letter.
        // This is where usedLetterTracker[i] = false comes into play. It ensures that
        // in the next iteration of the loop, the next letter can be considered for use.
        usedLetterTracker[i] = false;
      }
    }
  };

  generateValidWordsFromLetters();

  // We convert the Set into an Array to match the example output
  return [...words];
}

module.exports = naiveFindWordsFromLetters;
