const { Markup } = require("telegraf");

const getMainMenu = () => {
  return Markup.keyboard([
    ["Авторизація"],
    ["Мої задачі", "Додати задачу"],
  ]).resize();
};

const yesNoKeyboard = () => {
  return Markup.inlineKeyboard(
    [Markup.button.callback("Да", "yes"), Markup.button.callback("Нет", "no")],
    { columns: 2 }
  );
};
module.exports = { getMainMenu, yesNoKeyboard };
