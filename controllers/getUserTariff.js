const { connectionUbilling } = require("../db");

//зчитування тарифу абонента
const getUserTariff = async (login) => {
  const sqlQueryTariff = `SELECT tariff FROM users WHERE login='${login}'`;

  try {
    const resultTariff = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQueryTariff, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    //Дадаємо в об'єкт тариф юзера
    if (resultTariff.length !== 0) {
      return resultTariff[0].tariff;
    }

    return "Notariff";
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserTariff };
