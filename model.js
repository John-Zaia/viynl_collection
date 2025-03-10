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

async function delete_record(id){
    await db.run(`DELETE FROM Records WHERE rowid = ?`, [id]);
}

async function get_all_records(){
    return await db.all("SELECT rowid, * FROM Records");
}

async function delete_all_records(){
    return await db.all("DELETE FROM Records")
}

async function view_all_records(){
    return await db.all("SELECT * FROM Records")
}

async function filter_records(filters){
    let sql_query = "SELECT * FROM Records";
    let conditions = [];
    let values = [];

    if (filters.album_name) {
        conditions.push("album_name LIKE ?");
        values.push(`%${filters.album_name}%`);
    }
    if (filters.artist) {
        conditions.push("artist LIKE ?");
        values.push(`%${filters.artist}%`);
    }
    if (filters.genre) {
        conditions.push("genre LIKE ?");
        values.push(`%${filters.genre}%`);
    }
    if (filters.year) {
        conditions.push("year = ?");
        values.push(filters.year);
    }
    if (filters.rating) {
        conditions.push("rating = ?");
        values.push(filters.rating);
    }
    if (filters.condition) {
        conditions.push("condition = ?");
        values.push(filters.condition);
    }
    if (filters.price) {
        conditions.push("price = ?");
        values.push(filters.price);
    }

    if (conditions.length > 0) {
        sql_query += " WHERE " + conditions.join(" AND ");
    }

    const result = await db.all(sql_query, values);
    return result;
}

module.exports = {
    startup,
    add_record,
    get_all_records,
    delete_all_records,
    filter_records,
    view_all_records,
    delete_record
}