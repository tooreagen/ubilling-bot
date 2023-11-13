const { connectionUbilling } = require("../db");

//зчитування ПІБ абонента
const getUserRealname = async (login) => {
  const sqlQueryRealname = `SELECT realname FROM realname WHERE login='${login}'`;

  try {
    const resultRealname = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQueryRealname, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (resultRealname.length !== 0) {
      return resultRealname[0].realname;
    }

    return "Noname";
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserRealname };
