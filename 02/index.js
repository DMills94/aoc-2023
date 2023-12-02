const { fileToArray, exampleToArray } = require("../helpers/input.js");
const sum = require("lodash/sum.js");

const input = fileToArray("./02/input.txt");

/** Part 1 */
const example = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

const maxR = 12;
const maxG = 13;
const maxB = 14;

const isGamePossible = (game) => {
  const sets = game.split("; ").map((set) => {
    let setStats = { red: 0, green: 0, blue: 0 };
    const cubesShown = set.split(", ");
    cubesShown.forEach((cube) => {
      const [amount, colour] = cube.split(" ");
      setStats[colour] = +amount;
    });
    return setStats;
  });
  const possibleSets = sets.filter(({ red, green, blue }) => {
    return red <= maxR && green <= maxG && blue <= maxB;
  });
  return possibleSets.length === sets.length;
};

const possibleGames = (input) => {
  const gameIds = [];
  input.forEach((game) => {
    const [gameName, gameSets] = game.split(": ");
    const id = gameName.split(" ")[1];
    if (isGamePossible(gameSets)) {
      gameIds.push(+id);
    }
  });
  return gameIds;
};

console.log("Part 1");
console.log(`Example: ${sum(possibleGames(exampleToArray(example)))}`);
console.log(`Input: ${sum(possibleGames(input))}`);

/** Part 2 */

const fewestRequiredCubes = (game) => {
  let cubes = { red: 0, green: 0, blue: 0 };
  game.split("; ").forEach((set) => {
    cubesShown = set.split(", ");
    cubesShown.forEach((cube) => {
      const [amount, colour] = cube.split(" ");
      if (cubes[colour] < +amount) cubes[colour] = +amount;
    });
  });
  return cubes;
};

const gamePowers = (input) => {
  const powers = [];
  input.forEach((game) => {
    const cubes = fewestRequiredCubes(game.split(": ")[1]);
    powers.push(cubes.red * cubes.green * cubes.blue);
  });
  return powers;
};

console.log("Part 2");
console.log(`Example: ${sum(gamePowers(exampleToArray(example)))}`);
console.log(`Example: ${sum(gamePowers(input))}`);
