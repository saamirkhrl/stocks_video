import React, { useState } from "react";

function App() {
  const [stock, setStock] = useState("");
  const [data, setData] = useState(null);

  const getStockData = async () => {
    const result = await fetch(
      `https://api.api-ninjas.com/v1/stockprice?ticker=${stock.toUpperCase()}`,
      {
        headers: { "X-Api-Key": "HawSurTjdFYh2inEuSN8HzeDA9AQDy6OCvRh4s1h" },
      }
    );

    const data = await result.json();
    setData(data);
  };

  const convertUnix = (unix_time) => {
    const date = new Date(unix_time * 1000);

    return `${date.toLocaleDateString("en-US")} @ ${date.toLocaleTimeString()}`;
  };

  return (
    <div>
      <h2>Stocks Searcher</h2>
      <input
        onChange={(e) => {
          setStock(e.target.value);
        }}
        data={stock}
        type="text"
        placeholder="Enter ticker symbol"
      />
      {data ? (
        <div>
          <h2>{data.name}</h2>
          <h2>{data.ticker}</h2>
          <h2>${data.price}</h2>
          <h2>{convertUnix(data.updated)}</h2>
        </div>
      ) : null}
      <button onClick={getStockData}>Search</button>
    </div>
  );
}

export default App;
