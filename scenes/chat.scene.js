const { Scenes } = require("telegraf");

const { logging } = require("../helpers/logging");
const { mainKeyboard } = require("../keyboards");

const chatScene = new Scenes.BaseScene("chatScene");

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

//код виконується при вході в сцену
chatScene.enter(async (ctx) => {
  console.log("Створити сокет, передати ID того хто створив сцену");
});

module.exports = { chatScene };
