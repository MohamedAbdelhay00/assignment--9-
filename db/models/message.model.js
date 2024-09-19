import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", schema);

export default Message;
