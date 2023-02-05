import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddHabits from "./AddHabits/AddHabits";
import Navbar from "../Navbar";
import HabitsList from "./HabitsList/HabitsList";

function Habits() {
  const history = useNavigate();

  const [habit, setHabit] = useState({});

  const addHabit = useCallback((newHabit) => {
    setHabit(newHabit);
    fetch("http://localhost:9000/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHabit),
    })
      .then((response) => response.json())
      .then((data) => {
        history("/donna/habits");
      })
      .catch((error) => {
        console.log("error", error);
        alert("Insert correct data");
        history("/donna/habits");
      });
  }, []);





  return (
    <div class="habits-container">
      <Navbar />
      <div class="cols">
        <div class="col">
          <AddHabits addHabitHandler={addHabit} />
        </div>
        <div class="col">
          <HabitsList newHabit={habit} key={habit.id} />
        </div>
      </div>
    </div>
  );
}

export default Habits;
