const { Telegraf, Scenes } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const { notAuthKeyboard } = require("../keyboards");
const { checkAuth } = require("../controllers/authentification");
const { logging } = require("../helpers/logging");
const { authWizard } = require("../scenes/authScene");
const { billingScene } = require("../scenes/billingScene");
const { chatScene } = require("../scenes/chat.scene");
require("dotenv").config();

const { BOT_NAME } = process.env;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(new LocalSession({ database: "user_db.json" }).middleware());

//from browser to telegram
function sendMessage(userId, message, markup) {
  bot.telegram.sendMessage(userId, message, markup);
}

//логування неавторизованих користувачів
bot.use(async (ctx, next) => {
  if (!ctx.session.isAuth) {
    await logging("./log/allrequest.log", ctx);
  }
  return next();
});

// Реєстрація сцен у боті
const stage = new Scenes.Stage([authWizard, billingScene, chatScene]);
bot.use(stage.middleware());

//запуск бота, авторизація
bot.start(async (ctx) => {
  //на початку перевіряємо, чи користувач авторизований в базі даних
  if (!(await checkAuth(ctx.update.message.chat.id)) === true) {
    //якщо не авторизований
    await ctx.replyWithHTML(
      `Вітаємо в боті <b>${BOT_NAME}</b>\n\n` + `Авторизуйтесь будь ласка`,
      notAuthKeyboard()
    );

    //calling the authorization scene
    await ctx.scene.enter("authentication");
  } else {
    //if authorized, enter the billing stage
    ctx.scene.enter("billingScene");
  }
});

exports.sendMessage = sendMessage;

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
