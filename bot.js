const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
require("dotenv").config();
const { getMainMenu } = require("./keyboards");
const { checkLogin } = require("./controllers/authentification");

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  bot.use(new LocalSession({ database: "example_db.json" }).middleware());

  //старт бота, авторизація
  bot.start((ctx) =>
    ctx.replyWithHTML(
      "Вітаємо в боті <b>IT LUX</b>\n\n" + "Авторизуйтесь будь ласка",
      getMainMenu()
    )
  );

  //Команда авторизації
  bot.hears("Авторизація", (ctx) => {
    ctx.reply("Введіть логін:");
  });

  bot.on("text", async (ctx) => {
    // ctx.session.taskText = ctx.message.text;

    console.log("Логін абонента:", await checkLogin(ctx.message.text));
  });

  // bot.action(["yes", "no"], (ctx) => {
  //   if (ctx.callbackQuery.data === "yes") {
  //     addTask(ctx.session.taskText);
  //     ctx.editMessageText("Ваша задача успешно добавлена");
  //   } else {
  //     ctx.deleteMessage();
  //   }
  // });

  return bot;
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { setupBot };
// //bot.on("message") — он запускается каждый раз, когда кто-то отправляет сообщение.
// //Через ctx.reply мы отвечаем в тот же чат, а через ctx.telegram.sendMessage(chat_id, `Hello`) можно отправить сообщение в произвольный чат.
// //hears — регистрирует middleware, которые реагируют на текстовые сообщения указанного содержания

//git add . && git commit -m "add authentification (login)" && git push