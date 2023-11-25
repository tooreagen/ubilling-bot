const { connectionUbilling } = require("../db");

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

    //Якщо логін є, повертаємо true
    if (resultLogin.length !== 0) {
      if (resultLogin[0].login === login) {
        return true;
      }
    }

    //Інакше false - логін не знайдено
    return false;
  } catch (err) {
    console.error(err);
  }
};

//зчитування пароля
const checkPassword = async (login, pass) => {
  const sqlQuery = `SELECT password FROM users WHERE login='${login}'`;

  try {
    const resultPass = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    //Якщо пароль вірний, повертаємо true
    if (resultPass.length !== 0) {
      if (resultPass[0].password === pass) {
        return true;
      }
    }

    //Інакше false - пароль не вірний
    return false;
  } catch (err) {
    console.error(err);
  }
};

//перевірка на старті чи авторизований юзер
const checkAuth = async (chatId) => {
  const sqlQuery = `SELECT authorized	FROM tg_bot WHERE chat_id='${chatId}'`;

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

    //Якщо авторизований в БД, повертаємо true
    if (resultAuth.length !== 0) {
      if (resultAuth[0].authorized === 1) {
        return true;
      }
    }

    //Інакше false - не авторизовано
    return false;
  } catch (err) {
    console.error(err);
  }
};

//вихід абонета з бота
const userLogout = async (login, chatId) => {
  const sqlQuery = `UPDATE tg_bot SET authorized = 0
                    WHERE login = '${login}' AND chat_id = '${chatId}'
`;

  try {
    const resultLogout = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQuery, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    //Якщо запит не успішний, повідомляємо
    if (resultLogout.affectedRows === 0) {
      return "Помилка!"
    }

    //Якщо успішно то повідомляємо
    return "Ви вийшли.";
  } catch (err) {
    console.error(err);
  }
};
module.exports = { checkLogin, checkPassword, checkAuth, userLogout };
