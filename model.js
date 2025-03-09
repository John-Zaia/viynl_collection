const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
    db = await sqlite.open({
        filename: "records.db",
        driver: sqlite3.Database
    })
}

module.exports = {
    startup
}