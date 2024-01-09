const telegraf = require("telegraf");
const filters = require("telegraf/filters");
const io = require("../../server/io");

const composer = new telegraf.Composer();

//sending a message from Telegram to a browser
composer.on(filters.message("text"), async (ctx, next) => {
  const login = "Barbos Ivanovich";
  const message = ctx.message.text;
  io.send(login, message);
  next();
});

module.exports = composer;
