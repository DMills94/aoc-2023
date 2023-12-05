const chunk = require("lodash/chunk.js");
const { fileToArray, exampleToArray } = require("../helpers/input.js");

const input = fileToArray("./05/input.txt", "\n\n");

/** Part 1 */
const example = exampleToArray(
  `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`,
  "\n\n"
);

const computeInstructions = (instructions) => {
  const maps = [];
  instructions.forEach((map) => {
    let checks = [];
    const [, ...values] = map.split("\n");
    values.forEach((set) => {
      const [destination, start, length] = set.split(" ").map((a) => +a);
      checks.push([start, length, destination]);
    });
    maps.push(checks);
  });
  return maps;
};

const calculateSeedLocation = (seedNum, instructions) => {
  let mapVal = seedNum;
  instructions.forEach((stage) => {
    for (let check of stage) {
      const [checkVal, length, endVal] = check;
      if (checkVal <= mapVal && mapVal < checkVal + length) {
        mapVal = endVal + mapVal - checkVal;
        break;
      }
    }
  });
  return mapVal;
};

const findLowestSeedLocation = ({ seeds, instructions }) => {
  let lowest = Number.MAX_SAFE_INTEGER;

  seeds.forEach((seed) => {
    const value = calculateSeedLocation(seed, instructions);
    if (value < lowest) lowest = value;
  });

  return lowest;
};

console.log("Part 1");
const getParamsP1 = (input) => {
  const seeds = input[0]
    .split(": ")[1]
    .split(" ")
    .map((a) => +a);
  const instructions = computeInstructions(input.slice(1));
  return {
    seeds,
    instructions,
  };
};
console.log(`Example: ${findLowestSeedLocation(getParamsP1(example))}`);
console.log(`Input: ${findLowestSeedLocation(getParamsP1(input))}`);

/** Part 2 */

const part2 = (input) => {
  const { seeds, instructions } = getParamsP1(input);
  const pairs = chunk(seeds, 2);
  let lowest = Number.MAX_SAFE_INTEGER;
  for (const seedRange of pairs) {
    const [start, length] = seedRange;
    for (let i = 0; i < length; i++) {
      const value = calculateSeedLocation(start + i, instructions);
      if (value < lowest) lowest = value;
    }
  }
  return lowest;
};

console.log("Part 2");
console.log(`Example: ${part2(example)}`);
console.log(`Input: ${part2(input)}`);
