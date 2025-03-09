const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function startup()
{
    db = await sqlite.open({
        filename: "records.db",
        driver: sqlite3.Database
    })
}

async function add_record(record){
    await db.run(`INSERT INTO Records (album_name, artist, genre, year, rating, condition, price)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`,
                   [record.album_name, record.artist, record.genre, record.year, record.rating, record.condition, record.price]);
}

async function get_all_records(){
    return await db.all("SELECT * FROM Records");
}

module.exports = {
    startup,
    add_record,
    get_all_records
}