import { useState } from "react";
import "./App.css";
import ShannonFanoVisualization from "./ShannonFanoVisualization";
import { generateSymbols } from "./symbolsGenerator";

function App() {
  const [input, setInput] = useState("");
  const [dataToConvert, setDataToConvert] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedSymbols = generateSymbols(input);
    setDataToConvert(generatedSymbols);
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
      {dataToConvert && (
        <ShannonFanoVisualization dataToCompress={dataToConvert} />
      )}
    </div>
  );
}

export default App;
