import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Counter.scss";

const Counter = ({ habit }) => {
  const history = useNavigate();
  const [h, setHabit] = useState(habit.count);

  // const handleChange = (e) => {
  //     return h.count = e.target.value;

  // };

  const onPlusButtonClick = (e) => {
    e.preventDefault();

    setHabit(h + 1);

    callPutPlus(h);
  };

  async function callPutPlus(count) {
    habit.count = count + 1;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habit),
    };

    await fetch("http://localhost:9000/habits/" + habit.id, requestOptions)
      .then((response) => response.json())
      .then((res) => {})
      .catch((error) => {
        console.log("error", error);
        alert("Insert correct data " + h.count);
        history("/donna/habits");
      });
  }

  const onMinusButtonClick = (e) => {
    e.preventDefault();

    if (h > 0) {
      setHabit(h - 1);
    }

    callPutMinus(h);
  };

  async function callPutMinus(count) {
    habit.count = count - 1;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habit),
    };

    await fetch("http://localhost:9000/habits/" + habit.id, requestOptions)
      .then((response) => response.json())
      .then((res) => {})
      .catch((error) => {
        console.log("error", error);
        alert("Insert correct data " + h.count);
        history("/donna/habits");
      });
  }

  return (
    <div class="counter">
      <button type="submit" class="btn" onClick={(e) => onMinusButtonClick(e)}>
        -
      </button>
      {h}
      {/* <input type="number" defaultValue={h.count} onChange={(e) => handleChange(e)} /> */}
      <button type="submit" class="btn" onClick={(e) => onPlusButtonClick(e)}>
        +
      </button>
    </div>
  );
};

export default Counter;
