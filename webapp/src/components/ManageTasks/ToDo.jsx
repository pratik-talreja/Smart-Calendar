import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import Fab from "@material-ui/core/Fab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./ToDo.scss";

function ToDo(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [value, setValue] = React.useState(props.end);

  

  function handleExpanded() {
    if (isExpanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }

  const [note, setNote] = useState({
    id: props.id,
    title: props.title,
    description: props.description,
    priority: props.priority,
    end: props.end,
    category: props.category,
    complete:props.complete
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const [edit, editNote] = useState(false);
  const [noteCompleted, setCompleted] = useState(false);

  function handleClick() {
    props.onDelete(props.id);
  }

  function updateNote() {
    editNote(true);
  }

  function completeNote() {

    if (note.complete) {
      const temp = {...note};
      temp.complete = false;
      setNote(temp);
      props.onComplete(temp);
      
    } else {
      const temp = {...note};
      temp.complete = true;
      console.log("Inside SetState" + temp);
      setNote(temp);
      props.onComplete(temp);
      
    }
  }

  function submitEdit() {
    props.onEdit(note);
    editNote(false);
  }

  function cancelEdit() {
    editNote(false);
  }

  function renderEditView() {
    return (
      <div className="note editMode">
        <table>
        <tr>
          <td colSpan="3">
          <input
          className="editNoteTitle"
          name="title"
          placeholder={props.title}
          onChange={handleChange}
          value={note.title}
        ></input>
          </td>
        </tr>
        <tr>
          <td colSpan="2"> 
          <textarea
          className="editNoteContent"
          name="description"
          placeholder={props.description}
          onChange={handleChange}
          value={note.description}
        />
          </td>
        </tr>

        <tr>
          <td>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="Due Date"
                      value = {value}
                      className="duedate"
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </LocalizationProvider>
          </td>
          <td>
          <input
          placeholder="Priority"
          className="inputFields"
          type="number"
          name="priority"
          value={note.priority}
          onChange={handleChange}
        ></input>
          </td>
          <td>
            
          <input
          type="text"
          placeholder="Category"
          className="inputFields"
          name="category"
          value={note.category}
          onChange={handleChange}
        ></input>
          </td>
        </tr>



        </table>

        <Fab onClick={submitEdit}>
          <DoneIcon />
        </Fab>
        <Fab onClick={cancelEdit}>
          <CancelIcon />
        </Fab>
      </div>
    );
  }

  function renderDefaultView() {
    if (note.complete) {
      console.log("Here inside complete")
      return (
        <div className="note note-completed">
        <Fab onClick={completeNote} className="fab-button" aria-label="Done">
          <CheckCircleIcon />
        </Fab>

        <Fab onClick={handleClick}>
          <DeleteIcon />
        </Fab>

        <p onClick={handleExpanded}>{props.title}</p>
        {isExpanded && <p>{props.description}</p>}
        {isExpanded && <p>{props.end.toString().substring(0, 20)}</p>}
      </div>
      );
    }

    return (
      <div className="note">
      <Fab onClick={completeNote} className="fab-button" aria-label="Done">
        <CheckCircleIcon />
      </Fab>
      <Fab onClick={updateNote} className="fab-button" aria-label="Done">
        <EditIcon />
      </Fab>
      <Fab onClick={handleClick}>
        <DeleteIcon />
      </Fab>

      <p onClick={handleExpanded}>{props.title}</p>
      {isExpanded && <p>{props.description}</p>}
      {isExpanded && <p>{props.end}</p>}
    </div>
    );
  }

  return edit ?renderEditView() : renderDefaultView();
}

export default ToDo;
