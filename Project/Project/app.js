const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://dbUser:dbUserPassword@maro1904dt162gproject.ky2yw.mongodb.net/myguild?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}); 
 const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

let Guilds = require("./app/models/guilds.js");
let myRoster = require("./app/models/mycourses.js");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/guilds', function (req, res) {
Guilds.aggregate([
    {
       $lookup: {
          from: myRoster.collection.name,
          localField: "name",   
          foreignField: "name",  
          as: "fromItems"
       }
    },
    {
       $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
    }, 
    { $project: { active:0, TBC:0, value: 0, country: 0 } }
 ]).exec(function(err, Guilds){
    res.json(Guilds);
 });

});

app.get('/api/myRosters', function (req, res) {
  myRoster.aggregate([
    {
       $lookup: {
          from: Guilds.collection.name,
          localField: "name",   
          foreignField: "name",  
          as: "fromItems"
       }
    },
    {
       $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
    },
    { $project: { currentGuild:0, reliable:0 } }
 ]).exec(function(err, myRoster){
    res.json(myRoster);
 });
});


app.get('/api/guilds/:name', function (req, res) {
  Guilds.find({ name: req.params.name }, function(err, Guilds) {
    if (err){
      res.send(err);
    }
    res.json(Guilds);
  });
});


app.get('/api/myRosters/:name', function (req, res) {
  myRoster.find({ name: req.params.name }, function(err, myRoster) {
    if (err){
      res.send(err);
    }
    res.json(myRoster);
  });
});


app.post('/api/myRosters/add', function (req, res) {
  const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
  boolMyRoster = true;
  boolGuild = false;
  const tmpActive = req.body.active;
  const tmpTbc = req.body.TBC;
    let tmpTBC = "";
    if (req.body.active == true){
      tmpString == "YES";
    }
    else{
      tmpString == "NO";
    }
    if (req.body.TBC == true){
      tmpTBC == "YES";
    }
    else{
      tmpTBC == "NO";
    }
    let newRoster = new myRoster();
    let newGuild = new Guilds();
    newGuild.reliable = tmpTbc;;
    newGuild.name = req.body.name;
    newGuild.currentGuild = "Ruth";
    newRoster.name = req.body.name;
    newRoster.active = tmpActive;
    newRoster.TBC = tmpTbc;
    newRoster.value = req.body.value;
    newRoster.class = req.body.class;
    newRoster.rank = req.body.rank;
    newRoster.country = req.body.country;
    myRoster.exists({ name: req.body.name }, function(err, result) {
      if(err){
        console.log(err);
      } 
      else{
        if (result == true){
          boolMyRoster = true;
        }
        else if (result == false){
          boolMyRoster = false;
        }       
      }
  });

sleep(300).then(() => {
  if (boolMyRoster){
    console.log("Person already exists, modify it instead.")
  };

    if (!boolMyRoster){
      newRoster.save(function(err){
        if (err){
          res.send(err);
        }
      });
      newGuild.save(function(err){
        if (err){
          res.send(err);
        }
      });
    }
  res.redirect("/");
  });
});

app.put("/api/myRosters/:name", async (req, res, next)=>{
  
  tmpBool = "";
  await myRoster.findOne({
    name: req.params.name
}, (err, myRoster) => { 
  tmpBool = myRoster.active;
  
});
if (tmpBool == "YES"){
  await myRoster.findOneAndUpdate({ name: req.params.name }, { $set: { active: "NO" } }, { new: true }, function(err, doc) {
  });
}
  if (tmpBool == "NO"){
  await myRoster.findOneAndUpdate({ name: req.params.name }, { $set: { active: "YES" } }, { new: true }, function(err, doc) {
  });
}
  res.redirect("/");
});

app.put("/api/myRosters/TBC/:name", async (req, res, next)=>{
  tmpBool = "";
  await myRoster.findOne({
    name: req.params.name
}, (err, myRoster) => { 
  tmpBool = myRoster.TBC;
  
});
if (tmpBool == "YES"){
  await myRoster.findOneAndUpdate({ name: req.params.name }, { $set: { TBC: "NO" } }, { new: true }, function(err, doc) {
  });
}
  if (tmpBool == "NO"){
  await myRoster.findOneAndUpdate({ name: req.params.name }, { $set: { TBC: "YES" } }, { new: true }, function(err, doc) {
  });
}
  res.redirect("/");
});


app.delete('/api/myRosters/:name', function (req, res) {
  let tmpName = req.params.name;
  myRoster.deleteOne({
    name: tmpName
  }, function(err, myRoster){
    if(err){
      res.send(err)
    }
  
      res.json({message: "Deleted person " + tmpName});
    });
});

app.delete('/api/guilds/:name', function (req, res) {
  let tmpName = req.params.name;
  Guilds.deleteOne({
    name: tmpName
  }, function(err, Guilds){
    if(err){
      res.send(err)
    }
  
      res.json({message: "Deleted person " + tmpName});
    });
});



        
app.listen(port, function() {
    console.log("Server running on port " + port);
  });

