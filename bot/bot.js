const { Telegraf, Scenes } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const { notAuthKeyboard } = require("../keyboards");
const { checkAuth } = require("../controllers/authentification");
const { logging } = require("../helpers/logging");
const { authWizard } = require("../scenes/authScene");
const { billingScene } = require("../scenes/billingScene");
const { chatScene } = require("../scenes/chat.scene");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(new LocalSession({ database: "user_db.json" }).middleware());

//from browser to telegram
function sendMessage(userId, message, markup) {
  bot.telegram.sendMessage(userId, message, markup);
}

//logging of users who are not authorized
bot.use(async (ctx, next) => {
  if (!ctx.session.isAuth) {
    await logging("./log/allrequest.log", ctx);
  }
  return next();
});

// Registration of scenes in the bot
const stage = new Scenes.Stage([authWizard, billingScene, chatScene]);
bot.use(stage.middleware());

//bot start, authorization
bot.start(async (ctx) => {
  //at the start, we check whether the user is authorized in the database
  if (!(await checkAuth(ctx.update.message.chat.id)) === true) {
    //if not authorized
    await ctx.replyWithHTML(
      "Вітаємо в боті <b>MEGABOT</b>\n\n" + "Авторизуйтесь будь ласка",
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
