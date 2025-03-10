const express = require("express");

const mustacheExpress = require("mustache-express");
const app = express();

const Model = require("./model.js"); // include/import our model

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

async function start(){
    await Model.makeConnection();
}
start();

app.get("/addWorkout", async function(req, res){
    await Model.addWorkout(req.query);
    
    console.log(req.query)
});

app.get("/selectExercise", async function(req, res){
    //await Model.selectExercise(req.query);
    const selected = await Model.selectExercise(req.query);
    const exerciseArray = await Model.getAll();
    res.render("page", { options: exerciseArray });
    console.log(selected[0].Exercise);
});

app.get("/addExercise", async function(req, res){
    await Model.addExercise(req.query);
    const exerciseArray = await Model.getAll();
    res.render("page", { options: exerciseArray });
});

app.get("/newExercise", async function(req, res){
    const exerciseArray = await Model.getAll();
    res.render("page", { options: exerciseArray, addExercise: true });
});

app.get("/page", async function(req, res){
    const exerciseArray = await Model.getAll();
    //console.log(exerciseArray.name);
    res.render("page", { options: exerciseArray });
});

app.get(/^(.+)$/, function(req,res) 
{
  res.sendFile( __dirname + req.params[0]);
});

app.listen(3000, function() { console.log("server listening on port 3000...")});