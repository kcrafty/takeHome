## Overview

This repo contains my solution to the take-home problem from Weekend Health. You can view my solution that sticks as closely as I can to the prompt constraints in `naiveFindWordsFromLetters.js` and you can find my optimized solution to the prompt in `index.js`. Both solutions have `jest` tests written for them. You can run these with the following steps.

1. Clone the repo
   ```sh
   git clone https://github.com/craftjk/whth
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the test scripts
   ```sh
   npm test
   ```

It should be noted that additional comments explaining my thoughts and my solution can be found within the files.

### Built With

- Solution written in `JavaScript`
- Tests made with `jest`
- Word list loaded from npm package `wordlist-english`

## Prompt

The prompt for this project is listed verbatim below, taken from an email with Alex on Tuesday, August 29.

```
Please write a function that accepts a single string as input, and that returns a list of English words
that can be created using some combination of the letters in the input string.

Example input: "oogd"
Example output: ["good", "god", "dog", "goo", "do", "go"]

You can assume you'll be given an array of strings that enumerates all valid English words. To determine whether
a word is a valid word, you can simply check for its presence in the array (e.g., `WORDS.includes(word)`)
```

## Key assumptions made in naiveFindWordsFromLetters

- My function should only accept a single string as input with no other parameters, `WORDS` will be defined in a scope outside of but accessible to my function.
- `WORDS.includes(word)` is the only way I should be checking if a word is valid.
- I am not able to mutate or change the `WORDS` list in any way.
- I'm assuming WORDS contains all lowercase words

## Key assumptions made in findWordsFromLetters

- My function can take an optional word list as a second parameter
- I can mutate this word list however I see fit to optimize my function's performance
- I can check if a word is valid in whatever manner I choose
- I'm assuming the word list contains all lowercase words
