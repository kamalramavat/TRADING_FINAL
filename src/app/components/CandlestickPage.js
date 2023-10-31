"use client"
import React, { useState, useEffect } from 'react';
import CandlestickChart from '../components/CandlestickChart';

function CandlestickPage() {
  const [intradayData, setIntradayData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [isHistorical, setIsHistorical] = useState(false);

  useEffect(() => {
    // Fetch your intraday and historical data here and set them in the state
    const fetchIntradayData = async () => {
      try {
        // Replace with your data fetching logic for intraday data
        const response = await fetch('https://vaistrastockapi.up.railway.app/stock/candle?instrumentKey=NSE_INDEX%7CNifty%20Bank&interval=30minute');
        const result = await response.json();
        setIntradayData(result.data);
      } catch (error) {
        console.error('Error fetching intraday data:', error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        // Replace with your data fetching logic for historical data
        const response = await fetch('https://vaistrastockapi.up.railway.app/stock/historicalCandle?instrumentKey=NSE_INDEX%7CNifty%20Bank&interval=30minute&toDate=2023-10-19&fromDate=2023-10-18');
        const result = await response.json();
        setHistoricalData(result.data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchIntradayData();
    fetchHistoricalData();
  }, []);

  const toggleTheme = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
  };

  const toggleData = (dataType) => {
    setIsHistorical(dataType === 'historical');
  };

  return (
    <div>
      {Array.isArray(intradayData) && Array.isArray(historicalData) ? (
        <CandlestickChart
          intradayData={intradayData}
          historicalData={historicalData}
          isHistorical={isHistorical}
          theme={theme}
          toggleTheme={toggleTheme}
          toggleData={toggleData}
        />
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default CandlestickPage;
