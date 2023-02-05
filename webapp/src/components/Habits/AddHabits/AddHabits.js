import React, { useState } from "react";
import "./AddHabits.scss";
import { v4 as uuid } from "uuid";

const AddHabits = ({ addHabitHandler }) => {
  const [habit, setHabitValues] = useState({
    userId: "",
    name: "",
    color: "",
    count: 0,
    type: "",
    id: "",
  });

  const handleChange = (e, fieldName) => {
    setHabitValues((prev) => {
      return { ...prev, [fieldName]: e.target.value };
    });
  };

  const onAddButtonClick = (e) => {
    e.preventDefault();

    // Post data to db
    habit.count = 0;
    habit.id = uuid();
    habit.userId = localStorage.getItem("userId");

    if (habit.color === "-") {
      habit.color = "#ede9f7";
    }
    if (habit.color === "red") {
      habit.color = "#ff9999";
    }
    if (habit.color === "orange") {
      habit.color = "#ffc299";
    }
    if (habit.color === "yellow") {
      habit.color = "#ffeb99";
    }
    if (habit.color === "green") {
      habit.color = "#adebad";
    }

    addHabitHandler(habit);

    setHabitValues(() => {
      return {
        userId: "",
        name: "",
        color: "",
        count: 0,
        type: "",
        id: "",
      };
    });
  };

  return (
    <div className="sidebar">
      <form className="addHabitForm">
        <table>
          <caption>
            <h3>Add Habit:</h3>
          </caption>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>
                <input
                  type="text"
                  name="name"
                  value={habit.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </td>
            </tr>
            <tr>
              <th>Color:</th>
              <td>
                <select
                  name="color"
                  id="color"
                  onChange={(e) => handleChange(e, "color")}
                  value={habit.color}
                >
                  <option value="-">-</option>
                  <option value="red">Red</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Type:</th>
              <td>
                <input
                  type="radio"
                  name="type"
                  value="good"
                  onChange={(e) => handleChange(e, "type")}
                />
                <label>Good</label>
                <input
                  type="radio"
                  name="type"
                  value="bad"
                  onChange={(e) => handleChange(e, "type")}
                />
                <label>Bad</label>
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          onClick={(e) => onAddButtonClick(e)}
          className="addHabitButton"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddHabits;
