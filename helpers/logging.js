const fs = require("fs").promises;
const moment = require("moment");

const logging = async (fileName, ctx, login = "noauth") => {
  let text = "";
  let chatId = "";

  if (ctx?.update?.message?.text) {
    text = ctx.update.message.text;
    chatId = ctx.message.chat.id;
  }

  if (ctx?.callbackQuery?.data) {
    text = ctx.callbackQuery.data;
    chatId = ctx.callbackQuery.message.chat.id;
  }

  try {
    const currentDate = moment().format("DD-MM-YYYY HH:mm:ss");
    console.log(text);
    await fs.appendFile(
      fileName,
      `${currentDate} ${login.padEnd(20)} ${String(chatId).padEnd(15)} ${text}\n`
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = { logging };
