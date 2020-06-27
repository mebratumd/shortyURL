const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const cors = require('cors');
const path = require('path');
const { check,validationResult } = require('express-validator');
const Shorty = require('./models/url.js');
require('dotenv').config()

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.once('open',() => {
  console.log("Database connected...");
});


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.set("views",path.join(__dirname,'views'));
app.set('view engine', 'pug');



app.get("/", (req,res) => {
  res.render("index",{title:"Shorty URL"});

});

app.post("/short",[check('url').isURL().withMessage('Invalid URL.').matches(/^https?/).withMessage('Invalid URL.')],async (req,res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let url = await Shorty.find({originalURL:req.body.url}).exec();

  if (url.length > 0) {

    return res.json({success:true,truncated:`http://localhost:5000/${url[0].newURL}`});

  } else {

    let newUrl = new Shorty({
      originalURL: req.body.url,
      newURL: nanoid()
    });

    let shortyURL = await newUrl.save()

    return res.json({success:true,truncated:`http://localhost:5000/${shortyURL.newURL}`});

  }

});

app.get("/:id", async (req,res) => {

  let url = await Shorty.findOne({newURL:req.params.id});

  if (url) {
    return res.redirect(url.originalURL);
  } else {
    return res.render('notfound',{title:'Shorty URL | Not Found'});
  }

});

app.get("*", (req,res) => {

  return res.render('notfound',{title:'Shorty URL | Not Found'});

});


app.listen(process.env.PORT,()=>{
  console.log(`Listening on port ${process.env.PORT}...`);
});
