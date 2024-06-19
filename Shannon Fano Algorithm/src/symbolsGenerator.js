// Function to count frequencies of characters in the input string
const countFrequencies = (str) => {
  const freqMap = new Map();
  for (let char of str) {
    if (freqMap.has(char)) {
      freqMap.set(char, freqMap.get(char) + 1);
    } else {
      freqMap.set(char, 1);
    }
  }
  return freqMap;
};

// Generate symbols array from input string
export const generateSymbols = (str) => {
  const freqMap = countFrequencies(str);
  const symbols = [];

  // Convert frequency map to symbols array
  freqMap.forEach((frequency, symbol) => {
    symbols.push({
      symbol,
      probability: frequency,
      code: [],
      codeIndex: -1,
    });
  });

  return symbols.sort((a, b) => a.probability - b.probability);
};
