require('dotenv').config();
const express = require("express");
const path = require("path");
const db = require("./database/database");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log("Server is up!");

    db.then(() => {
        console.log("DB is up!");
    })
    .catch(error => {
        console.log("Error on DB: " + error);
    });    
});