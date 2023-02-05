import mongoose from "mongoose";
const schema = mongoose.Schema({
  userId: {
    type: String,
    required: ()=>{
      !!userId;
    }
  },
  emailId: {
    type: String,
  },
  routine: {
    sleepTime: {
      type: String,
    },
    wakeTime: {
      type: String,
    },
    notAvailable: [
      {
        date: {
          type: String,
        },
        startTime: {
          type: String,
        },
        duration: {
          type: String,
        },
      },
    ],
    classSchedule: [
      {
        date: {
          type: String,
        },
        startTime: {
          type: String,
        },
        duration: {
          type: String,
        },
      },
    ],
  },
  todo: [
    {
      title: {
        type: String,
        required: "Title not provided",
      },
      complete: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        required: "Description not provided",
      },
      priority: {
        type: Number,
        min: 1,
        max: 10,
        default: 5,
      },
      dueDate: {
        type: Date,
      },
      category: {
        type: String,
      },
      start: {
        type: Date,
      },
      end: {
        type: Date,
      },
      timeTaking: {
        type: Number,
        min: 1,
      },
    },
  ],
});

const todoModel = mongoose.model("ToDo", schema);

export default todoModel;
