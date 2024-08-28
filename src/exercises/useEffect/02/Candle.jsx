import React, { useEffect, useState } from 'react'
import './style.css';

export default function Candle() {
    const [height, setHeight] = useState(80);

    useEffect(() => {
      const decreaseHeight = () => {
        setHeight(prevHeight => {
          if (prevHeight <= 10) {
            return 80;
          }
          return prevHeight - 1;
        });
      };
  
      const intervalId = setInterval(decreaseHeight, 2000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="exercise">
        <div className="candleContainer" style={{ height: `${height}%` }}>
          <div className="candle">
            <div className="flame">
              <div className="shadows" />
              <div className="top" />
              <div className="middle" />
              <div className="bottom" />
            </div>
            <div className="wick" />
            <div className="wax" />
          </div>
        </div>
      </div>
    );
}
