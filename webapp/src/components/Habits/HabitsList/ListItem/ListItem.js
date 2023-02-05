import React, { useState } from "react";
import "./ListItem.scss";
import Counter from "./Counter/Counter";

import DeleteIcon from '@mui/icons-material/Delete';



const ListItem = ({ habit, onDeleteClick }) => {


  return (
    <div
      class="habit"
      id={habit.id}
      style={{
        backgroundColor: habit.color,
      }}
    >
      {habit.name}
      <button type="button" class="delete" onClick={(() => onDeleteClick(habit))}><DeleteIcon /></button>
      <Counter habit={habit} key={habit.id} />
    </div>
  );
};

export default ListItem;
