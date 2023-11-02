const { Markup } = require("telegraf");

const getMainMenu = () => {
  return Markup.keyboard([["Мої задачі", "Додати задачу"], ["Карпати!"]]).resize();
};

const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.inlineKeyboard("Да", "yes"), Markup.inlineKeyboard("Нет", "no")],
    { columns: 2 }
  );
};

module.exports = { getMainMenu, yesNoKeyboard };
