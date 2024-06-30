require("dotenv").config();
const { Scenes } = require("telegraf");
const {
  mainKeyboard,
  financeKeyboard,
  techKeyboard,
  notAuthKeyboard,
  contactKeyboard,
  chatKeyboard,
} = require("../keyboards");
const { getUserAllInfo } = require("../controllers/getUserAllInfo");
const { getUserBalance } = require("../controllers/getUserBalance");
const { getUserPays } = require("../controllers/getUserPays");
const { userLogout } = require("../controllers/authentification");
const { logging } = require("../helpers/logging");
const { userCredit } = require("../controllers/userCredit");

const { BOT_NAME } = process.env;

const billingScene = new Scenes.BaseScene("billingScene");

//лог авторизованного користувача
billingScene.use(async (ctx, next) => {
  const login = ctx.session.login;
  await logging("./log/allrequest.log", ctx, login);
  return next();
});

billingScene.enter(async (ctx) => {
  //вхід в сцену
  //Відображення користувачу його поточного стану
  await ctx.replyWithHTML(`Вітаємо в боті <b>${BOT_NAME}</b>\n\n` + `Ви авторизовані!`);

  await ctx.replyWithHTML(await getUserAllInfo(ctx.session.login));

  await ctx.replyWithHTML("❗️<b>УВАГА! Функціонал працює в тестовому режимі</b>❗️");

  await ctx.reply("👇 Виконайте запит:", mainKeyboard());
});

//виклик головної клавіатури по команді НАЗАД
billingScene.hears("⬅️Назад", async (ctx) => {
  await ctx.reply("👇 Виконайте запит:", mainKeyboard());
});

//виклик фінансової клавіатури
billingScene.hears("💸Фінансові операції", async (ctx) => {
  await ctx.reply("👇 Виконайте запит:", financeKeyboard());
});

//виклик технічної клавіатури
billingScene.hears("⚙️Технічні питання", async (ctx) => {
  await ctx.reply("👇 Виконайте запит:", techKeyboard());
});

//відображення балансу
billingScene.hears("💰Баланс", async (ctx) => {
  const login = ctx.session.login;
  await ctx.replyWithHTML(`Ваш баланс: <b>${await getUserBalance(login)} грн.</b>`);
});

//відображення останніх 10 платежів
billingScene.hears("📈Останні платежі", async (ctx) => {
  const login = ctx.session.login;
  const paysMarkup = await getUserPays(login);

  ctx.replyWithHTML(`<b>Останні 10 платежів:</b>\n\n${paysMarkup}`);
});

//взяти кредит
billingScene.hears("🤑Кредит", async (ctx) => {
  const login = ctx.session.login;
  const response = await userCredit(login);
  ctx.replyWithHTML(response);
});

//Виклик майстра
billingScene.hears("🛠Виклик майстра", async (ctx) => {
  ctx.replyWithHTML("Ку-ку", 5230163004);
});

//відображення контактів
billingScene.hears("📋Контакти провайдера", async (ctx) => {
  ctx.replyWithHTML(
    `<b>🏢 НАША АДРЕСА:</b>
м. Калуш, вул. Б.Хмельницького, 14\n
<b>📱 ТЕЛЕФОНИ:</b>
(099) 565-44-48
(098) 565-44-48
(093) 565-44-48\n
<b>📧 ЕЛЕКТРОННА ПОШТА:</b>
manager@itlux.if.ua\n
<b>📧 ЧАТ З НАМИ:</b>
https://t.me/ITlux_manager\n
<b>🕗 ГРАФІК РОБОТИ</b>:
Пн-Чт з 8:30 до 18:00
Пт з 8:30 до 17:00
Сб 9:00 до 16:00
Нд Вихідний
`,
    { disable_web_page_preview: true }
  );
});

//виклик клавіатури для зв'язку з оператором
billingScene.hears("⌨️Зв'язок з нами", async (ctx) => {
  await ctx.reply("👇 Виконайте запит:", contactKeyboard());
});

//Написати повідомлення оператору
billingScene.hears("⌨️Написати повідомлення", async (ctx) => {
  await ctx.replyWithHTML(`Виклик оператора...`, chatKeyboard());
  return ctx.scene.enter("chatScene");
});

//скарга
billingScene.hears("🤬Подати скаргу", async (ctx) => {
  ctx.replyWithHTML(
    `Ви там собі не видумуйте, все у вас добре і скаржитись вам ні на шо. Хай щастить!`
  );
});

//пропизиція від абонента на розширення функціоналу
billingScene.hears("💡Пропозиції щодо бота", async (ctx) => {
  ctx.replyWithHTML(
    `Якщо Вам не вистачає функціоналу бота, напишіть нам: <a href="https://t.me/ITlux_manager">Написати</a>`
  );
});

//інформація про абонента
billingScene.hears("🤷‍♂️Хто я?", async (ctx) => {
  await ctx.replyWithHTML(await getUserAllInfo(ctx.session.login));
});

//вихід з бота
billingScene.hears("↩️Вихід", async (ctx) => {
  const login = ctx.session.login;
  const chatId = ctx.chat.id;
  await ctx.replyWithHTML(await userLogout(login, chatId), notAuthKeyboard(), ctx.scene.leave());
  ctx.session.login = "";
  ctx.session.isAuth = false;
});

module.exports = { billingScene };
