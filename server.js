const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('serve.log',log+'\n',(err)=>{
    if(err){
      console.log('Unable to append to server log.');
    }
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintence.hbs',{
    pageTitle: 'Maintence Page',
    Message: 'This page is currently on main maintenance, well back soon'
  });
  next();
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});


app.get('/',(req, res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page enjoy!'
  })
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/maintence',(req,res)=>{
  res.render('maintence.hbs',{
    pageTitle: 'Maintence Page',
    header: ' Maintence Page',
    Message: 'This page is currently on main maintenance, well back soon'
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error:'Unable to fill your request'
  }
  );
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
