import React, { useEffect, useState } from "react";
import TimeRange from "react-time-range";
import Navbar from "../Navbar";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import DateTimePicker from "react-datetime-picker";
import PersonIcon from "@mui/icons-material/Person";
import { ProfileContainer } from "./ProfileStyle";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [todos, setTodos] = useState({});
  const [chartData, setChartData] = useState({});
  const [BarData, setBarData] = useState({});

  const [todopriority, setTodopriority] = useState({});
  const [todotitle, setTodotitle] = useState({});
  const [loading, setloading] = useState(true);

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [classScheduleDate, setClassScheduleDate] = useState();
  const [classScheduleTime, setClassScheduleTime] = useState();
  const [classDuration, setClassDuration] = useState(0);
  const [notAvlDate, setNotAvlDate] = useState();
  const [notAvlTime, setNotAvlTime] = useState();
  const [notAvlduration, setNotAvlDuration] = useState(0);
  const [routine, setRoutine] = useState({
    sleepTime: "",
    wakeTime: "",
    classSchedule: [],
    notAvailable: [],
  });

  const chart = () => {
    Chart.register(CategoryScale);
    Chart.register(...registerables);
    let todopri = [];
    let todotitle = [];
    let todocomplete = [];
    let todonotcomplete = [];
    let count = 1;
    let ncount = 0;

    const userId = localStorage.getItem("userId");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    };

    fetch("http://localhost:9000/getTasks", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.todo) {
          for (const dataObj of data.todo) {
            todopri.push(dataObj.priority);
            todotitle.push(dataObj.title);
            if(dataObj.complete) {
            todocomplete.push(count);
            
            } else {
              todonotcomplete.push(ncount);
             
            }
          }
        }
        setChartData({
          labels: todotitle,
          datasets: [
            {
              label: "Completed tasks",
              data: todocomplete,
              fill: true,
              borderColor: ["#DBD2EE", "purple", "green", "#5b059e"],
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4,
            },
            {
              label: "Incomplete tasks",
              data: todonotcomplete,
              fill: true,
              borderColor: ["purple", "green", "#5b059e"],
              backgroundColor: ["#DBD2EE"],
              borderWidth: 4,
            },
          ],
        });

        setBarData({
          // ...chartData,
          labels: todotitle,
          datasets: [
            {
              label: "Lowest number has highest priority",
              data: todopri,
              fill: true,
              backgroundColor: ["#DBD2EE", "purple", "green", "#5b059e"],
              borderColor: ["#DBD2EE", "purple", "green", "#5b059e"],
              borderWidth: 4,
            },
          ],
        });
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    fetch(`http://localhost:9000/user?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    chart();
  }, []);

  useEffect(() => {
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
  }, []);

  const onUpdateProfileClick = () => {
    const newRoutine = { ...routine };
    fetch("http://localhost:9000/addRoutine", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        routine: newRoutine,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  const onTimeChangeHandler = (e) => {
    if (e.startTime) {
      setStartTime(e.startTime);
      const newStart = new Date(e.startTime);
      const newStartTime = newStart.getHours() + ":" + newStart.getMinutes();
      setRoutine({
        ...routine,
        sleepTime: newStartTime,
      });
    }
    if (e.endTime) {
      const newEnd = new Date(e.endTime);
      const newEndTime = newEnd.getHours() + ":" + newEnd.getMinutes();
      setEndTime(e.endTime);
      setRoutine({
        ...routine,
        wakeTime: newEndTime,
      });
    }
  };

  const submitClassSchedule = (e) => {
    setRoutine({
      ...routine,
      classSchedule: [
        ...routine.classSchedule,
        {
          date: classScheduleDate,
          startTime: classScheduleTime,
          duration: classDuration,
        },
      ],
    });
    // onAdd();
    e.preventDefault();
    setClassScheduleDate("");
    setClassDuration("");
    setClassScheduleTime("");
  };

  const handleClassScheduleDate = (e) => {
    setClassScheduleDate(e.target.value);
  };

  const handleNotAvlDate = (e) => {
    setNotAvlDate(e.target.value);
  };

  const handleClassScheduleTime = (e) => {
    setClassScheduleTime(e.target.value);
  };

  const handleNotAvlTime = (e) => {
    setNotAvlTime(e.target.value);
  };

  const handleNotAvailableSubmit = (e) => {
    setRoutine({
      ...routine,
      notAvailable: [
        ...routine.notAvailable,
        {
          date: notAvlDate,
          startTime: notAvlTime,
          duration: notAvlduration,
        },
      ],
    });
    // onAdd();
    e.preventDefault();
    setNotAvlDate("");
    setNotAvlTime("");
    setNotAvlDuration("");
  };

  const onDurationChangeHandler = (e) => {
    setClassDuration(e.target.value);
  };

  const onNotAvlDurationHandler = (e) => {
    setNotAvlDuration(e.target.value);
  };

  if (!loading) {
    return (
      <ProfileContainer>
        <Navbar />
        <div className="updateProfileStyle">
          <PersonIcon className="userProfileIcon"></PersonIcon>
          <div className="userDetails">
            <div>
              <label className="labelStyle">Full Name: </label>
              {userInfo.firstName + " " + userInfo.lastName}{" "}
            </div>
            <div>
              <label className="labelStyle">Email: </label>
              {userInfo.emailId}{" "}
            </div>
          </div>
          <div className="profileForm">
            <form>
              <label className="labelStyle">Sleep Schedule</label>
              <TimeRange
                use24Hours
                startMoment={startTime}
                endMoment={endTime}
                onChange={(e) => onTimeChangeHandler(e)}
              />
              <br></br>
              <div>
                <label className="labelStyle">Class Schedule</label>
                <div>
                  {routine &&
                    routine.classSchedule &&
                    routine.classSchedule.map((val) => {
                      return (
                        <div className="addedSchedule">
                          <div>
                            <label className="smallLabelStyle">
                              Class Date:
                            </label>
                            {val.date}
                          </div>
                          <div>
                            <label className="smallLabelStyle">
                              Class Time:
                            </label>
                            {val.startTime}
                          </div>
                          <div>
                            <label className="smallLabelStyle">
                              Class Duration:
                            </label>
                            {val.duration}
                          </div>
                        </div>
                      );
                    })}
                  <label className="smallLabelStyle">Class Date:</label>
                  <input
                    type="date"
                    value={classScheduleDate}
                    onChange={(e) => handleClassScheduleDate(e)}
                  />
                  <label className="smallLabelStyle">Class Time:</label>
                  <input
                    type="time"
                    value={classScheduleTime}
                    onChange={(e) => handleClassScheduleTime(e)}
                  />
                  <label className="smallLabelStyle">Class Duration:</label>
                  <input
                    type="number"
                    min="0"
                    value={classDuration}
                    onChange={(e) => onDurationChangeHandler(e)}
                  />
                  <button
                    onClick={(e) => submitClassSchedule(e)}
                    className="scheduleButtons"
                  >
                    Add Class Schedule
                  </button>
                </div>
              </div>
              <div>
                <label className="labelStyle">Busy Schedule</label>
                <div>
                  {routine &&
                    routine.notAvailable &&
                    routine.notAvailable.map((val) => {
                      return (
                        <div className="addedSchedule">
                          <div>
                            <label className="smallLabelStyle">
                              Busy Date:
                            </label>
                            {val.date}
                          </div>
                          <div>
                            <label className="smallLabelStyle">
                              Busy Time:
                            </label>
                            {val.startTime}
                          </div>
                          <div>
                            <label className="smallLabelStyle">
                              Busy Duration:
                            </label>
                            {val.duration}
                          </div>
                        </div>
                      );
                    })}
                </div>
                <label className="smallLabelStyle">Busy Date:</label>
                <input
                  type="date"
                  value={notAvlDate}
                  onChange={(e) => handleNotAvlDate(e)}
                />
                <label className="smallLabelStyle">Busy Time:</label>
                <input
                  type="time"
                  value={notAvlTime}
                  onChange={(e) => handleNotAvlTime(e)}
                />
                <label className="smallLabelStyle">Busy Duration:</label>
                <input
                  type="number"
                  min="0"
                  value={notAvlduration}
                  onChange={(e) => onNotAvlDurationHandler(e)}
                />
                <button
                  onClick={(e) => handleNotAvailableSubmit(e)}
                  className="scheduleButtons"
                >
                  Add Not Available
                </button>
              </div>
              {/* <button onClick={() => onTimeIsDone()}>Done</button> */}
            </form>
            <button
              onClick={() => onUpdateProfileClick()}
              className="btnUpdateProfile"
            >
              Update Profile
            </button>
          </div>
        </div>
        <div className="chartHeadingStyle">
          <h2 className="taskVisHeading">My Task Visualization</h2>
          <Line datasetIdKey="id" data={chartData} />
          <Bar datasetIdKey="id" data={BarData} />
        </div>
      </ProfileContainer>
    );
  } else {
    return <div></div>;
  }
};

export default Profile;
