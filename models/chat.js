const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from:{
        type: String,
        required: true,
    },
    to:{
        type :String,
        required: true,
    },
    message:{
        type: String,
        maxLenght: 50,
    },
    createdAt:{
        type : Date,
        required: true,
    },

});

const Chat =  mongoose.model('chats',chatSchema);

module.exports =Chat;
