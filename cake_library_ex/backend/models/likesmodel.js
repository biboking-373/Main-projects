const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    posts: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, {
    timestamps: true,
});

likesSchema.index({user: 1, post: 1}, {unique: true});

module.exports = mongoose.model("Like", likesSchema);