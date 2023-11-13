const { connectionUbilling } = require("../db");

//зчитування платежів абонента
const getUserPays = async (login) => {
  const sqlQueryPays = `SELECT date, summ 
                        FROM payments 
                        WHERE login='${login}'
                        AND note NOT LIKE 'BALANCESET%'
                        AND summ > 0
                        ORDER BY date DESC;
                        `;

  try {
    const resultPays = await new Promise((resolve, reject) => {
      connectionUbilling.query(sqlQueryPays, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (resultPays.length !== 0) {
      return resultPays;
    }

    return "NoPays";
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserPays };
