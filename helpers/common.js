const upVectors = [
  [0, 1],
  [1, 1],
  [-1, 1],
];
const downVectors = [
  [0, -1],
  [1, -1],
  [-1, -1],
];
const leftVector = [-1, 0];
const rightVector = [1, 0];

const diagonalVectors = [...upVectors, ...downVectors, leftVector, rightVector];

const crossVectors = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
];

const vectors = {
  up: upVectors,
  down: downVectors,
  left: leftVector,
  right: rightVector,
  cross: crossVectors,
  all: diagonalVectors
}

module.exports = { vectors };
