const { getUserBalance } = require("./getUserBalance");
const { getUserRealname } = require("./getUserRealname");
const { getUserTariff } = require("./getUserTariff");

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
  } catch (error) {
    console.error(error);
  }

  const markup =
    `Ваше ім'я: <b>${userData.name}</b>\n` +
    `Ваш баланс: <b>${userData.balance} грн.</b>\n` +
    `Ваш тариф: <b>${userData.tariff}</b>\n`;

  return markup;
};

module.exports = { getUserAllInfo };
