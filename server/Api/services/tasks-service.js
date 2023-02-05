import Task from "./../Models/tasks.js";
import moment from 'moment'

export const saveMail = (sendMail) => {
   const newMail = new AdminHelpModel(sendMail);
   const a = newMail.save();
   return newMail;
 
 }

export const save = async (newTask) => {
  let task = await Task.find({ userId: newTask.userId }).exec();
 
  if (task.length == 0) {
    task = new Task(newTask);
    
    const a = task.save();
  } else {
    
    task[0].emailId = newTask.emailId;
    task[0].todo.push(newTask.todo[0]);
    task[0].todo = sorting(task[0].todo);
    task[0].todo = decide(task[0].todo, task[0].routine);
   
    await Task.findByIdAndUpdate(task[0]._id,{
      emailId:newTask.emailId,
      todo: task[0].todo,
    }).exec();
 
  }
   return task;

};


// export const saveMail = (sendMail) => {
//   console.log("Inside sendmail", sendMail);
//    const newMail = new AdminHelpModel(sendMail);
//    console.log(".......savemail",newMail);
//    const a = newMail.save();
//    console.log("printing a", a);
//    return newMail;
 
//  }




export const addAfterDelete = async (newArray) => {
  let task = await Task.find({ userId: newArray.userId }).exec();
  await Task.findByIdAndUpdate(task[0]._id, {
    todo: newArray.todo,
  }).exec();
};

export const get = async (userIdVal) => {
  const tasks = await Task.findOne({ userId: userIdVal }).exec();
  tasks.todo = sorting(tasks.todo);
  return tasks;
};

export const update = async (id, updatedTask) => {
  let task = await Task.find({ userId: id }).exec();

  const a = await Task.findByIdAndUpdate(task[0]._id, {
    todo: updatedTask.todo,
  }).exec();
};

export const remove = (id) => {
  Task.findByIdAndDelete(id).exec();
  return { Message: "Successfully Removed the item" };
};

function sorting(data) {
  if (data.length == 0 || data.length == 1) {
    return data;
  }
  var done = false;
  while (!done) {
    done = true;
    for (var i = 0; i < data.length-1; i += 1) {
      if (data[i].end > data[i+1].end) {
        done = false;
        var tmp = data[i];
        data[i] = data[i+1];
        data[i+1] = tmp;
      } else if (data[i].end == data[i+1].end) {
        done = false;
        if (data[i].priority < data[i+1].priority) {
          var temp = data[i];
          data[i] = data[i+1];
          data[i+1] = temp;
        }
      }
    }
  }
  return data;
}

// let todoData = [{
//   complete: false,
//   priority: 5,
//   _id: "626624db599f5137b005a740",
//   title: 'Some Title',
//   description: 'Some Description',
//   category: 'Cake Prep',
//   timeTaking: 4,
//   end: "2022-04-25T04:34:02.880Z",
//   start: "2022-04-25T04:34:35.307Z"
// },
// {
//   complete: false,
//   priority: 3,
//   _id: "6266251a599f5137b005a749",
//   title: 'Title 2',
//   description: 'Description 2',
//   category: 'Cake Prep',
//   timeTaking: 1,
//   end: "2022-04-25T10:30:06.000Z",
//   start: "2022-04-25T04:35:37.904Z"
// },
// {
//   complete: false,
//   priority: 2,
//   _id: "62662f38599f5137b005a75a",
//   title: 'Title 3',
//   description: 'Description 3',
//   category: '',
//   timeTaking: 3,
//   end: "2022-04-26T10:30:26.000Z",
//   start: "2022-04-25T05:18:48.251Z"
// },
// {
//   complete: false,
//   priority: 1,
//   _id: "6266329d599f5137b005a769",
//   title: 'Title 4',
//   description: 'Description 4',
//   category: '',
//   timeTaking: 2,
//   end: "2022-04-26T09:19:36.000Z",
//   start: "2022-04-25T05:33:17.823Z"
// },
// {
//   complete: false,
//   priority: 5,
//   _id: "6266345d7d71b83d54764c82",
//   title: 'Testing Title 5',
//   description: 'Testing Description 5',
//   end: "2022-04-25T22:00:00.000Z",
//   start: "2022-04-25T13:00:00.000Z",
//   timeTaking: 3
// },
// {
//   complete: false,
//   priority: 5,
//   _id: "626634ca7b7f773a848a42ac",
//   title: 'Testing Title 6',
//   description: 'Testing Description 6',
//   end: "2022-04-26T22:00:00.000Z",
//   start: "2022-04-26T13:00:00.000Z",
//   timeTaking: 2
// },
// {
//   complete: false,
//   priority: 5,
//   _id: "6266350be048a53bb0deab5b",
//   title: 'Testing Title 7',
//   description: 'Testing Description 7',
//   end: "2022-04-27T22:00:00.000Z",
//   start: "2022-04-27T13:00:00.000Z",
//   timeTaking: 1
// }];




function decide(data,routine){

  console.log("Inside Decide function");



  let aaj = moment().format("YYYY-MM-DD");
//   let busyStartTime = moment(aaj).add('11:30',"hours");
//   let busyEndTime = moment(aaj).add('13:30',"hours");
//   busyEndTime = moment(busyEndTime).format("YYYY-MM-DDTHH:mm:ss");
//   busyStartTime = moment(busyStartTime).format("YYYY-MM-DDTHH:mm:ss");
//   let myDay = {};
 
//   myDay[busyEndTime] = "I am Busy";
//   myDay[busyStartTime] = "I am Busy";
//   myDay["9:30"] = "Wake up";
//   let a = [...data];
//   a = sorting(a);
//   let wake = '9:30'
// //YYYY-MM-DDTHH:mm:ss

//   // let startingHour = moment(ab).add(wake,"hours");
//  console.log(myDay);




let dayArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let dayFreeHours = 0;
let taskStartTime = {};
let wakeUpTime = 0;
if(routine.wakeTime.length == 3){
  wakeUpTime = routine.wakeTime.substring(0,1);
  
}else{
  wakeUpTime = routine.wakeTime.substring(0,2);
}

let sleepTime = routine.sleepTime.substring(0,2);
let classSchedule = {startTime: 12, duration: 3};
let busyTime = {startTime: 15, duration: 1}


//setting sleep time;
for(let i = sleepTime - 1;i<dayArray.length;i++){
    dayArray[i] = 1;
}

//Adding wake time
for(let i = 0;i<wakeUpTime;i++){
dayArray[i] = 1;
}

//Adding Class Schedule
for(let i = classSchedule.startTime;i< (classSchedule.duration + classSchedule.startTime);i++){
    
    dayArray[i] = 1;
}

//Adding Busy Schedule
for(let i = busyTime.startTime;i< (busyTime.duration + busyTime.startTime);i++) {
    dayArray[i] = 1;
}


for(let i =0; i<dayArray.length;i++){
    if(dayArray[i] == 0){
        taskStartTime[i] = 0;
        dayFreeHours++;
    }
}
    
console.log(dayFreeHours);

while(dayFreeHours > 1){
   
  
  console.log("Inside Day Free Whi;e");
 
  for(let i = 0;i<data.length;i++){
    console.log("Inside Day Free FOR");

        if(data[i].timeTaking <= dayFreeHours){

            let timeTaking = data[i].timeTaking ;
            

            let startTime = Object.keys(taskStartTime)[0];
            let startTimeFor = moment(aaj).add(startTime,'hours');
            let startTimeFormat = moment(startTimeFor).format("YYYY-MM-DDTHH:mm:ss");

            dayFreeHours = dayFreeHours - timeTaking; 
            data[i].start = startTimeFormat;
            delete taskStartTime[startTime];
            dayArray[startTime] = '#';
            timeTaking--;
            
            while(timeTaking >= 1){
              
              // if(startTime + 1 != Object.keys(taskStartTime)[0] ){
              //   checker = true;
              //   let TempstartTime = Object.keys(taskStartTime)[0];
              //   let TempstartTimeFor = moment(aaj).add(TempstartTime,'hours');
              //   let TempstartTimeFormat = moment(TempstartTimeFor).format("YYYY-MM-DDTHH:mm:ss");

              //   let tempTodo = {...data[i]};
              //   tempTodo._id = data[i]._id;
              //   tempTodo.title = data[i].title;
              //   tempTodo.timeTaking = timeTaking;
              //   tempTodo.description = data[i].description;

              //   data.push(tempTodo);
                
              //   let endTime = startTime +1;
              //   let endTimeFor = moment(aaj).add(endTime,'hours');
              //   let endTimeFormat = moment(endTimeFor).format("YYYY-MM-DDTHH:mm:ss");
              //   data[i].end = endTimeFormat;
              
              // break;
              

              // }else{
                delete taskStartTime[Object.keys(taskStartTime)[0]];
                timeTaking--;
                
              // }
                  
                
            }
           
            let endTime = Object.keys(taskStartTime)[0];
            let endTimeFor = moment(aaj).add(endTime,'hours');
            let endTimeFormat = moment(endTimeFor).format("YYYY-MM-DDTHH:mm:ss");
            data[i].end = endTimeFormat;
            delete taskStartTime[Object.keys(taskStartTime)[0]];
        
            
        }
    }
    return data;
}

// console.log(dayArray);
// console.log("----------------");
// console.log(data, "Updated Start and End time");
// console.log("----------------");
// console.log(taskStartTime);



}
