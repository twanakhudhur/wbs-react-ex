import React from "react";

export default function Counter({ count, onIncrement, onDecrement }) {
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
}
