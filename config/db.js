const mongoose = require("mongoose");

const configureDB = async () => {
    try {
        //('mongodb://127.0.0.1:27017/exp-july24');
        //mongodb+srv://aravindakm2001:tEm90DKlxw8B2lgf@cluster0.2xmic.mongodb.net/newDatabase?retryWrites=true&w=majority
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (err) {
        console.log(err);
    }
};

module.exports = configureDB;
