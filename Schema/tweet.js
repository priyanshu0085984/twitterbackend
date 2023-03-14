const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    text:{
        type:String,
        required:[true,""],
        default:"This is a default tweet",
        trim:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }],
    media: [{
        type: String,
        trim:true
    }],
    hashtags: [{
        type: String,
        trim: true
    }],
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Tweet = mongoose.model('Tweet',tweetSchema);
module.exports = Tweet;