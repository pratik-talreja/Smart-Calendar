import React, { useEffect, useState } from "react";
import "./left-panel.scss";
import moment from "moment";

function LeftPanel(props) {
  const categorySet = new Set();
  props.todo &&
    props.todo &&
    props.todo.todo &&
    props.todo.todo.map((todo) => {
      categorySet.add(todo.category);
    });

  const catArray = [...categorySet];

  function submitCategory(event) {
    event.preventDefault();
    props.onCategorySelect(event.target.value);
  }

  function submitTime(event) {
    if (event.target.value == "Today") {
      let dateFormat = moment().format("YYYY-MM-DD");
      let Today = moment(dateFormat + "T23:59:00").format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      props.onTimeSelect(Today);
    } else {
      let dateFormat = moment().format("YYYY-MM-DD");
      let Today = moment(dateFormat + "T23:59:00").format(
        "YYYY-MM-DDTHH:mm:ss"
      );
      let date = moment(Today).add(7, "days");
      let next7Days = moment(date).format("YYYY-MM-DDTHH:mm:ss");
      props.onTimeSelect(next7Days);
    }
  }

  return (
    <div>
      <button className="leftpanel-button" onClick={submitCategory}>
        All
      </button>
      <hr />
      <hr />
      <br />
      <button className="leftpanel-button" onClick={submitTime} value="Today">
        Today
      </button>
      <button className="leftpanel-button" onClick={submitTime} value="Next">
        Next 7 Days
      </button>
      <hr />
      <hr />
      <br />
      {catArray.map((category) => {
        if (category != "")
          return (
            <button
              className="leftpanel-button"
              onClick={submitCategory}
              value={category}
            >
              {category[0].toUpperCase() + category.substring(1)}
            </button>
          );
      })}
    </div>
  );
}

export default LeftPanel;
