const { Scenes } = require("telegraf");
const { mainKeyboard } = require("../keyboards");
const { getUserAllInfo } = require("../controllers/getUserAllInfo");
const { getUserBalance } = require("../controllers/getUserBalance");
const { getUserPays } = require("../controllers/getUserPays");

const billingScene = new Scenes.BaseScene("billingScene");

billingScene.enter(async (ctx) => {
  //вхід в сцену
  //Відображення користувачу його поточного стану
  await ctx.replyWithHTML("Вітаємо в боті <b>MEGABOT</b>\n\n" + "Ви авторизовані!");

  await ctx.replyWithHTML(await getUserAllInfo(ctx.session.login));

  await ctx.replyWithHTML("❗️<b>УВАГА! Функціонал працює в тестовому режимі</b>❗️");

  await ctx.reply("👇 Виконайте запит:", mainKeyboard());
});

//відображення балансу
billingScene.hears("💰Баланс", async (ctx) => {
  login = ctx.session.login;
  ctx.replyWithHTML(`Ваш баланс: <b>${await getUserBalance(login)} грн.</b>`);
});

//відображення останніх 10 платежів
billingScene.hears("📈Останні платежі", async (ctx) => {
  login = ctx.session.login;
  const pays = await getUserPays(login);
  let paysMarkup = "";

  for (let i = 0; i < Math.min(10, pays.length); i++) {
    if (pays[i].date) {
      const date = new Date(pays[i].date);
      const formattedDate = date.toLocaleString("uk-UA", { timeZone: "Europe/Kiev" });
      paysMarkup += `Дата: <i>${formattedDate}</i>\nСума: <b>${pays[i].summ} грн.</b>\n\n`;
    }
  }

  ctx.replyWithHTML(`<b>Останні 10 платежів:</b>\n\n${paysMarkup}`);
});

//взяти кредит
billingScene.hears("🤑Кредит", async (ctx) => {
  login = ctx.session.login;
  ctx.replyWithHTML(`Ви не можете взяти кредит.`);
});


//відображення контактів
billingScene.hears("📋Контакти провайдера", async (ctx) => {
  ctx.replyWithHTML(`<b>🏢 НАША АДРЕСА:</b>
м. Калуш, вул. Б.Хмельницького, 14\n
<b>📱 ТЕЛЕФОНИ:</b>
(099) 565-44-48
(098) 565-44-48
(093) 565-44-48\n
<b>📧 ЕЛЕКТРОННА ПОШТА:</b>
manager@itlux.if.ua\n
<b>🕗 ГРАФІК РОБОТИ</b>:
Пн-Чт з 8:30 до 18:00
Пт з 8:30 до 17:00
Сб 9:00 до 16:00
Нд Вихідний
`);
});

//скарга
billingScene.hears("🤬Подати скаргу", async (ctx) => {
  ctx.replyWithHTML(
    `Ви там собі не видумуйте, все у вас добре і скаржитись вам ні на шо. Хай щастить!`
  );
});

//інформація про абонента
billingScene.hears("🤷‍♂️Хто я?", async (ctx) => {
  await ctx.replyWithHTML(await getUserAllInfo(ctx.session.login));
});

module.exports = { billingScene };
