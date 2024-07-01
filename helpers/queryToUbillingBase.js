const { connectionUbilling } = require("../db");
const logging = require("../helpers/logging");

//TODO: функція виконує запити до бази даних, та повертає масив у відповіді

const queryToUbillingBase = (sql) => {
  return new Promise((resolve, reject) => {
    connectionUbilling.query(sql, (error, result) => {
      if (error) {
        logging("./log/error.log", error);
        reject(error);
      }

      resolve(result);
    });
  });
};

module.exports = { queryToUbillingBase };
