import React, { useEffect, useState } from "react";
import CreateArea from "./CreateArea";
import ToDo from "./ToDo";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";

function RightPanel(props) {
  Chart.register(CategoryScale);
  Chart.register(...registerables);

  async function handleDelete(todoId) {
    let arrays = [];
    arrays = props.todo.todo;
    arrays = arrays.filter((todoItem) => {
      return todoItem._id !== todoId;
    });

    await fetch("http://localhost:9000/addAfterTask", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        todo: arrays,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    props.updateList();
  }

  async function EditTodo(todo) {
    let arrays = [];
    console.log("Inside Edit Note" + todo.complete);
    props.todo.todo.map((task) => {
      if (task._id !== todo.id) {
        console.log("Inside map function");
        arrays.push(task);
      }
    });
    arrays.push(todo);

    const p = await fetch(
      "http://localhost:9000/updateTask/" + localStorage.getItem("userId"),
      {
        method: "PUT",
        body: JSON.stringify({
          todo: arrays,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    props.updateList();
  }

  return (
    <div>
      {props.onCategorySelect}
      <div>
        <CreateArea todo={props.todo} onAdd={props.updateList} />
      </div>

      <div className="todos-div">
        {props.todo &&
          props.todo &&
          props.todo.todo &&
          props.todo.todo.length > 0 &&
          props.todo.todo.map((todo) => {
            if (props.categorySelect) {
              if (
                todo.category == props.Categoryvalue ||
                todo.category == props.Categoryvalue.toLowerCase() ||
                todo.category == props.Categoryvalue.toUpperCase()
              ) {
                return (
                  <ToDo
                    key={todo._id}
                    id={todo._id}
                    title={todo.title}
                    description={todo.description}
                    priority={todo.priority}
                    onDelete={handleDelete}
                    end={todo.end}
                    onEdit={EditTodo}
                    category={todo.category}
                    complete={todo.complete}
                    onComplete={EditTodo}
                  />
                );
              }
            } else if (props.isTimeSelected) {
              if (todo.end.substr(0, 10) <= props.timeSelect.substr(0, 10)) {
                return (
                  <ToDo
                    key={todo._id}
                    id={todo._id}
                    title={todo.title}
                    description={todo.description}
                    priority={todo.priority}
                    onDelete={handleDelete}
                    end={todo.end}
                    onEdit={EditTodo}
                    category={todo.category}
                    complete={todo.complete}
                    onComplete={EditTodo}
                  />
                );
              }
            } else {
              return (
                <ToDo
                  key={todo._id}
                  id={todo._id}
                  title={todo.title}
                  description={todo.description}
                  priority={todo.priority}
                  onDelete={handleDelete}
                  end={todo.end}
                  onEdit={EditTodo}
                  category={todo.category}
                  complete={todo.complete}
                  onComplete={EditTodo}
                />
              );
            }
          })}
      </div>
    </div>
  );
}

export default RightPanel;
