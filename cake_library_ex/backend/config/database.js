const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected");
    } catch(err){
        console.error("The database has given up :)", err.message);
        process.exit(1)
    }
};

module.exports = connectDb