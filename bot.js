const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  bot.start((ctx) => ctx.reply("Вітаю!"));

  bot.on("message", async (ctx, next) => {
    const chatID = ctx.chat.id;
    ctx.reply("chatID: " + chatID);
    next();
  });

  bot.hears("привет", (ctx) => ctx.reply("та написав привет"));
  bot.hears("1", (ctx) => ctx.reply("та написав один"));
  bot.hears("рок", (ctx) => ctx.reply("рок-н-рол"));

  bot.use(async (ctx) => {
    await ctx.reply(
      "Что нужно сделать?",
      Markup.keyboard([["Авторизація", "Налаштування"]]).resize()
    );
  });

  return bot;
};

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { setupBot };

//bot.on("message") — он запускается каждый раз, когда кто-то отправляет сообщение.

// const setupBot = () => {

//   //   bot.command("help", (ctx) => {
//   //     ctx.reply("Ви запросили допомогу! Я вам допоможу. ");
//   //   });

//   //   bot.command("settings", (ctx) => {
//   //     ctx.reply("Ви запросили налаштування. ");
//   //   });

//   const getCoinSide = () => (getRandomInt(0, 1) === 0 ? "Орёл" : "Решка");
//   const coinInlineKeyboard = Markup.inlineKeyboard([
//     Markup.button.callback("Подбросить ещё раз", "flip_a_coin"),
//     Markup.button.callback("Еще кнлпочка", "1"),
//   ]);
//   bot.hears("Подбросить монетку", (ctx) => ctx.reply(getCoinSide(), coinInlineKeyboard));
//   //Подбросить ещё раз
//   bot.action("flip_a_coin", async (ctx) => {
//     await ctx.editMessageText(
//       `${getCoinSide()}\nОтредактировано: ${new Date().toISOString()}`,
//       coinInlineKeyboard
//     );
//   });

//   const getRandomNumber = () => getRandomInt(0, 3);
//   const numberInlineKeyboard = Markup.inlineKeyboard([
//     Markup.button.callback("Сгенерировать новое  инлайн", "random_number"),
//   ]);
//   bot.hears("Случайное число", (ctx) =>
//     ctx.reply(getRandomNumber().toString(), numberInlineKeyboard)
//   );
//   bot.action("random_number", async (ctx) => {
//     await ctx.editMessageText(
//       `${getRandomNumber()}\nОтредактировано: ${new Date().toISOString()}`,
//       numberInlineKeyboard
//     );
//   });

//   bot.use(async (ctx) => {
//     await ctx.reply(
//       "Что нужно сделать?",
//       Markup.keyboard([["Подбросить монетку", "Случайное число"]]).resize()
//     );
//   });

//   return bot;
// };

// //bot.on("message") — он запускается каждый раз, когда кто-то отправляет сообщение.
// //Через ctx.reply мы отвечаем в тот же чат, а через ctx.telegram.sendMessage(chat_id, `Hello`) можно отправить сообщение в произвольный чат.
// //hears — регистрирует middleware, которые реагируют на текстовые сообщения указанного содержания
