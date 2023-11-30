const { Markup } = require("telegraf");

//клавіатура для неавторизованих юзерів
const notAuthKeyboard = () => {
  return Markup.keyboard([["Контакти", "Заявка на підключення"]]).resize();
};

//клавіатура для авторизованих юзерів
const mainKeyboard = () => {
  return Markup.keyboard([
    ["💸Фінансові операції", "⚙️Технічні питання"],
    ["📋Контакти провайдера", "🤬Подати скаргу"],
    ["🤷‍♂️Хто я?", "↩️Вихід"],
  ]).resize();
};

//фінансова клавіатура
const financeKeyboard = () => {
  return Markup.keyboard([["💰Баланс", "📈Останні платежі", "🤑Кредит"], ["⬅️Назад"]]).resize();
};

//технічна клавіатура
const techKeyboard = () => {
  return Markup.keyboard([["🛠Виклик майстра"], ["⬅️Назад"]]).resize();
};

//клавіатура запитання да, ні
const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.button.callback("Да", "yes"), Markup.button.callback("Нет", "no")],
    { columns: 2 }
  );
};
module.exports = { mainKeyboard, yesNoKeyboard, notAuthKeyboard, financeKeyboard, techKeyboard };
