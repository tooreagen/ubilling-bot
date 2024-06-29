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
      let paysMarkup = "";

      for (let i = 0; i < Math.min(10, resultPays.length); i++) {
        if (resultPays[i].date) {
          const date = new Date(resultPays[i].date);
          const formattedDate = date.toLocaleString("uk-UA", { timeZone: "Europe/Kiev" });
          paysMarkup += `Дата: <i>${formattedDate}</i>\nСума: <b>${resultPays[i].summ} грн.</b>\n\n`;
        }
      }

      return paysMarkup;
    }

    return "Платежі відсутні...";
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getUserPays };
