const { Scenes } = require("telegraf");
const { mainKeyboard } = require("../keyboards");
const { getUserAllInfo } = require("../controllers/getUserAllInfo");

const billingScene = new Scenes.BaseScene("billingScene");

billingScene.enter(async (ctx) => {
  //Відображення користувачу його поточного стану
  login = ctx.session.login;
  await ctx.replyWithHTML("Вітаємо в боті <b>MEGABOT</b>\n\n" + "Ви авторизовані!");

  const userData = await getUserAllInfo(login);
  console.log(userData);

  await ctx.replyWithHTML(
    `Ваше ім'я: <b>${userData.name}</b>\n` +
      `Ваш баланс: <b>${userData.balance} грн.</b>\n` +
      `Ваш тариф: <b>${userData.tariff}</b>\n`
  );

  ctx.reply("👇 Виконайте запит:", mainKeyboard());
});

module.exports = { billingScene };
