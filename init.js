const mongoose = require('mongoose');

main().then(console.log('connection succesful'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const Chat = require('./models/chat.js');

Chat.insertMany([
    {
        from:'lakshay',
        to:'diya',
        message:'hello! how are you? watcha doin diya?',
        createdAt: new Date(),
    },
    {
        from:'lakshay',
        to:'asees',
        message:'hello! hope you are doing well',
        createdAt: new Date(),
    },
    {
        from:'diya',
        to:'asees',
        message:'wanna watch the serial?',
        createdAt: new Date(),
    },
    {
        from:'diya',
        to:'lakshay',
        message:'watcha doing??',
        createdAt: new Date(),
    },
     {
        from:'lakshay',
        to:'diya',
        message:'hello! how are you?',
        createdAt: new Date(),
    },
    {
        from:'lakshay',
        to:'mumma',
        message:'kya kar rahe ho ji aap?',
        createdAt: new Date(),
    }
]);
   