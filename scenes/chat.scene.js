const { Scenes } = require("telegraf");

const { logging } = require("../helpers/logging");
const { mainKeyboard } = require("../keyboards");

const chatScene = new Scenes.BaseScene("chatScene");

chatScene.use(require("../bot/composers/telegramToWeb.composer"));

//лог авторизованного користувача
chatScene.use(async (ctx, next) => {
  const login = ctx.session.login;
  await logging("./log/allrequest.log", ctx, login);
  return next();
});

chatScene.hears("❌Завершити чат❌", async (ctx) => {
  await ctx.replyWithHTML(`Чат завершено`, mainKeyboard());
  return ctx.scene.enter("billingScene");
});

module.exports = { chatScene };
