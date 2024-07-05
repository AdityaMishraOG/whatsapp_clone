import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
// import {getReceiverSocketId, io} from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        // extract information from request
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // find conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                // messages by default is set to []
            });
        }

        // create new message instance
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        // add message to the conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // INCOMPLETE SOCKET IO FUNCTIONALITY
        // save the message and the conversation
        // await conversation.save();
        // await newMessage.save();

        // using promises parallelize
        await Promise.all([conversation.save(), newMessage.save()]);

        // status OK Created
        res.status(201).json(newMessage);


    } catch (error) {
        console.log("error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
            // popoulate method returns the message objects instead of just the message ids in the conversation
        }).populate("messages");

        // return empty list if conversation is not found
        if (!conversation) {
            return res.status(200).json([]);
        }
        // return the messages in the conversation
        const messages = conversation.messages;
        res.status(200).json(messages);

    } catch (error) {
        console.log("error in getMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}