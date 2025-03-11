const express = require("express");

const mustacheExpress = require("mustache-express");
const app = express();

const Model = require("./model.js"); // include/import our model

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");
///////////////////////////////////////////////////////////////////

async function start(){
    await Model.makeConnection();
}
start();

app.get("/update/:id", async function(req,res) 
{ 
    //console.log(req.query);
    await Model.updateWorkout(req.query, req.params.id);
    const exerciseArray = await Model.getAll();
    res.render("page", { options: exerciseArray });
});

app.get("/delete/:id", async function(req,res) 
{ 
    await Model.deleteEmployee(req.params.id);
    const exerciseArray = await Model.getAll();
    res.render("page", { options: exerciseArray });
});

app.get("/workoutHistory", async function(req, res){
    const history = await Model.workoutHistory(req.query);
    //console.log(history);
    const exerciseArray = await Model.getAll();
    res.render("page", { options: exerciseArray, history: history });
});

app.get("/workoutData", async function(req, res){
    const exerciseArray = await Model.getAll();
    const weight = Number(req.query.weight);
    const set1 = Number(req.query.set1);
    const set2 = Number(req.query.set2);
    const set3 = Number(req.query.set3);
    const rpe = Number(req.query.rpe);

    if(!req.query.exercise){
        res.render("page", { options: exerciseArray, exerciseChoice: true });
    }
    else if(!weight || isNaN(weight) || weight < 0){
        res.render("page", { options: exerciseArray, weightChoice: true });
    }
    else if(!set1 || isNaN(set1) || set1 < 0){
        res.render("page", { options: exerciseArray, set1Choice: true });
    }
    else if(!set2 || isNaN(set2) || set2 < 0){
        res.render("page", { options: exerciseArray, set2Choice: true });
    }
    else if(!set3 || isNaN(set3) || set3 < 0){
        res.render("page", { options: exerciseArray, set3Choice: true });
    }
    else if(!rpe || isNaN(rpe) || rpe < 0){
        res.render("page", { options: exerciseArray, rpeChoice: true });
    }
    else{
        await Model.workoutData(req.query);
        res.render("page", { options: exerciseArray });
    }
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

////////////////////////////////////////////////////////////////////
app.listen(3000, function() { console.log("server listening on port 3000...")});