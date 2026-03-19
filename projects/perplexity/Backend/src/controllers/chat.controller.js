import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";
import { genrateResponse, genrateChatTitle } from "../services/ai.service.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;
  console.log(chatId);

  let title = null;
  let chat = null;

  if (!chatId) {
    title = await genrateChatTitle(message);
    chat = await chatModel.create({
      user: req.user.id,
      title,
    });
  }

  const userMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId });
  const result = await genrateResponse(messages);

   const aiMessages = await messageModel.create({
     chat: chatId || chat._id,
     content: result,
     role: "ai",
   });
    
    
    res.status(201).json({
      title,
      chat,
      aiMessages,
    });
}


export async function getChats(req, res) {
    const user = req.user

    const chats = await chatModel.find({user: user.id})

    res.status(200).json({
        message: "Chat recived successfully",
        chats
    })
}


export async function getMessage(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found."
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
      message: "Message retrieved successfully.",
      messages,
    });
}

export async function deleteChat(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOneAndDelete({
      _id: chatId,
      user: req.user.id,
    });

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
      return res.status(404).json({
        message: "Chat doen't found.",
      });
    }

    res.status(200).json({
        message: "Chat delete successfully."
    })

}