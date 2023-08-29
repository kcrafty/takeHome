// Please write a function that accepts a single string as input, and that returns a list of English words
// that can be created using some combination of the letters in the input string.

// Example input: "oogd"
// Example output: ["good", "god", "dog", "goo", "do", "go"]

// You can assume you'll be given an array of strings that enumerates all valid English words. To determine whether
// a word is a valid word, you can simply check for its presence in the array (e.g., `WORDS.includes(word)`)
// =========================================================================

const WORDS = ["good", "god", "dog", "goo", "do", "go"];

function generateCombinations(str) {
  const results = [];
  const f = (prefix, chars) => {
    for (let i = 0; i < chars.length; i++) {
      const next = prefix + chars.charAt(i);
      results.push(next);
      f(next, chars.slice(i + 1));
    }
  };
  f("", str);
  return results;
}

function generatePermutations(str) {
  if (str.length <= 1) {
    return [str];
  }
  const perms = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remainingStr = str.slice(0, i) + str.slice(i + 1, str.length);
    for (let perm of generatePermutations(remainingStr)) {
      perms.push(char + perm);
    }
  }
  return perms;
}

function findWordsFromLetters(str) {
  const validWords = new Set();
  const combinations = generateCombinations(str);

  for (let comb of combinations) {
    for (let perm of generatePermutations(comb)) {
      if (WORDS.includes(perm)) {
        validWords.add(perm);
      }
    }
  }

  return [...validWords];
}

// Start the timer
let startTime = new Date().getTime();

// Before calling your function, get the memory usage
let initialMemoryUsage = process.memoryUsage().heapUsed;

// Call your function
let results = findWordsFromLetters("oogd");

// End the timer
let endTime = new Date().getTime();

// Calculate the difference
let timeTaken = endTime - startTime;

console.log(`Time taken: ${timeTaken} ms`);
console.log("Results:", results);

// After calling your function, get the memory usage again
let finalMemoryUsage = process.memoryUsage().heapUsed;

// Calculate the difference
let memoryUsed = finalMemoryUsage - initialMemoryUsage;

console.log(`Memory used: ${memoryUsed / 1024 / 1024} MB`); // Convert bytes to MB
console.log("Results:", results);
