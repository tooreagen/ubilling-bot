const { Markup } = require("telegraf");

//клавіатура для неавторизованих юзерів
const notAuthKeyboard = () => {
  return Markup.keyboard([["Контакти", "Заявка на підключення"]]).resize();
};

//клавіатура для авторизованих юзерів
const mainKeyboard = () => {
  return Markup.keyboard([
    ["Баланс", "Останні платежі"],
    ["Контакти", "Подати скаргу"],
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
