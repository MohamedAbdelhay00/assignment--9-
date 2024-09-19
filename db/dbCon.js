import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/sarahah")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

export default mongoose;