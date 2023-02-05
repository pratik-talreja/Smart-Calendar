
import React, { useState, useEffect } from "react";

import "./HabitsList.scss";
import ListItem from "./ListItem/ListItem";
import { useNavigate } from "react-router-dom";

const HabitsList = (props) => {
  const history = useNavigate();
  const [itemList, setItemList] = useState({
    habits: [],
  });

  const deleteHabit = (habit) => {
    fetch("http://localhost:9000/habits/" + habit.id, { method: 'DELETE' });

    setItemList({
      habits: []
    });

    fetch("http://localhost:9000/habits/" + userId)
      .then((res) => res.json())
      .then((res) => {
        setItemList({
          habits: res,
        });
        console.log(itemList);
        history("/donna/habits");
      })
      .catch((error) => {
        console.log("error...." + error);
      });
  }

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:9000/habits/" + userId)
      .then((res) => res.json())
      .then((res) => {
        setItemList({
          habits: res,
        });
      })
      .catch((error) => {
        console.log("error...." + error);
      });



  }, [deleteHabit]);









  return (
    <div class="list">
      {itemList &&
        itemList.habits &&
        itemList.habits.length > 0 &&
        itemList.habits.map((val) => {
          return (
            <ListItem
              habit={val}
              key={val.id}
              onDeleteClick={deleteHabit}
            />
          );
        })}
    </div>
  );
};

export default HabitsList;
