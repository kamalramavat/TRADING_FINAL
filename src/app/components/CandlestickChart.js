"use client"
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function CandlestickChart({ intradayData, historicalData, isHistorical, theme, toggleTheme, toggleData }) {
  const layout = {
    xaxis: {
      type: 'category',
      categoryorder: 'category ascending',
      tickformat: isHistorical ? '%Y-%m-%d' : '%H:%M',
    },
    yaxis: { title: 'Price' },
    title: isHistorical ? 'Historical Candlestick Chart' : 'Intraday Candlestick Chart',
    height: window.innerHeight,
    width: window.innerWidth,
    paper_bgcolor: theme === 'dark' ? 'black' : 'white',
    plot_bgcolor: theme === 'dark' ? 'black' : 'white',
  };

  const trace = {
    x: isHistorical
      ? historicalData.map((item) => item.date)
      : intradayData.map((item) => item.time),
    close: isHistorical
      ? historicalData.map((item) => item.close)
      : intradayData.map((item) => item.close),
    high: isHistorical
      ? historicalData.map((item) => item.high)
      : intradayData.map((item) => item.high),
    low: isHistorical
      ? historicalData.map((item) => item.low)
      : intradayData.map((item) => item.low),
    open: isHistorical
      ? historicalData.map((item) => item.open)
      : intradayData.map((item) => item.open),
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y',
    name: 'Candlesticks',
    showlegend: true,
  };

//   const handleMouseWheel = (e) => {
//     const { xaxis } = layout;
//     const { range } = xaxis;
//     const zoomFactor = 0.1;

//     if (e.deltaY < 0) {
//       // Zoom in
//       xaxis.range = range.map((val) => val + (val * zoomFactor));
//     } else {
//       // Zoom out
//       xaxis.range = range.map((val) => val - (val * zoomFactor));
//     }

//     Plot.update('chart', { layout });
//   };

  return (
    <div> 
              <div>
        <label>Theme: </label>
        <select value={theme} onChange={toggleTheme}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <label>Data Type: </label>
        <select
          value={isHistorical ? 'historical' : 'intraday'}
          onChange={(e) => toggleData(e.target.value)}
        >
          <option value="intraday">Intraday</option>
          <option value="historical">Historical</option>
        </select>
      </div>
      <Plot data={[trace]} layout={layout} config={{ displayModeBar: false }} />
    </div>
  );
}

export default CandlestickChart;
