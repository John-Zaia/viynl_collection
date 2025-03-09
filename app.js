const express = require("express");
const mustacheExpress = require("mustache-express");
const model = require("./model.js");
const router = require("./controller.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use("/", router);

async function startup() {
    await model.startup();
    app.listen(3000, function() {
        console.log("Listening on port 3000");
    });
}

startup();