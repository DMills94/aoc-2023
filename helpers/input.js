const fs = require("fs");

const exampleToArray = (string, separator = "\n") => {
  return string.split(separator).filter(Boolean);
};

const fileToArray = (filePath, separator = "\n") => {
  return fs.readFileSync(filePath, "utf-8").split(separator).filter(Boolean);
};

module.exports = { exampleToArray, fileToArray };
