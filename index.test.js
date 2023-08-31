const wordlist = require("wordlist-english");

const findWordsFromLetters = require("./index");

describe("findWordsFromLetters", () => {
  test("should return correct words for a small amount of letters and no passed-in word list", () => {
    const input = "oogd";
    const expectedOutput = ["good", "god", "dog", "goo", "do", "go"];
    const result = findWordsFromLetters(input);

    expect([...result]).toIncludeSameMembers(expectedOutput);
    expect(result.size).toBe(expectedOutput.length);
  });

  test("should return correct words for a 4-letter word against a list of 107768 words", () => {
    const input = "oogd";
    const expectedOutput = [
      "o",
      "oo",
      "goo",
      "good",
      "go",
      "god",
      "dog",
      "od",
      "do",
      "g",
      "d",
    ];
    const result = findWordsFromLetters(input, wordlist["english"]);

    expect([...result]).toIncludeSameMembers(expectedOutput);
    expect(result.size).toBe(expectedOutput.length);
  });

  test("should return correct words given an input string with capital letters", () => {
    const input = "oOgD";
    const expectedOutput = [
      "o",
      "oo",
      "goo",
      "good",
      "go",
      "god",
      "dog",
      "od",
      "do",
      "g",
      "d",
    ];
    const result = findWordsFromLetters(input, wordlist["english"]);

    expect([...result]).toIncludeSameMembers(expectedOutput);
    expect(result.size).toBe(expectedOutput.length);
  });

  test("should return correct words for an 11-letter word against a list of 107768 words", () => {
    const input = "abracadabra";
    const expectedOutput = [
      "a",
      "abracadabra",
      "aba",
      "abaca",
      "abb",
      "abba",
      "arb",
      "arc",
      "ad",
      "b",
      "bar",
      "bard",
      "barb",
      "baa",
      "bad",
      "baba",
      "bra",
      "brad",
      "brr",
      "r",
      "radar",
      "c",
      "cab",
      "car",
      "card",
      "cad",
      "crab",
      "d",
      "dab",
      "drab",
    ];
    const result = findWordsFromLetters(input, wordlist["english"]);

    expect([...result]).toIncludeSameMembers(expectedOutput);
    expect(result.size).toBe(expectedOutput.length);
  });

  test("should return correct words for a 1-letter word against a list of 107768 words", () => {
    const input = "a";
    const expectedOutput = ["a"];
    const result = findWordsFromLetters(input, wordlist["english"]);

    expect([...result]).toEqual(expect.arrayContaining(expectedOutput));
    expect(result.size).toBe(expectedOutput.length);
  });

  test("should return same results for all permutations of a word", () => {
    const input1 = "cat";
    const input2 = "cta";
    const input3 = "act";
    const input4 = "atc";
    const input5 = "tac";
    const input6 = "tca";

    const expectedOutput = ["t", "ta", "c", "cat", "a", "at", "act"];

    const result1 = findWordsFromLetters(input1, wordlist["english"]);
    const result2 = findWordsFromLetters(input2, wordlist["english"]);
    const result3 = findWordsFromLetters(input3, wordlist["english"]);
    const result4 = findWordsFromLetters(input4, wordlist["english"]);
    const result5 = findWordsFromLetters(input5, wordlist["english"]);
    const result6 = findWordsFromLetters(input6, wordlist["english"]);

    expect(result1.size).toBe(expectedOutput.length);
    expect(result2.size).toBe(expectedOutput.length);
    expect(result3.size).toBe(expectedOutput.length);
    expect(result4.size).toBe(expectedOutput.length);
    expect(result5.size).toBe(expectedOutput.length);
    expect(result6.size).toBe(expectedOutput.length);

    expect([...result1]).toIncludeSameMembers(expectedOutput);
    expect([...result2]).toIncludeSameMembers(expectedOutput);
    expect([...result3]).toIncludeSameMembers(expectedOutput);
    expect([...result4]).toIncludeSameMembers(expectedOutput);
    expect([...result5]).toIncludeSameMembers(expectedOutput);
    expect([...result6]).toIncludeSameMembers(expectedOutput);
  });

  test("should return correct words for a 15-letter word against a list of 107768 words", () => {
    const input = "bioluminescence";
    const expectedOutputSize = 630;
    const result = findWordsFromLetters(input, wordlist["english"]);

    expect(result.size).toBe(expectedOutputSize);
  });

  test("should finish given the longest word from a list of the 17042 most common words", () => {
    const input = "counterrevolutionaries";
    const expectedOutputSize = 651;
    const result = findWordsFromLetters(input, wordlist["english/50"]);

    // note the longest English word is pneumonoultramicroscopicsilicovolcanoconiosis, length 45
    // my solution did not successfully finish with an input word of that length, but it does
    // finish with this, the longest word in a large list of more common words

    expect(result.size).toBe(expectedOutputSize);
  });
});
