const { Markup } = require("telegraf");

const getMainMenu = () => {
  console.log("Keyboard");
  return Markup.keyboard([["Мої задачі", "Додати задачу"], ["Карпати!"]]).resize();
};

module.exports = { getMainMenu };
