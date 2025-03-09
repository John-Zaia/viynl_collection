const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const express = require("express");

const app = express();
app.use(express.json());

async function startup()
{
    db = await sqlite.open({
        filename: "records.db",
        driver: sqlite3.Database
    })

    app.listen(3000, function(){
        console.log("Listening on port 3000")
    })
}

startup();