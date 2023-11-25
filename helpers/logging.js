const fs = require("fs").promises;
const moment = require("moment");

const logging = async (fileName, logString = "notext", chatId, login = "noauth") => {
  try {
    const currentDate = moment().format("DD-MM-YYYY HH:mm:ss");
    console.log(logString);
    await fs.appendFile(fileName, `${currentDate} ${login} ${chatId} ${logString}\n`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { logging };
