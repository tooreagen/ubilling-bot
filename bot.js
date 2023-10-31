const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  bot.start((ctx) => ctx.reply("Вітаю!"));

  bot.on("message", async (ctx, next) => {
    const chatID = ctx.chat.id;
    ctx.reply("chatID: " + chatID);
    next();
  });

  // bot.on("message", (ctx) => {
  //   if (ctx.message.text === "1") {
  //     ctx.reply("Можна декілька разів робити bot.on якщо викликати next");
  //   }
  // });

  bot.hears('привет', (ctx) => ctx.reply('та написав привет'))
  bot.hears('1', (ctx) => ctx.reply('та написав один'))
  bot.hears('рок', (ctx) => ctx.reply('рок-н-рол'))


  return bot;
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { setupBot };

//bot.on("message") — он запускается каждый раз, когда кто-то отправляет сообщение.
