const socket = require("socket.io");
const bot = require("../bot/bot");
require("dotenv").config();

let io;

//send message from telegram to web
const send = (login, message) => {
  io.emit("new_msg", { name: login, body: message });
};

function init(express) {
  io = new socket.Server(express);
  io.on("connection", (socket) => {
    console.log("a user connected");

    //receiving a message from the browser
    socket.on("send_msg", (msg) => {
      bot.sendMessage(process.env.TG_USER_ID, msg.name + ": " + msg.body);
      //update browser chat
      socket.emit("new_msg", {
        name: msg.name,
        body: msg.body,
      });
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

exports.default = init;

exports.send = send;
