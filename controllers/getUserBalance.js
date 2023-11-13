const { connectionUbilling } = require("../db");

//зчитування балансу абонента
const getUserBalance = async (login) => {
  const sqlQueryCash = `SELECT cash FROM users WHERE login='${login}'`;

  try {
    const resultCash = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQueryCash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (resultCash.length !== 0) {
      return resultCash[0].cash;
    }

    return "Nocash";
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserBalance };
