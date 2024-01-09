const { Scenes } = require("telegraf");

const { logging } = require("../helpers/logging");

const chatScene = new Scenes.BaseScene("chatScene");

//лог авторизованного користувача
chatScene.use(async (ctx, next) => {
  const login = ctx.session.login;
  await logging("./log/allrequest.log", ctx, login);
  return next();
});

//код виконується при вході в сцену
chatScene.enter(async (ctx) => {});

//Завершення чату
// chatScene.hears("↩️Вихід", async (ctx) => {
//   const login = ctx.session.login;
//   const chatId = ctx.chat.id;
//   await ctx.replyWithHTML(await userLogout(login, chatId), notAuthKeyboard(), ctx.scene.leave());
//   ctx.session.login = "";
//   ctx.session.isAuth = false;
// });

module.exports = { chatScene };
