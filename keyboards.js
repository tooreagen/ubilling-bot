const { Markup } = require("telegraf");

const getMainMenu = () => {
  return Markup.keyboard([["Мої задачі", "Додати задачу"], ["Карпати!"]]).resize();
};

const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.callbackButton("Да", "yes"), Markup.callbackButton("Нет", "no")],
    { columns: 2 }
  );
};

module.exports = { getMainMenu, yesNoKeyboard };
