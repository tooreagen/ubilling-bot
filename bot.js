const { Telegraf, Scenes } = require("telegraf");
const LocalSession = require("telegraf-session-local");
require("dotenv").config();
const { notAuthKeyboard } = require("./keyboards");
const { checkAuth } = require("./controllers/authentification");
const { authWizard } = require("./scenes/authScene");
const { billingScene } = require("./scenes/billingScene");
const { logging } = require("./helpers/logging");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx, next) => {
  // console.log(ctx);
  // const text = ctx.message.text;
  // const chatId = ctx.message.chat.id;
  // await logging("./log/allrequest.log", text, chatId);
  return next();
});

const setupBot = () => {
  bot.use(new LocalSession({ database: "user_db.json" }).middleware());

  // Реєстрація сцен в боті
  const stage = new Scenes.Stage([authWizard, billingScene]);
  bot.use(stage.middleware());

  //старт бота, авторизація
  bot.start(async (ctx) => {
    //на старті перевіряємо чи авторизований юзер в БД
    if (!(await checkAuth(ctx.update.message.chat.id)) === true) {
      //якщо не авторизований
      await ctx.replyWithHTML(
        "Вітаємо в боті <b>MEGABOT</b>\n\n" + "Авторизуйтесь будь ласка",
        notAuthKeyboard()
      );

      //виклик сцени авторизації
      await ctx.scene.enter("authentication");
    } else {
      //якщо авторизований, входимо до сцени білінга
      ctx.scene.enter("billingScene");
    }
  });

  return bot;
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { setupBot };

//git add . && git commit -m "add sql query" && git push