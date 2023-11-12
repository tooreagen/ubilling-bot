const { Scenes, Markup } = require("telegraf");
const { checkLogin, checkPassword } = require("../controllers/authentification");
const { connectionUbilling } = require("../db");

//Сцена авторизації
const authWizard = new Scenes.WizardScene(
  "authentication",
  //step 1 введення логіну
  (ctx) => {
    ctx.reply(
      "👇 Введіть логін:",
      Markup.inlineKeyboard([Markup.button.callback("🚫 Відміна", "cancel")])
    );

    return ctx.wizard.next();
  },

  //step 2 перевірка логіна, введення паролю
  async (ctx) => {
    //якщо перед цим ввели відміна то завершуємо сцену
    if (ctx.callbackQuery && ctx.callbackQuery.data === "cancel") {
      ctx.reply("Операція скасована");
      return ctx.scene.leave();
    }

    //перевірка наявності логіна
    if ((await checkLogin(ctx.message.text)) === true) {
      //сберігаємо логін у сесію
      ctx.session.login = ctx.message.text;

      ctx.reply(
        `👇 Тепер введіть ваш пароль:`,
        Markup.inlineKeyboard([Markup.button.callback("🚫 Відміна", "cancel")])
      );
      return ctx.wizard.next();
    } else {
      ctx.reply(
        "❗️ Логін невірний. \n\n 👇 Спробуйте ще:",
        Markup.inlineKeyboard([Markup.button.callback("🚫 Відміна", "cancel")])
      );
    }
  },

  //step 3 перевірка паролю, завершення сесії,
  //       надання доступу в бот, встановлення статусу авторизації в БД
  async (ctx) => {
    //якщо перед цим ввели відміна то завершуємо сцену
    if (ctx.callbackQuery && ctx.callbackQuery.data === "cancel") {
      ctx.reply("Операція скасована");
      return ctx.scene.leave();
    }

    //перевірка правильності пароля
    if ((await checkPassword(ctx.session.login, ctx.message.text)) === true) {
      ctx.reply(`Дякую! Ви авторизовані.`);

      //встановлення статусу авторизації в БД
      login = ctx.session.login;
      chatId = ctx.chat.id;
      const sqlQuery = `INSERT INTO tg_bot (login, chat_id, authorized) 
                        VALUES ('${login}', '${chatId}', 1)
                        ON DUPLICATE KEY UPDATE
                        login = '${login}', chat_id = '${chatId}', authorized = 1;
`;

      //встановлення статусу авторизації в БД
      try {
        const resultAuth = await new Promise((resolve, reject) => {
          connectionUbilling.query(sqlQuery, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      } catch (err) {
        console.error(err);
      }

      ///////////// тут треба надати доступ в бот /////////////////

      // return ctx.scene.leave();
      return ctx.scene.enter("billingScene");
    } else {
      ctx.reply(
        "❗️ Пароль невірний. \n\n 👇 Спробуйте ще:",
        Markup.inlineKeyboard([Markup.button.callback("🚫 Відміна", "cancel")])
      );
    }
  }
);

module.exports = { authWizard };
