const moment = require("moment");
const { getUserBalance } = require("./getUserBalance");
const { getUserCredit } = require("./getUserCredit");
const { getUserRealname } = require("./getUserRealname");
const { getUserTariff } = require("./getUserTariff");

//функція формату дати/часу
function formatTimestamp(timestamp) {
  return new Date(timestamp * 1000).toLocaleString("uk-UA", { timeZone: "Europe/Kiev" });
}

//формування повної інформації про юзера
const getUserAllInfo = async (login) => {
  const userData = {};

  try {
    //Дадаємо в об'єкт ПІБ юзера
    userData.name = await getUserRealname(login);

    //Дадаємо в об'єкт баланс юзера
    userData.balance = await getUserBalance(login);

    //Дадаємо в об'єкт тариф юзера
    userData.tariff = await getUserTariff(login);

    //Дадаємо в об'єкт кредит юзера якщо є
    const userCredit = await getUserCredit(login);

    //якщо є кредит то відображаємо, інакше пишемо що відсутній
    if (userCredit.credit !== 0) {
      userData.credit = `<b>${userCredit.credit} грн.</b>`;
    } else {
      userData.credit = `<b>відсутній</b>`;
    }

    //якщо є термін кредиту то відображаємо, інакше просто пусто
    if (userCredit.creditexpire !== 0) {
      userData.creditexpire = `<b>до ${formatTimestamp(userCredit.creditexpire)}</b>`;
    } else {
      userData.creditexpire = ``;
    }
  } catch (error) {
    console.error(error);
  }

  const markup =
    `Ваше ім'я: <b>${userData.name}</b>\n` +
    `Ваш баланс: <b>${userData.balance} грн.</b>\n` +
    `Ваш тариф: <b>${userData.tariff}</b>\n` +
    `У вас кредит: ${userData.credit} ${userData.creditexpire}`;

  return markup;
};

module.exports = { getUserAllInfo };
