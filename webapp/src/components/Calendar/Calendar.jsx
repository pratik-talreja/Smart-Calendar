import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridDay from "@fullcalendar/timegrid";
import timeGridWeek from "@fullcalendar/timegrid";

function Calendar() {
  const calendarRef = useRef();
  var calendarApi = null;
  let arrays = [];

  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState(false);

  async function getTodos() {
    calendarApi = calendarRef.current.getApi();
    const userId = localStorage.getItem("userId");
    // Simple POST request with a JSON body using fetch for Login
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    };

    todos.map((todo) => []);

    await fetch("http://localhost:9000/getTasks", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);

        if (!render) {
          data &&
            data.todo &&
            data.todo.map((todo) => {
              calendarApi.addEvent(todo);
              setRender(true);
            });
        }
      })

      .catch((error) => {
        console.log("error", error);
      });
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <Navbar />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridDay, timeGridWeek]}
        initialView="dayGridWeek"
        ref={calendarRef}
        height="auto"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,dayGridWeek",
        }}
        selectable={true}
      />
    </div>
  );
}

export default Calendar;
