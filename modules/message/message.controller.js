import Message from "../../db/models/message.model.js";

const addMessage = async (req, res) => {
  const { content, receiverId } = req.body;

  try {
    const message = new Message({
      content,
      receiverId,
    });
    await message.save();
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiverId: req.user });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ msg: "Message not found" });

    if (message.receiverId.toString() !== req.user) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addMessage, getMessages, deleteMessage };
