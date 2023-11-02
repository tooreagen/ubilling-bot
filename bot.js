const { Telegraf } = require("telegraf");
const { getMainMenu, yesNoKeyboard } = require("./keyboards");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  //старт бота, авторизація
  //додати перевірку якщо вже авторизований, то повідомити
  bot.start((ctx) =>
    ctx.replyWithHTML(
      "Вітаємо в боті <b>IT LUX</b>\n\n" + "Авторизуйтесь будь ласка",
      getMainMenu()
    )
  );

  bot.hears("Мої задачі", (ctx) => {
    ctx.reply("Ти цокнув задачі");
  });

  bot.hears("Додати задачу", (ctx) => {
    ctx.reply("Ти цокнув додати задачу");
  });

  bot.hears("Карпати!", (ctx) => {
    ctx.replyWithPhoto(
      "https://koruna.ua/ua/wp-content/uploads/sites/2/2021/04/Karpaty-vpervye-1024x683.jpg",
      {
        caption: "Ди як файно!",
      }
    );
  });

  bot.on('text', ctx => {
    console.log(ctx);
      ctx.replyWithHTML(
          `Вы действительно хотите добавить задачу:\n\n`+
          // `<i>${ctx.message.text}</i>`,
          yesNoKeyboard()
      )
  })

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
