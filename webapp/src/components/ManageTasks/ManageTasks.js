import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import FullCalendar, { CalendarApi } from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridDay from "@fullcalendar/timegrid";
import timeGridWeek from "@fullcalendar/timegrid";
import Clock from "react-clock";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import "./managed-tasks.scss";

const ManageTasks = (props) => {
  const [todos, setTodos] = useState([]);
  const [categoryValue, setCategoryValue] = useState();
  const [categorySelect, setCategorySelect] = useState(false);
  const [timeValue, setTimeValue] = useState();
  const [timeValueSelected, setSelectedTime] = useState(false);

  function updateList() {
    const userId = localStorage.getItem("userId");

    // Simple POST request with a JSON body using fetch for Login
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    };

    fetch("http://localhost:9000/getTasks", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  useEffect(function () {
    updateList();
  }, []);

  async function categorySelected(value) {
    if (value != "") {
      await setCategoryValue(value);
      await setCategorySelect(true);
    } else {
      setCategorySelect(false);
      setSelectedTime(false);
    }
  }

  function TimeSelected(value) {
    setCategorySelect(false);
    setTimeValue(value);
    setSelectedTime(true);
  }

  return (
    <div className="columns">
      <Navbar></Navbar>
      <div className="column-left">
        <LeftPanel
          todo={todos}
          updateList={updateList}
          onCategorySelect={categorySelected}
          onTimeSelect={TimeSelected}
        />
      </div>
      <div className="column-right">
        <RightPanel
          updateList={updateList}
          todo={todos}
          Categoryvalue={categoryValue}
          isTimeSelected={timeValueSelected}
          timeSelect={timeValue}
          categorySelect={categorySelect}
        />
      </div>
    </div>
  );
};

export default ManageTasks;
