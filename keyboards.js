import Markup from "telegraf/markup.js";

export function getMainMenu() {
  console.log("Keyboard");
  return Markup.keyboard([["Мои задачи", "Добавить задачу"], ["Смотивируй меня"]])
    .resize()
    .extra();
}
