/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { MdOutlineSpaceBar } from "react-icons/md";

const ShannonFanoVisualization = ({ dataToCompress }) => {
  const initialSymbols = dataToCompress;
  const [symbols, setSymbols] = useState(dataToCompress);

  // Function to perform Shannon-Fano partitioning and code assignment
  const performShannonFano = () => {
    // Sort symbols by probability in descending order
    let sortedSymbols = [...symbols];
    sortedSymbols.sort((a, b) => b.probability - a.probability);

    // Recursive function to assign codes
    const assignCodes = (symbolsToAssign, start, end, code) => {
      if (start === end) {
        symbolsToAssign[start].code = code;
      } else {
        let total = symbolsToAssign.reduce((sum, symbol, index) => {
          if (index >= start && index <= end) return sum + symbol.probability;
          else return sum;
        }, 0);

        let currentSum = 0;
        let splitIndex = start;

        while (currentSum <= total / 2 && splitIndex < end) {
          currentSum += symbolsToAssign[splitIndex].probability;
          splitIndex++;
        }

        // Assign codes recursively
        assignCodes(symbolsToAssign, start, splitIndex - 1, code + "0");
        assignCodes(symbolsToAssign, splitIndex, end, code + "1");
      }
    };

    // Assign codes to sorted symbols
    assignCodes(sortedSymbols, 0, sortedSymbols.length - 1, "");

    // Update symbols state to trigger animation
    setSymbols(sortedSymbols);
  };

  useEffect(() => {
    resetSymbols();
  }, [dataToCompress]);
  // Function to reset symbols to initial state
  const resetSymbols = () => {
    setSymbols(initialSymbols.map((symbol) => ({ ...symbol, code: "" })));
  };

  // Render the visualization
  return (
    <div className="shannon-fano-container">
      <h2>Shannon-Fano Algorithm Visualization</h2>
      <div className="button-container">
        <button onClick={performShannonFano}>Start Visualization</button>
        <button onClick={resetSymbols}>Reset</button>
      </div>
      <h3>Result:</h3>
      <div className="symbol-container">
        <div className="symbol">
          <div className="symbol-name">Symbol</div>
          <div className="symbol-name">Frequency</div>
          <div className="symbol-name">Code</div>
        </div>
        {symbols.map((symbolData, index) => (
          <div key={index} className="symbol">
            <div className="symbol-name">
              {symbolData.symbol === " " ? (
                <MdOutlineSpaceBar size={20} />
              ) : (
                symbolData.symbol
              )}
            </div>
            <div className="symbol-probability">{symbolData.probability}</div>
            <div className="symbol-code">{symbolData.code}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShannonFanoVisualization;
