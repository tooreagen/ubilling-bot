const { connectionUbilling } = require("../db");

///загальна функція авторизації
const authentification = () => {};

//зчитування логіна
const checkLogin = async (login) => {
  const sqlQuery = `SELECT login FROM users WHERE login='${login}'`;

  try {
    const resultLogin = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    //Якщо логін є, повертаємо його
    if (resultLogin.length !== 0) {
      return resultLogin[0].login;
    }

    //Інакше кажемо що логін не знайдено
    return null;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { authentification, checkLogin };
