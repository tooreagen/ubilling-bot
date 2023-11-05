const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const { getMainMenu, yesNoKeyboard } = require("./keyboards");
const { taskList, addTask, getMyTasks } = require("./db");

require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  bot.use(new LocalSession({ database: "example_db.json" }).middleware());

  //старт бота, авторизація
  //додати перевірку якщо вже авторизований, то повідомити
  bot.start((ctx) =>
    ctx.replyWithHTML(
      "Вітаємо в боті <b>IT LUX</b>\n\n" + "Авторизуйтесь будь ласка",
      getMainMenu()
    )
  );

  bot.hears("Мої задачі", async (ctx) => {
    const tasks = await getMyTasks();
    let result = "";

    for (let i = 0; i < tasks.length; i++) {
      result = result + `[${i + 1}] ${tasks[i]}\n`;
    }

    ctx.replyWithHTML("<b>Список ваших задач:</b>\n\n" + `${result}`);
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

  bot.on("text", (ctx) => {
    ctx.session.taskText = ctx.message.text;

    ctx.replyWithHTML(
      `Вы действительно хотите добавить задачу:\n\n` + `<i>${ctx.update.message.text}</i>`,
      yesNoKeyboard()
    );
  });

  bot.action(["yes", "no"], (ctx) => {
    if (ctx.callbackQuery.data === "yes") {
      addTask(ctx.session.taskText);
      ctx.editMessageText("Ваша задача успешно добавлена");
    } else {
      ctx.deleteMessage();
    }
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
