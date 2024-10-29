const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const methodOverride = require('method-override');
const Chat = require('./models/chat.js');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));


const mongoose = require('mongoose');

main().then(console.log('connection succesful'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



app.get('/',(req,res)=>{
    res.send('root is working')
});

app.get('/chats', async (req,res)=>{
   let chats = await Chat.find();
  // console.log(chats);
   res.render('index.ejs',{chats})
})


// new route
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
})
// create route 
app.post('/chats',(req,res)=>{
    let {from,to,message} = req.body;
    let newChat =new Chat({
        from: from,
        to: to,
        message : message,
        createdAt : new Date(),
    })
    newChat.save().then(res=>{console.log('chat saved')}).catch(err=>{console.log(err)});
    res.redirect('/chats')
})

// edit route
app.get('/chats/:id/edit',async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id)
    res.render('edit.ejs',{id,chat});
})

//update route
app.put('/chats/:id',async(req,res)=>{
    let {id} = req.params;
    let {Newmessage} = req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,{message:Newmessage},{runValidators : true , new : true});
    console.log(updatedChat);
    res.redirect('/chats');
})

// delete route
app.delete('/chats/:id',async(req,res)=>{
    let {id}= req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats')
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`); 
})
