const telegraf = require("telegraf");
const filters = require("telegraf/filters");
const io = require("../../server/io");

const composer = new telegraf.Composer();

//sending a message from Telegram to a browser
composer.on(filters.message("text"), async (ctx, next) => {
  const login = ctx.session.login;
  const message = ctx.message.text;
  const chat_id = ctx.update.message.chat.id;
  io.send(chat_id, login, message);
  next();
});

module.exports = composer;
