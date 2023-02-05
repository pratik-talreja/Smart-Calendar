import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";

import "./create-area.scss";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [userInfo, setUserInfo] = useState({});


  const [note, setNote] = useState({
    title: "",
    description: "",
    priority: "",
    end: "",
    category: "",
    timeTaking: "",
    start: "",
  });
  const [value, setValue] = React.useState(moment());

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  // props.todo.todo = note;

  async function submitNote(event) {
    setNote({
      title: "",
      description: "",
      priority: "",
      end: value,
      category: "",
      timeTaking: "",
    });

    const emailIdval = userInfo.emailId;

    console.log("Inside Save Method", localStorage.getItem("emailId"));

    const a = await fetch("http://localhost:9000/addTask", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        emailId: localStorage.getItem("emailId"),
        todo: [
          {
            title: note.title,
            description: note.description,
            priority: note.priority,
            category: note.category.toLowerCase(),
            timeTaking: note.timeTaking,
            end: value,
            start: new Date(),
          },
        ],
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setExpanded(false);
    props.onAdd();
    event.preventDefault();
  }

  function expand() {
    if (isExpanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }

  return (
    <div>
      <div className="createarea-div">
        <form className="create-note" method="post" action="/addTask">
          <table>
            <tr>
              <td>
                {isExpanded && (
                  <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                    rows={isExpanded ? 1 : 1}
                  />
                )}
              </td>
              <td>
                {isExpanded && (
                  <input
                    type="number"
                    placeholder="Priority(1 - 10)"
                    name="priority"
                    value={note.priority}
                    onChange={handleChange}
                  ></input>
                )}
              </td>
            </tr>

            <tr>
              <td>
                <textarea
                  name="description"
                  onClick={expand}
                  onChange={handleChange}
                  value={note.description}
                  placeholder="Take a note..."
                  rows={isExpanded ? 1 : 1}
                />
              </td>
            </tr>
            <tr>
              <td>
                {isExpanded && (
                  <input
                    type="text"
                    placeholder="Add to Category"
                    name="category"
                    value={note.category}
                    onChange={handleChange}
                  ></input>
                )}
              </td>
              <td>
                {isExpanded && (
                  <input
                    type="number"
                    placeholder="Time in hrs to complete it"
                    name="timeTaking"
                    value={note.timeTaking}
                    onChange={handleChange}
                  ></input>
                )}
              </td>
            </tr>
            <tr>
              <td>
                {isExpanded && (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Due Date"
                      className="duedate"
                      value={value}
                      minDateTime={new Date() - 1}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
                )}
              </td>
            </tr>
          </table>

          {/* {isExpanded && (<input type="text" placeholder="End Time" name="end" value={note.end} onChange = {handleChange}></input>)} */}

          <Zoom in={isExpanded}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
    </div>
  );
}

export default CreateArea;
