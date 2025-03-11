const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function makeConnection()
{
  db = await sqlite.open({
    filename: 'gym.db',
    driver: sqlite3.Database
  })
};


async function workoutHistory(variable){
    //const results = await db.all("SELECT * FROM Workout WHERE Exercise = ?", [variable.exercise]);
    const results = await db.all("SELECT * FROM Workout WHERE Exercise = ? ORDER BY rowid DESC LIMIT 1", [variable.exercise]);
    //console.log(variable.exercise);
    //console.log(results);
    return results;
}

async function workoutData(variable)
{
    await db.run("INSERT INTO Workout VALUES (?,?,?,?,?,?)", 
                [variable.exercise, variable.weight, variable.set1, variable.set2, variable.set3, variable.rpe]);
}

async function getAll()
{
    const results = await db.all("SELECT * FROM Exercises");
    return results;
}

async function addExercise(exercise)
{
    await db.run("INSERT INTO Exercises VALUES (?)", [exercise.name]);
}



module.exports = { makeConnection, getAll, addExercise, workoutData, workoutHistory };
