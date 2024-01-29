import React, { useEffect, useState } from "react";
import { NewGasRecord } from "./NewGasRecord";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

function App() {
  const [gasRecs, setGasRecs] = useState(() => {
    const localValue = localStorage.getItem("Gas");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("Gas", JSON.stringify(gasRecs));
  }, [gasRecs]);

  function addGas(date, title, price) {
    setGasRecs((currentGas) => [...currentGas, { id: uuidv4(),date, title, price }]);
  }

  function deleteGas(id) {
    setGasRecs((currentGas) => currentGas.filter((gas) => gas.id !== id));
  }

  return (
    <>
      <NewGasRecord onSubmit={addGas} />
      <h2 className="">Records</h2>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Lit</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {gasRecs.map((gas) => (
            <tr key={gas.id}>
              <td>{gas.date}</td>
              <td>{gas.title}</td>
              <td>${gas.price}</td>
              <button
                //Pass a function, if no () is pass a result
                onClick={() => deleteGas(gas.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
