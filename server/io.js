const socket = require("socket.io");
const bot = require("../bot/bot");
require("dotenv").config();

let io;

//send message from telegram to web
const send = (chat_id, login, message) => {
  io.emit("new_msg", { chat_id: chat_id, name: login, body: message });
};

function init(express) {
  io = new socket.Server(express);
  io.on("connection", (socket) => {
    console.log("a user connected");

    //receiving a message from web to telegram
    socket.on("send_msg", (msg) => {
      bot.sendMessage(msg.chat_id, "Повідомлення від " + msg.name + ": " + msg.body);
      //update browser chat
      socket.emit("new_msg", {
        name: msg.name,
        body: msg.body,
        chat_id: msg.chat_id,
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

exports.default = init;

exports.send = send;
