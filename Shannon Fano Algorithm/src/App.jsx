import { useState } from "react";
import "./App.css";
import { MdSpaceBar } from "react-icons/md";
import { generateSymbols } from "./symbolsGenerator";
import shannonFano from "./shannonFano";

function App() {
  const [input, setInput] = useState("");
  const [dataToConvert, setDataToConvert] = useState(null);
  const [steps, setSteps] = useState([]);
  const [result, setResult] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedSymbols = generateSymbols(input);
    const symbolsCount =
      Object.entries(generatedSymbols)?.length || 0;
    setDataToConvert(generatedSymbols);
    const _steps = shannonFano(0, symbolsCount - 1, generatedSymbols);
    setSteps(_steps.steps);
    setResult(_steps.finalResult);
    console.log(_steps);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="input-container">
        <h2>Insert Your Text:</h2>
        <div>
          <input
            type="text"
            placeholder="enter data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="generate_btn" type="submit">
            Generate
          </button>
        </div>
      </form>
      {dataToConvert?.length > 0 && (
        <>
          <p className="title">Start Point (Sorted):</p>
          <div className="start-point-symbols">
            {Object.values(dataToConvert).map((s, index) => (
              <div className="symbol" key={index}>
                <span className="symbol-name">
                  {s.symbol === " " ? (
                    <MdSpaceBar
                      style={{
                        marginBottom: "-0.25rem",
                        scale: "1.35",
                      }}
                    />
                  ) : (
                    s.symbol
                  )}
                </span>

                <span className="symbol-probability">
                  {s.probability}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="steps">
        {steps?.map((step, index) => (
          <div className="step" key={index}>
            <p className="step-title">Step {index + 1}</p>
            <p>Start Index: {step.lowIndex}</p>
            <p>End Index: {step.highIndex}</p>
            <div className="step-symbols">
              {step.assignedCodes.map((assignedCode) => (
                <div className="symbol" key={assignedCode.symbol}>
                  <span className="symbol-name">
                    {assignedCode.symbol === " " ? (
                      <MdSpaceBar
                        style={{
                          marginBottom: "-0.25rem",
                          scale: "1.35",
                        }}
                      />
                    ) : (
                      assignedCode.symbol
                    )}
                  </span>
                  <span className="symbol-code">
                    {assignedCode.code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {result?.length > 0 && (
        <>
          <p className="title">Final Result:</p>
          <div className="start-point-symbols">
            {result.map((s, index) => (
              <div className="symbol" key={index}>
                <span className="symbol-name">
                  {s.symbol === " " ? (
                    <MdSpaceBar
                      style={{
                        marginBottom: "-0.25rem",
                        scale: "1.35",
                      }}
                    />
                  ) : (
                    s.symbol
                  )}
                </span>

                <span className="symbol-probability">{s.code}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
