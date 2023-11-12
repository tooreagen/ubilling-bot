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

  return userData;
};

module.exports = { getUserAllInfo };
