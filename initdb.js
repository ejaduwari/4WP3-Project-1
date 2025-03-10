// You can use this file to create your employee database and populate it
// with some initial data.  You can run it with: node initdb.js

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("gym.db");

db.serialize(function() {
    // create exercise table
    db.run("DROP TABLE IF EXISTS Exercises");
    db.run("CREATE TABLE Exercises (Exercise TEXT)");

    // create workout table
    db.run("DROP TABLE IF EXISTS Workout");
    db.run("CREATE TABLE Workout (Exercise TEXT, Weight TEXT, Sets REAL)");

});
