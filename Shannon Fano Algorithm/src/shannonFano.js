export default function shannonFano(
  lowIndex,
  highIndex,
  symbolList,
  steps = []
) {
  let cumulativeProb1 = 0,
    cumulativeProb2 = 0;
  let difference1 = 0,
    difference2 = 0;
  let splitPoint, i, j;

  // Base case: if the segment is too small to split
  if (
    lowIndex + 1 === highIndex ||
    lowIndex === highIndex ||
    lowIndex > highIndex
  ) {
    if (lowIndex === highIndex || lowIndex > highIndex) return;

    // Assign binary codes for two symbols
    symbolList[highIndex].code[++symbolList[highIndex].codeIndex] = 0;
    symbolList[lowIndex].code[++symbolList[lowIndex].codeIndex] = 1;

    // Log the step
    steps.push({
      action: "Base case",
      lowIndex,
      highIndex,
      splitPoint: null,
      assignedCodes: [
        {
          symbol: symbolList[lowIndex].symbol,
          code: symbolList[lowIndex].code.slice(),
        },
        {
          symbol: symbolList[highIndex].symbol,
          code: symbolList[highIndex].code.slice(),
        },
      ],
    });

    return;
  } else {
    // Calculate the cumulative probabilities for the segments
    for (i = lowIndex; i <= highIndex - 1; i++)
      cumulativeProb1 += symbolList[i].probability;
    cumulativeProb2 += symbolList[highIndex].probability;
    difference1 = Math.abs(cumulativeProb1 - cumulativeProb2);

    j = 2;
    while (j !== highIndex - lowIndex + 1) {
      splitPoint = highIndex - j;
      cumulativeProb1 = cumulativeProb2 = 0;

      for (i = lowIndex; i <= splitPoint; i++)
        cumulativeProb1 += symbolList[i].probability;
      for (i = highIndex; i > splitPoint; i--)
        cumulativeProb2 += symbolList[i].probability;

      difference2 = Math.abs(cumulativeProb1 - cumulativeProb2);

      if (difference2 >= difference1) break;

      difference1 = difference2;
      j++;
    }

    splitPoint++;
    for (i = lowIndex; i <= splitPoint; i++)
      symbolList[i].code[++symbolList[i].codeIndex] = 1;
    for (i = splitPoint + 1; i <= highIndex; i++)
      symbolList[i].code[++symbolList[i].codeIndex] = 0;

    // Log the step
    steps.push({
      action: "Split and assign codes",
      lowIndex,
      highIndex,
      splitPoint,
      assignedCodes: symbolList
        .slice(lowIndex, highIndex + 1)
        .map((symbol) => ({
          symbol: symbol.symbol,
          code: symbol.code.slice(),
        })),
    });

    // Recursively apply Shannon-Fano on the two segments
    shannonFano(lowIndex, splitPoint, symbolList, steps);
    shannonFano(splitPoint + 1, highIndex, symbolList, steps);
  }

  // Return the steps and the final symbol list
  return {
    steps,
    finalResult: symbolList.map((symbol) => ({
      symbol: symbol.symbol,
      code: symbol.code.join(""),
    })),
  };
}
