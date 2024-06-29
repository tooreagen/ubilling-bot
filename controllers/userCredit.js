const { apiAxiosQuery } = require("../helpers/apiAxiosQuery");
require("dotenv").config();

//TODO: Функція встановлення кредита абоненту
const userCredit = async (login) => {
  const { UB_API_KEY } = process.env;
  const creditURL = `http://172.16.16.6/?module=remoteapi&key=${UB_API_KEY}&action=asterisk&param=setcredit&login=${login}&money=1000&expiredays=3`;
  try {
    const response = await apiAxiosQuery(creditURL);
    if (response.data === "ASTERISK CREDIT NOT SET: CASH > 0 OR NOT SET") {
      return "Ви не можете взяти кредит. Баланс >= 0";
    }

    if (response.data === "ASTERISK CREDIT NOT AVAILABLE: ALREADY TOOK") {
      return "Ви не оплатили після активації кредита.";
    }

    if (response.data === "ASTERISK CREDIT NOT AVAILABLE: CREDIT IS CURRENTLY ACTIVE") {
      return "Кредит вже встановлено.";
    }

    if (response.data === "ASTERISK CREDIT SET SUCCESSFULY") {
      return "Кредит успішно встановлено.";
    }

    return `Помилка. Повідомте нас будь ласка. <a href="https://t.me/ITlux_manager">Повідомити</a>`;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { userCredit };
