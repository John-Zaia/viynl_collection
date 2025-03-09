const express = require('express');
const router = express.Router();
const model = require('./model.js');

router.get("/", async (req, res) => {
    res.render("homepage");
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

module.exports = router;