const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userschema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true //prevents mistaken whitespaces
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match:[/.+\@.+\..+/, 'Please fill a valid email address']
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },
});

module.exports = mongoose.model("User", userschema);