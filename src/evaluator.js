import puzzleListing from "./puzzleListing";
import { apiMap, fetchPuzzleInput } from "./api";

const solutions = {
  "1-1": solve1p1,
  "1-2": solve1p2,
  "2-1": solve2p1,
  "2-2": solve2p2
};

export const puzzleOptions = Object.entries(puzzleListing).reduce(
  (updatedMap, [key, val]) => {
    return {
      ...updatedMap,
      [key]: {
        ...updatedMap[key],
        hasInputs: !!apiMap[key],
        solved: !!solutions[key]
      }
    };
  },
  puzzleListing
);

export const solvePuzzle = id => {
  if (!solutions[id]) {
    return Promise.resolve("Oops, that hasn't been solved yet");
  }
  return solutions[id]();
};

/**
 * Day 1, part 1: Find the net frequency change.
 * (https://adventofcode.com/2018/day/1)
 * API input: array of numbers
 * @returns {number} - final frequency after changes
 */
async function solve1p1() {
  const inputData = await fetchPuzzleInput("1-1");
  return inputData.reduce((net, val) => {
    return net + val;
  }, 0);
}

/**
 * Day 1, part 2: Find the first frequency reached twice,
 * allowing repeated iterations.
 * (https://adventofcode.com/2018/day/1)
 * API input: array of numbers
 * @returns {number} - first frequency reached twice
 */
async function solve1p2() {
  const inputData = await fetchPuzzleInput("1-2");

  // const MAX_ITERATIONS = 150;
  // const frequencyMap = {};
  // let frequency = 0;
  // for (let i = 0; i < MAX_ITERATIONS; i++) {
  //   for (let j = 0; j < inputData.length; j++) {
  //     frequency += inputData[j];
  //     if (frequencyMap[frequency]) {
  //       return frequency;
  //     }
  //     frequencyMap[frequency] = true;
  //   }
  // }

  // function* findRepeatedFrequency(changes) {
  //   const frequencyMap = {};
  //   let frequency = 0;
  //   let idx = 0;
  //   while (true) {
  //     frequency += changes[idx % changes.length];
  //     if (frequencyMap[frequency]) {
  //       yield frequency;
  //       return;
  //     }
  //     frequencyMap[frequency] = true;
  //     yield ++idx;
  //   }
  // }
  // let f;
  // for (f of findRepeatedFrequency(inputData)) {
  // }
  // return f;

  /**
   * Produces Generator to change frequency indefinitely
   * @param {number[]} - list of frequency changes
   * @returns {Generator}
   */
  function* changeFrequency(changes) {
    let idx = 0;
    let frequency;
    while (true) {
      frequency = yield null;
      yield frequency + changes[idx++ % changes.length];
    }
  }

  const frequencyMap = {};
  let nextFrequency = 0;
  const it = changeFrequency(inputData);
  while (true) {
    it.next(); // returns null, tees up following next to assign value
    nextFrequency = it.next(nextFrequency).value;
    if (frequencyMap[nextFrequency]) {
      return nextFrequency;
    }
    frequencyMap[nextFrequency] = true;
  }
}

/**
 * Day 2, part 1: Make a checksum by summing the count of ids with
 * letters appearing 2 and 3 times.
 * (https://adventofcode.com/2018/day/2)
 * API input: array of strings (ids)
 * @returns {number} - checksum
 */
async function solve2p1() {
  const inputData = await fetchPuzzleInput("2-1");

  let globalTwoCount = 0,
    globalThreeCount = 0;

  for (let i = 0; i < inputData.length; i++) {
    const currentStr = inputData[i];
    const charCountMap = Array.from(currentStr).reduce((map, char) => {
      if (map[char] === undefined) {
        map[char] = 0;
      }
      return {
        ...map,
        [char]: map[char] + 1
      };
    }, {});
    const charCountList = Object.values(charCountMap);
    if (charCountList.includes(2)) {
      globalTwoCount++;
    }
    if (charCountList.includes(3)) {
      globalThreeCount++;
    }
  }

  return globalTwoCount * globalThreeCount;
}

/**
 * Day 2, part 2: There are two boxes whose IDs differ by exactly one character
 * at the same position in both strings. What letters are common between the two
 * matching IDs?
 * (https://adventofcode.com/2018/day/2)
 * API input: array of strings (ids)
 * @returns {string} - chars that are common between the two correct box IDs
 *                    (excluding the differing chars)
 */
async function solve2p2() {
  const inputData = await fetchPuzzleInput("2-2");
  const finalPos = inputData.length - 1;

  /**
   * Campares two arrays of strings (assume equal length) to find which indices
   * have differing values
   * @param {string[]} arr1 - first array of strings
   * @param {string[]} arr2 - second array of strings
   * @returns {number[]}    - list of indices where values differ between input arrays
   */
  function findDifferingIndices(arr1, arr2) {
    const differingIndices = [];
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        differingIndices.push(i);
      }
    }
    return differingIndices;
  }

  // O(n^2 / 2)
  for (let outerPos = 0; outerPos < finalPos; outerPos++) {
    const charListA = Array.from(inputData[outerPos]);
    for (let innerPos = outerPos + 1; innerPos <= finalPos; innerPos++) {
      const charListB = Array.from(inputData[innerPos]);
      // Skip if both arrays are not equal length (definitely not correct ones)
      if (charListA.length !== charListB.length) continue;
      const differingCharIndices = findDifferingIndices(charListA, charListB);
      if (differingCharIndices.length === 1) {
        // Found match, return the letters common between both
        return charListA
          .filter((char, idx) => idx !== differingCharIndices[0])
          .join("");
      }
    }
  }
  return "not found";
}

/**
 * Day 3, part 1: Given a 1,000 sq. in. fabric, and a list of claims with positions
 * within that fabric, find the number of sq. in. where 2+ claims overlap.
 * (https://adventofcode.com/2018/day/3)
 * API inputs: array of strings:
 *                      "#{id} @ {left offset},{right offset}: {width}x{height}"
 * @returns {number} - number of square inches of fabric with overlapping claims
 */
async function solve3p1() {
  const inputData = await fetchPuzzleInput("3-1");
}
