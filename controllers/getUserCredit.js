const { connectionUbilling } = require("../db");

//зчитування кредиту абонента
const getUserCredit = async (login) => {
  const sqlQueryCredit = `SELECT credit, creditexpire FROM users WHERE login='${login}'`;

  try {
    const resultCredit = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQueryCredit, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (resultCredit.length !== 0) {
      return resultCredit[0];
    }

    return "Nocredit";
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserCredit };
