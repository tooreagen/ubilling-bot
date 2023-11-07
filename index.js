const { setupBot } = require("./bot");

const startingBot = async () => {
  await setupBot().launch();
};

startingBot();
