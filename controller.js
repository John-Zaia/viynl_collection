const express = require('express');
const router = express.Router();
const model = require('./model.js');

router.get("/", async (req, res) => {
    const records = await model.get_all_records();
    res.render("homepage", {records});
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

module.exports = router;