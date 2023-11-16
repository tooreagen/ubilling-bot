const { Markup } = require("telegraf");

//клавіатура для неавторизованих юзерів
const notAuthKeyboard = () => {
  return Markup.keyboard([["Контакти", "Заявка на підключення"]]).resize();
};

//клавіатура для авторизованих юзерів
const mainKeyboard = () => {
  return Markup.keyboard([
    ["💰Баланс", "📈Останні платежі", "🤑Кредит"],
    ["🛠Виклик майстра", "Мої ремонти"],
    ["📋Контакти провайдера", "🤬Подати скаргу"],
    ["🤷‍♂️Хто я?"],
  ]).resize();
};

//клавіатура запитання да, ні
const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.button.callback("Да", "yes"), Markup.button.callback("Нет", "no")],
    { columns: 2 }
  );
};
module.exports = { mainKeyboard, yesNoKeyboard, notAuthKeyboard };
