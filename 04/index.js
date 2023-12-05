const { sum } = require("lodash");
const { fileToArray, exampleToArray } = require("../helpers/input.js");

const input = fileToArray("./04/input.txt");

/** Part 1 */
const example = exampleToArray(`
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`);

const parseCard = (line) => {
  const [cardInfo, numbers] = line.split(": ");
  const [, id] = cardInfo.split(/\s+/);
  const winningNums = numbers
    .split(" | ")[0]
    .split(" ")
    .filter(Boolean)
    .map((num) => +num);
  const cardNums = numbers
    .split(" | ")[1]
    .split(" ")
    .filter(Boolean)
    .map((num) => +num);
  let matches = 0;

  for (const num of cardNums) {
    if (winningNums.includes(num)) matches++;
  }

  return {
    id: +id,
    winningNums,
    cardNums,
    matches,
  };
};

const sumScratchCards = (cards) => {
  let allCardsTotal = 0;
  cards.forEach((card) => {
    const parsedCard = parseCard(card);
    allCardsTotal += parsedCard.matches ? Math.pow(2, parsedCard.matches - 1) : 0;
  });
  return allCardsTotal;
};

console.log("Part 1");
console.log(`Example: ${sumScratchCards(example)}`);
console.log(`Input: ${sumScratchCards(input)}`);

/** Part 2 */

const countFinalCardTotals = (cards) => {
  const counts = {};
  cards.forEach((card) => {
    const cardDetails = parseCard(card);
    counts[cardDetails.id] = 1;
  });

  cards.forEach((card) => {
    const cardDetails = parseCard(card);
    for (let i = 0; i < cardDetails.matches; i++) {
      counts[cardDetails.id + i + 1] += counts[cardDetails.id];
    }
  });

  return sum(Object.values(counts));
};

console.log("Part 2");
console.log(`Example: ${countFinalCardTotals(example)}`);
console.log(`Input: ${countFinalCardTotals(input)}`);
