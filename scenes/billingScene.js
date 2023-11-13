const { Scenes } = require("telegraf");
const { mainKeyboard } = require("../keyboards");
const { getUserAllInfo } = require("../controllers/getUserAllInfo");
const { getUserBalance } = require("../controllers/getUserBalance");
const { getUserPays } = require("../controllers/getUserPays");

const billingScene = new Scenes.BaseScene("billingScene");

billingScene.enter(async (ctx) => {
  //Відображення користувачу його поточного стану
  login = ctx.session.login;
  await ctx.replyWithHTML("Вітаємо в боті <b>MEGABOT</b>\n\n" + "Ви авторизовані!");

  const userData = await getUserAllInfo(login);

  await ctx.replyWithHTML(
    `Ваше ім'я: <b>${userData.name}</b>\n` +
      `Ваш баланс: <b>${userData.balance} грн.</b>\n` +
      `Ваш тариф: <b>${userData.tariff}</b>\n`
  );

  await ctx.reply("👇 Виконайте запит:", mainKeyboard());

  //відображення балансу
  billingScene.hears("Баланс", async (ctx) => {
    ctx.replyWithHTML(`Ваш баланс: <b>${await getUserBalance(login)} грн.</b>`);
  });

  //відображення останніх 10 платежів
  billingScene.hears("Останні платежі", async (ctx) => {
    const pays = await getUserPays(login);
    let paysMarkup = "";

    for (let i = 0; i < 10; i++) {
      const date = new Date(pays[i].date);
      const formattedDate = date.toLocaleString("uk-UA", { timeZone: "Europe/Kiev" });
      paysMarkup += `Дата: <i>${formattedDate}</i>\nСума: <b>${pays[i].summ} грн.</b>\n\n`;
    }

    console.log(paysMarkup);

    ctx.replyWithHTML(`<b>Останні 10 платежів:</b>\n\n${paysMarkup}`);
  });
});

module.exports = { billingScene };
