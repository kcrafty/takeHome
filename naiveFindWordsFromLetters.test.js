const naiveFindWordsFromLetters = require("./naiveFindWordsFromLetters");

describe("naiveFindWordsFromLetters", () => {
  test("should return correct words for the `oogd` string from the prompt", () => {
    const input = "oogd";
    const expectedOutput = ["good", "god", "dog", "goo", "do", "go"];
    const result = naiveFindWordsFromLetters(input);

    expect(result).toIncludeSameMembers(expectedOutput);
    expect(result.length).toBe(expectedOutput.length);
  });

  test("should return an empty array for a `zzyzzx` string that with no matches in WORDS", () => {
    const input = "zzyzzx";
    const result = naiveFindWordsFromLetters(input);

    expect(result).toBeEmpty();
  });

  test("should handle input strings with capital letters, e.g. `OOgD`", () => {
    const input = "OOgD";
    const expectedOutput = ["good", "god", "dog", "goo", "do", "go"];
    const result = naiveFindWordsFromLetters(input);

    expect(result).toIncludeSameMembers(expectedOutput);
    expect(result.length).toBe(expectedOutput.length);
  });

  test("should return the same result for two inputs with the same letters in a different combination", () => {
    const input1 = "oogd";
    const input2 = "good";
    const result1 = naiveFindWordsFromLetters(input1);
    const result2 = naiveFindWordsFromLetters(input2);

    expect(result1).toIncludeSameMembers(result2);
    expect(result1.length).toBe(result2.length);
  });
});
