import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "First Name is required",
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: "Email Id is required",
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    wakeTime: {
      type: Date,
    },
    sleepTime: {
      type: Date,
    },
    totalWorkingHours: {
      type: Number,
    },
    minSleepRequired: {
      type: Number,
    },
    maxSleepRequired: {
      type: Number,
    },
    nonWorkingDays: {
      type: String,
      enum: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      default: "Sunday",
    },
    classSchedule: [
      {
        classDay: {
          type: String,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        classTime: { type: Date },
      },
    ],
  },
  { versionKey: false },
  { timestamps: { createdAt: "CreatedAt", updatedAt: "UpdatedAt" } }
);

const userModel = mongoose.model("user", Schema);

export default userModel;
