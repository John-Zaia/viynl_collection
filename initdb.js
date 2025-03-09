var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("records.db");

db.serialize(function() {

  db.run(`DROP TABLE IF EXISTS Records`);
  db.run(`CREATE TABLE Records (album_name TEXT, artist TEXT, genre TEXT," + 
                                  "year INTEGER, rating INTEGER, condition TEXT," +
                                  "price REAL)`);   
  db.run(`INSERT INTO Records VALUES (?,?,?,?,?,?,?)`,
        ["Ride The Lightning", "Metallica", "Metal", 1985, 10, "Perfect", 23.99]
  )
});


