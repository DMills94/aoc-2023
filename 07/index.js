const { fileToArray, exampleToArray } = require("../helpers/input.js");
const uniq = require("lodash/uniq.js");
const max = require("lodash/max.js");
const sum = require("lodash/sum.js");

const input = fileToArray("./07/input.txt");
const example = exampleToArray(`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`);

/** Part 1 */

const highCardOrderP1 = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const comboOrder = [
  {
    name: "5 of a kind",
    validator: (hand) => uniq(hand).length === 1,
    rank: 1,
  },
  {
    name: "4 of a kind",
    validator: (hand) =>
      uniq(hand).length === 2 &&
      max(
        hand
          .split("")
          .map((card) => hand.split("").filter((h) => h === card).length)
      ) === 4,
    rank: 2,
  },
  { name: "Full house", validator: (hand) => uniq(hand).length === 2, rank: 3 },
  {
    name: "Three of a kind",
    validator: (hand) =>
      uniq(hand).length === 3 &&
      max(
        hand
          .split("")
          .map((card) => hand.split("").filter((h) => h === card).length)
      ) === 3,
    rank: 4,
  },
  { name: "Two pair", validator: (hand) => uniq(hand).length === 3, rank: 5 },
  { name: "One pair", validator: (hand) => uniq(hand).length === 4, rank: 6 },
  { name: "High card", validator: (hand) => uniq(hand).length === 5, rank: 7 },
];

const rankHand = (handWithWager) => {
  const [hand, , jokerHand] = handWithWager.split(" ");
  let rankScore = 0;
  for (const { validator, rank } of comboOrder) {
    if (validator(jokerHand ?? hand)) {
      rankScore = rank;
      break;
    }
  }
  return rankScore;
};

// Returns difference in index of hand1 and hand2 characters
const compareHighCards = (hand1, hand2, highCardOrder) => {
  for (let i = 0; i < 5; i++) {
    if (hand1[i] === hand2[i]) continue;
    return highCardOrder.indexOf(hand1[i]) - highCardOrder.indexOf(hand2[i]);
  }
};

const rankHands = (hands, highCardOrder) => {
  return hands.sort((a, b) => {
    const hand1Rank = rankHand(a);
    const hand2Rank = rankHand(b);
    if (hand1Rank === hand2Rank) {
      return compareHighCards(a, b, highCardOrder);
    } else {
      return rankHand(a) - rankHand(b);
    }
  });
};

const part1 = (hands, highCardOrder) => {
  const sortedHands = rankHands(hands, highCardOrder).map((string, i) => {
    const [hand, wager] = string.split(" ");
    return { hand, wager: +wager, rank: hands.length - i };
  });
  const totalWinnings = sum(sortedHands.map(({ rank, wager }) => rank * wager));
  return totalWinnings;
};

console.log("Part 1");
console.log(`Example: ${part1(example, highCardOrderP1)}`);
console.log(`Input: ${part1(input, highCardOrderP1)}`);

/** Part 2 */

const highCardOrderP2 = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const part2 = (hands) => {
  const jokerHands = hands.map((string) => {
    const [hand, wager] = string.split(" ");
    const chars = uniq(hand);
    let newHandString = `${hand} ${wager}`;
    if (chars.includes("J")) {
      let bestCombo = Number.MAX_SAFE_INTEGER;
      let jokerHand = "";
      for (const char of chars) {
        const updatedHand = hand.replaceAll("J", char);
        const updatedHandRank = rankHand(updatedHand);

        if (updatedHandRank < bestCombo) {
          bestCombo = updatedHandRank;
          jokerHand = updatedHand;
        }
      }

      newHandString += ` ${jokerHand}`;
    }

    return newHandString;
  });

  return part1(jokerHands, highCardOrderP2);
};

console.log("Part 2");
console.log(`Example: ${part2(example)}`);
console.log(`Input: ${part2(input)}`);
