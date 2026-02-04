const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    content: {
        type: String,
        required: true,
        trim: true
    },

    media: {
        type: {
            type:String,
            enum: ['image', 'video', 'none'],
            default: 'none'
        },

        url: {
            type: String,
            default: 'none'
        }
    },

    likesCount: {
        type: Number,
        default: 0
    },

    commentCount: {
        type: Number,
        default: 0
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model("Post", postsschema);