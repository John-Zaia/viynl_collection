const express = require('express');
const router = express.Router();
const model = require('./model.js');
const bodyParser = require('body-parser');

router.get("/", async (req, res) => {
    const records = await model.get_all_records();
    res.render("homepage", { records: records });
});

router.post("/add", async (req, res) =>{

    const record = {
        album_name: req.body.album_name,
        artist: req.body.artist,
        genre: req.body.genre,
        year: req.body.year,
        rating: req.body.rating,
        condition: req.body.condition,
        price: req.body.price
        };
        await model.add_record(record);
        res.redirect("/");
})

router.post("/delete", async (req, res) =>{
    await model.delete_all_records();
    res.redirect("/");
})

router.post("/deleterecord/:id", async (req, res) =>{
    const data = await db.all("DELETE FROM Records WHERE rowid=?", [req.params.id]);
    const id = req.params.id;
    await model.delete_record(id);
    res.redirect("/");
})

router.post("/filter", async (req, res) =>{
    const {album_name, artist, genre, year, rating, condition, price} = req.body;

    const filters = {album_name, artist, genre, year, rating, condition, price}

    const valid_filters = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== "")
    );

    const filtered_records = await model.filter_records(valid_filters);
    res.render("homepage", {records: filtered_records});
})

router.post("/viewall", async (req, res) =>{
    await model.view_all_records();
    res.redirect("/")
})

module.exports = router;