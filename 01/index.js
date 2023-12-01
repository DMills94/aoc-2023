const { fileToArray, exampleToArray } = require("../helpers/input.js");

const example1 = exampleToArray(`
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`);

const input = fileToArray("./01/input.txt");

const findFirstAndLastDigitsP1 = (input) => {
  return input.map((line) => {
    const digits = line.match(/\d/g) || [];
    return digits[0] + digits[digits.length - 1];
  });
};

/** Part 1 */
console.log("Part 1");
console.log(
  `Example: ${findFirstAndLastDigitsP1(example1).reduce((a, b) => +a + +b, 0)}`
);
console.log(
  `Input: ${findFirstAndLastDigitsP1(input).reduce((a, b) => +a + +b, 0)}`
);

/** Part 2 */
const example2 = exampleToArray(`
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`);

const numbersAsStrings = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const findFirstAndListDigitsP2 = (input) => {
  return input.map((line) => {
    const digits = Array.from(
      line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g),
      (x) => x[1]
    );
    const first =
      digits[0].length > 1 ? numbersAsStrings.indexOf(digits[0]) : digits[0];
    const last =
      digits[digits.length - 1].length > 1
        ? numbersAsStrings.indexOf(digits[digits.length - 1])
        : digits[digits.length - 1];
    return `${first}${last}`;
  });
};

console.log("Part 2");
console.log(
  `Example: ${findFirstAndListDigitsP2(example2).reduce((a, b) => +a + +b, 0)}`
);
console.log(
  `Input: ${findFirstAndListDigitsP2(input).reduce((a, b) => +a + +b, 0)}`
);
