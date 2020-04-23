const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

let newTasks = [];
let newWorkTasks = [];

app.get('/',function(req,res)
{
  let days = new Date();
  options = {
    weekday : 'long',
    day : 'numeric',
    month : 'long'
  };

  let week = days.toLocaleDateString('en-US',options);
  res.render('list',{ListTitle : week,TASKS : newTasks});
});

app.get('/work',function(req,res)
{

    let days = new Date();
    options = {
      weekday : 'long',
      day : 'numeric',
      month : 'long'
    };

    let week = days.toLocaleDateString('en-US',options);
  res.render('list',{ListTitle : 'Work List for '+week,TASKS : newWorkTasks});
});

let prevButtons = [];

app.post('/',function(req,res)
{
  prevButtons.push(req.body.list);
  if(req.body.resetButton === 'reset' && prevButtons[prevButtons.length-2]==='Work')
  {
    newTasks = [];
    newWorkTasks = [];
    res.redirect('/work');
  }
  else if (req.body.resetButton === 'reset')
  {
    newTasks = [];
    newWorkTasks = [];
    res.redirect('/');
  }
  else
  {
    let newTask = req.body.newTask;
    if(req.body.list === 'Work')
    {
      newWorkTasks.push(newTask);
      res.redirect('/work');
    }
    else
    {
      newTasks.push(newTask);
      res.redirect('/');
    }
  }
});

app.post('/work',function(req,res){
  let newWorkTask = req.body.newTask;
});


app.listen(process.env.PORT || 3000,function()
{
  console.log("server running on port 3000");
});
