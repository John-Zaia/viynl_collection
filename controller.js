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
        price: req.body.price,
        last_played: req.body.last_played
        };

        await model.add_record(record);
        res.redirect("/");
});

router.post("/last_played/:id", async (req, res) =>{
    const current_date = new Date();
    const date = current_date.toISOString().split('T')[0].toString();
    const id = req.params.id;

    await model.add_last_played(date, id);
    res.redirect("/");
})

router.post("/update/:id", async (req, res) =>{
    const id = req.params.id
    const record = {
        album_name: req.body.album_name,
        artist: req.body.artist,
        genre: req.body.genre,
        year: req.body.year,
        rating: req.body.rating,
        condition: req.body.condition,
        price: req.body.price,
        last_played: req.body.last_played
    }
    await model.update_record(id, record);
    res.redirect("/");
})

router.post("/delete", async (req, res) =>{
    await model.delete_all_records();
    res.redirect("/");
})

router.post("/deleterecord/:id", async (req, res) =>{
    const id = req.params.id;
    const url = req.headers.referer;

    if (url && url.includes("/filter"))
    {
        const {album_name, artist, genre, year, rating, condition, price} = req.body;

        const filters = {album_name, artist, genre, year, rating, condition, price}
    
        const valid_filters = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value !== "")
        );
        
        await model.delete_record(id);
        const filtered_records = await model.filter_records(valid_filters);
        res.render("homepage", {records: filtered_records});
    }
    else if (url && url.includes("/sort"))
    {
        await model.delete_record(id);
        const sorted_records = await model.sort_by_year();
        res.render("homepage", {records: sorted_records})
    }
    else
    {
        await model.delete_record(id);
        res.redirect("/");
    }
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

router.post("/sort", async (req, res) =>{
    const sorted_records = await model.sort_by_year();
    res.render("homepage", {records: sorted_records})
})

module.exports = router;