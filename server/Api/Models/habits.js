import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: "User Id is required",
    },
    name: {
      type: String,
      required: "Name is required",
    },
    color: {
      type: String,
    },
    count: {
      type: Number,
      required: "Count is required",
    },
  },
  { versionKey: false }
);

Schema.virtual("id", () => this._id.toHexString());
Schema.set("toJSON", { virtuals: true });

const model = mongoose.model("habits", Schema);

export default model;
