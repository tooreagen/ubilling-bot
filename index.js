
// require("dotenv").config({ path: "./config/.env" });

const { setupBot } = require("./bot");


const startingBot = async () => {
    await setupBot().launch();
}

startingBot();