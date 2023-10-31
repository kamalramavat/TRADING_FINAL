"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

  
function CandlestickChart({ data }) {
  const trace = {
    x: data.map((item) => item.date),
    close: data.map((item) => item.close),
    high: data.map((item) => item.high),
    low: data.map((item) => item.low),
    open: data.map((item) => item.open),
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y',
    name: 'Candlesticks',
    showlegend: true,
  };

  return (
    <div>
      <h1>Candlestick Chart</h1>
      <Plot
        data={[trace]}
        layout={{
          xaxis: { type: 'category', categoryorder: 'category ascending' },
          yaxis: { title: 'Price' },
          title: 'Candlestick Chart',
          height: window.innerHeight,
          width: window.innerWidth,
        }}
        
      />
    </div>
  );
}

function HomePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://vaistrastockapi.up.railway.app/stock/historicalCandle?instrumentKey=NSE_INDEX%7CNifty%20Bank&interval=30minute&toDate=2023-10-19&fromDate=2023-10-17')
      .then((response) => {
        const data = response.data.data; // Adjust this based on your actual data structure
        console.log(response.data); // Check the structure of the data

        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  

    return (
        <div>
          <h1>Candlestick Chart</h1>
          {Array.isArray(data) && data.length > 0 ? (
            <CandlestickChart data={data} />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      );
  
}

export default HomePage;