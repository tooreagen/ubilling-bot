const { Markup } = require("telegraf");

const getMainMenu = () => {
  return Markup.keyboard([["Мої задачі", "Додати задачу"], ["Авторизація"]]).resize();
};

const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.button.callback("Да", "yes"), Markup.button.callback("Нет", "no")],
    { columns: 2 }
  );
};
module.exports = { getMainMenu, yesNoKeyboard };
