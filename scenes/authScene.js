const { Scenes, Markup } = require("telegraf");
const { checkLogin, checkPassword } = require("../controllers/authentification");
const { queryToUbillingBase } = require("../helpers/queryToUbillingBase");

//функція встановлення статусу авторизації юзера в БД
const setUserAuthInDB = async (login, chatId) => {
  const sqlQuery = `INSERT INTO tg_bot (login, chat_id, authorized) 
                        VALUES ('${login}', '${chatId}', 1)
                        ON DUPLICATE KEY UPDATE
                        login = '${login}', chat_id = '${chatId}', authorized = 1;
`;
  const resultAuth = await queryToUbillingBase(sqlQuery);
};

//step 1. Запитаємо номер телефону
const step_1 = async (ctx) => {
  await ctx.reply(
    "Надішліть ваш номер телефону",
    Markup.keyboard([Markup.button.contactRequest("Надіслати номер телефону")]).resize()
  );
  return ctx.wizard.next();
};

//step 2. Обробка номера телефона, авторизація або наступний крок вводу логін/пароль
const step_2 = async (ctx) => {
  if (ctx.message && ctx.message.contact) {
    const userPhone = ctx.message.contact.phone_number;
    ctx.reply(`Ваш номер: ${userPhone}`);
    //обробка номера, видваляємо +38
    let formattedPhone = "";
    if (userPhone.startsWith("+38")) {
      formattedPhone = userPhone.slice(3);
    } else if (userPhone.startsWith("38")) {
      formattedPhone = userPhone.slice(2);
    } else {
      formattedPhone = userPhone;
    }

    // Робимо запит до БД.
    const sqlUserExists = `SELECT login FROM phones WHERE mobile LIKE '%${formattedPhone}%'`;
    const userExists = await queryToUbillingBase(sqlUserExists);
    //Якщо абона знайдено
    //Якщо у абонента декілька акаунтів то потрібно вівести весь список
    //(логін, адреса) та список кнопок в якому логін, кнопку нажать і авторизуватись
    if (userExists.length !== 0) {
      //авторизуємо
      const login = userExists[0].login;
      const chatId = ctx.chat.id;
      ctx.session.login = login;
      ctx.session.isAuth = true;

      //встановлення статусу авторизації в БД
      setUserAuthInDB(login, chatId);

      //вхід в сцену білінга для авторизованого користувача
      return ctx.scene.enter("billingScene");
    } else {
      //Якщо абона не знайдено, перекинемо на сцену вводу пароля
      // return ctx.wizard.next();
      await ctx.reply("Номер не знайдено.", Markup.removeKeyboard());
      await ctx.reply(
        "👇 Введіть логін:",
        Markup.inlineKeyboard([Markup.button.callback("🚫 Відміна", "cancel")])
      );

      return ctx.wizard.next();
    }
  } else {
    ctx.reply("Будь ласка, використовуйте кнопку для надсилання номера.");
    return ctx.wizard.back();
  }
};

//step 3 перевірка логіна, введення паролю
const step_3 = async (ctx) => {
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
};

//step 4 перевірка паролю, завершення сесії,
//       надання доступу в бот, встановлення статусу авторизації в БД
const step_4 = async (ctx) => {
  //якщо перед цим ввели відміна то завершуємо сцену
  if (ctx.callbackQuery && ctx.callbackQuery.data === "cancel") {
    ctx.reply("Операція скасована");
    return ctx.scene.leave();
  }

  //перевірка правильності пароля
  if ((await checkPassword(ctx.session.login, ctx.message.text)) === true) {
    ctx.reply(`Дякую! Ви авторизовані.`);

    //втсановлюємо статус авторизації в сесії
    ctx.session.isAuth = true;

    //встановлення статусу авторизації в БД
    const login = ctx.session.login;
    const chatId = ctx.chat.id;
    const sqlQuery = `INSERT INTO tg_bot (login, chat_id, authorized) 
                        VALUES ('${login}', '${chatId}', 1)
                        ON DUPLICATE KEY UPDATE
                        login = '${login}', chat_id = '${chatId}', authorized = 1;
`;

    //встановлення статусу авторизації в БД
    const resultAuth = await queryToUbillingBase(sqlQuery);

    //вхід в сцену білінга для авторизованого користувача
    return ctx.scene.enter("billingScene");
  } else {
    ctx.reply(
      "❗️ Пароль невірний. \n\n 👇 Спробуйте ще:",
      Markup.inlineKeyboard([Markup.button.callback("🚫 Відміна", "cancel")])
    );
  }
};

//Сцена авторизації
const authWizard = new Scenes.WizardScene("authentication", step_1, step_2, step_3, step_4);

module.exports = { authWizard };
