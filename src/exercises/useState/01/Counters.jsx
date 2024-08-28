import React, { useState } from "react";
import Counter from "./Counter";
import "./style.css";

export default function Counters() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  return (
    <div className="app">
      <Counter
        count={count1}
        onIncrement={() => setCount1(count1 + 1)}
        onDecrement={() => setCount1(count1 - 1)}
      />
      <Counter
        count={count2}
        onIncrement={() => setCount2(count2 + 1)}
        onDecrement={() => setCount2(count2 - 1)}
      />
      <Counter
        count={count3}
        onIncrement={() => setCount3(count3 + 1)}
        onDecrement={() => setCount3(count3 - 1)}
      />
    </div>
  );
}
