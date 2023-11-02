const { Telegraf } = require("telegraf");
const { getMainMenu } = require("./keyboards");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  bot.start((ctx) => ctx.reply("Вітаю!", getMainMenu()));

  bot.hears("Мої задачі", (ctx) => {
    console.log("Ти цокнув задачі");
    ctx.reply("Ти цокнув задачі");
  });

  bot.hears("Додати задачу", (ctx) => {
    console.log("Ти цокнув додати задачу");
    ctx.reply("Ти цокнув додати задачу");
  });

  bot.hears("Карпати!", (ctx) => {
    console.log("Карпати по повній");
    ctx.replyWithPhoto(
      "https://koruna.ua/ua/wp-content/uploads/sites/2/2021/04/Karpaty-vpervye-1024x683.jpg"
    );
  });

  return bot;
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { setupBot };
// //bot.on("message") — он запускается каждый раз, когда кто-то отправляет сообщение.
// //Через ctx.reply мы отвечаем в тот же чат, а через ctx.telegram.sendMessage(chat_id, `Hello`) можно отправить сообщение в произвольный чат.
// //hears — регистрирует middleware, которые реагируют на текстовые сообщения указанного содержания

//git add . && git commit -m "education" && git push
