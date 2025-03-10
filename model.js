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

async function addWorkout(variable)
{
    await db.run("INSERT INTO Workout VALUES (?,?,?,?,?)", 
                [variable.weight, variable.set1, variable.set2, variable.set3, variable.rpe]);
}

async function selectExercise(variable)
{
    //console.log(variable); // use this to ensure we are passing the right data
    const results = await db.all("SELECT * FROM Exercises WHERE Exercise = ?", [variable.selected]);
    //console.log(results); // use this to ensure we get back the right data
    return results;
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



module.exports = { makeConnection, getAll, addExercise, selectExercise, addWorkout };
