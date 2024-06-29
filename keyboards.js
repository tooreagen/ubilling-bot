const { Markup } = require("telegraf");

//клавіатура для неавторизованих юзерів
const notAuthKeyboard = () => {
  return Markup.keyboard([["Контакти", "Заявка на підключення"]]).resize();
};

//клавіатура для авторизованих юзерів
const mainKeyboard = () => {
  return Markup.keyboard([
    ["💸Фінансові операції", "⚙️Технічні питання"],
    ["📋Контакти провайдера", "⌨️Зв'язок з нами"],
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

//клавіатура для зв'язку з оператором
const contactKeyboard = () => {
  return Markup.keyboard([
    ["⌨️Написати повідомлення", "🤬Подати скаргу"],
    ["💡Пропозиції щодо бота", "⬅️Назад"],
  ]).resize();
};

//клавіатура під час чату з оператором
const chatKeyboard = () => {
  return Markup.keyboard(["❌Завершити чат❌"]).resize().persistent();
};

//клавіатура запитання да, ні
const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.button.callback("Да", "yes"), Markup.button.callback("Нет", "no")],
    { columns: 2 }
  );
};
module.exports = {
  mainKeyboard,
  yesNoKeyboard,
  notAuthKeyboard,
  financeKeyboard,
  techKeyboard,
  contactKeyboard,
  chatKeyboard,
};
