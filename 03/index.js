const sumBy = require("lodash/sumBy.js");
const sum = require("lodash/sum.js");
const { fileToArray, exampleToArray } = require("../helpers/input.js");
const { vectors } = require("../helpers/common.js");

const input = fileToArray("./03/input.txt");

/** Part 1 */
const example = exampleToArray(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`);

const identifyParts = (grid) => {
  let parts = [];
  let activeNumberStr = "";
  let isAdjacentSymbol = false;
  let symbol = undefined;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const char = grid[y][x];
      const isDigit = /\d/.test(char);
      if (isDigit) {
        activeNumberStr += char;
        for (const vector of vectors.all) {
          const adjacentChar = grid[y + vector[1]] && grid[y + vector[1]][x + vector[0]];
          if (adjacentChar) {
            const isSymbol = !/[a-z0-9.]/.test(adjacentChar);
            if (isSymbol) {
              isAdjacentSymbol = true;
              symbol = { symbol: adjacentChar, coords: `${y + vector[1]},${x + vector[0]}` };
            }
          }
        }
      } else {
        if (!activeNumberStr) continue;
        parts.push({
          number: +activeNumberStr,
          isPart: isAdjacentSymbol,
          symbol,
        });
        activeNumberStr = "";
        isAdjacentSymbol = false;
        symbol = undefined;
      }
    }
    if (activeNumberStr) {
      parts.push({
        number: +activeNumberStr,
        isPart: isAdjacentSymbol,
        symbol,
      });
    }
    activeNumberStr = "";
    isAdjacentSymbol = false;
    symbol = undefined;
  }
  return parts.filter((part) => part.isPart);
};

console.log("Part 1");
console.log(`Example: ${sumBy(identifyParts(example), (p) => p.number)}`);
console.log(`Input: ${sumBy(identifyParts(input), (p) => p.number)}`);

/** Part 2 */

const calcGearSum = (grid) => {
  const partsWithAsterisks = identifyParts(grid).filter((part) => part.symbol?.symbol === "*");
  const gears = {};
  partsWithAsterisks.forEach((part) => {
    const partsUsingSymbol = partsWithAsterisks.filter((p) => p.symbol.coords === part.symbol.coords);
    if (partsUsingSymbol.length === 2) gears[part.symbol.coords] = [...partsUsingSymbol.map((part) => part.number)];
  });

  return sum(Object.values(gears).map(([p1, p2]) => p1 * p2));
};

console.log("Part 2");
console.log(`Example: ${calcGearSum(example)}`);
console.log(`Input: ${calcGearSum(input)}`);
