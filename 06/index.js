const { fileToArray, exampleToArray } = require("../helpers/input.js");

/** Input
Time:        60     80     86     76
Distance:   601   1163   1559   1300
 */
const inputp1 = [
  { time: 60, distance: 601 },
  { time: 80, distance: 1163 },
  { time: 86, distance: 1559 },
  { time: 76, distance: 1300 },
];

/** Example
Time:      7  15   30
Distance:  9  40  200
*/
const examplep1 = [
  { time: 7, distance: 9 },
  { time: 15, distance: 40 },
  { time: 30, distance: 200 },
];

/** Part 1 */

const waysToWin = (races) => {
  const winCounts = [];
  for (const race of races) {
    let winCount = 0;
    const { time, distance } = race;
    let hasWon = false;
    for (let i = 0; i < time; i++) {
      const boatInitialSpeed = i;
      const distanceMoved = (time - i) * boatInitialSpeed;
      if (distanceMoved > distance) {
        winCount++;
        hasWon = true;
      } else if (hasWon && distanceMoved <= distance) {
        break;
      }
    }

    winCounts.push(winCount);
  }

  console.log(winCounts);
  return winCounts.reduce((a, b) => a * b, 1);
};

console.log("Part 1");
console.log(`Example: ${waysToWin(examplep1)}`);
console.log(`Input: ${waysToWin(inputp1)}`);

/** Part 2 */

const examplep2 = [{ time: 71530, distance: 940200 }];
const inputp2 = [{ time: 60808676, distance: 601116315591300 }];

console.log("Part 2");
console.log(`Example: ${waysToWin(examplep2)}`);
console.log(`Input: ${waysToWin(inputp2)}`);
