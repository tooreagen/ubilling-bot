const { Markup } = require("telegraf");

const getMainMenu = () => {
  console.log("Keyboard");
  return Markup.keyboard([["Мои задачи", "Добавить задачу"], ["Смотивируй меня"]]).resize();
};

module.exports = { getMainMenu };
