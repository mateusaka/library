require('dotenv').config();

const express = require("express");

const path = require("path");
const db = require("./database/database");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");
const wikiRouter = require("./routes/wiki");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);
app.use("/users", usersRouter);
app.use("/wiki", wikiRouter);

app.listen(PORT, () => {
    console.log("Server is up!");

    db.then(() => {
        console.log("DB is up!");
    })
    .catch(error => {
        console.log("Error on DB: " + error);
    });    
});