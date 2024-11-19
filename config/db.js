const mongoose = require("mongoose");

const configureDB = async () => {
    try {
        //('mongodb://127.0.0.1:27017/exp-july24');
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
    }
};

module.exports = configureDB;
