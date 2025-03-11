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

async function deleteEmployee(id)
{
  await db.run("DELETE FROM Workout WHERE rowid=?", id);
}

// async function updateWorkout(variable, id){
//     await db.run("UPDATE Workout SET Weight=?, Set1=?, Set2=?, Set3=?, RPE=? WHERE rowid=?", 
//                 [variable.weight, variable.set1, variable.set2, variable.set3, variable.rpe, id]);
// }

async function updateWorkout(variable, id) {
    //console.log("Updating row ID:", id);
    //console.log("Variable values:", variable);
    
    const result = await db.run(
        "UPDATE Workout SET Weight = ?, Set1 = ?, Set2 = ?, Set3 = ?, RPE = ? WHERE rowid = ?",
        [variable.weight, variable.set1, variable.set2, variable.set3, variable.rpe, id]
    );
    //console.log(`Rows affected: ${result.changes}`);
}


async function workoutHistory(variable){
    //const results = await db.all("SELECT * FROM Workout WHERE Exercise = ?", [variable.exercise]);
    const results = await db.all("SELECT rowid, * FROM Workout WHERE Exercise = ? ORDER BY rowid DESC LIMIT 1", [variable.exercise]);
    //console.log(variable.exercise);
    //console.log(results[0].rowid);
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



module.exports = { makeConnection, getAll, addExercise, workoutData, workoutHistory, deleteEmployee, updateWorkout };
