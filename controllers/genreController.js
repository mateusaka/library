const Genre = require("../models/genre");
const Book = require("../models/book");

const { body, validationResult } = require("express-validator");

const GenreController = {
    list: async (req, res) => {
        try {
            const allGenre = await Genre.find()
                .sort({ name: 1 })
                .exec();

            res.render("genre-list", {
                title: "Genre List",
                genreList: allGenre
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Genre list");
    },

    detail: async (req, res) => {
        try {
            const [
                genre,
                booksInGenre
            ] = await Promise.all([
                Genre.findById(req.params.id).exec(),
                Book.find({ genre: req.params.id }, "title summary").exec()
            ]);

            if (genre === null) {
                /* const error = new Error("Genre not found");
                error.status = 404; */

                return res.send("Genre not found");
            }

            res.render("genre-detail", {
                title: "Genre Detail",
                genre: genre,
                genreBooks: booksInGenre
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
    },

    createGet: async (req, res) => {
        res.render("genre-form", {
            title: "Create Genre"
        });

        //res.send("NOT IMPLEMENTED: Genre create GET");
    },

    createPost: async (req, res) => {
        console.log(req.params.name);

        try {
            await body("name", "Genre name must contain at least 3 characters")
                .trim()
                .isLength({ min: 3 })
                .escape()
                .run(req);

            const errors = validationResult(req);

            const genre = new Genre({
                name: req.body.name
            });

            if (!errors.isEmpty()) {
                res.render("genre-form", {
                    title: "Create Genre",
                    genre: genre,
                    errors: errors.array()
                });

                return;
            }
            else {
                const genreExists = await Genre.findOne({ name: req.body.name })
                    .collation({ locale: "en", strength: 2 })
                    .exec();

                if (genreExists) {
                    res.redirect(genreExists.url);
                }
                else {
                    await genre.save();

                    res.redirect(genre.url);
                }
            }
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Genre create POST");
    },

    deleteGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Genre delete GET");
    },

    deletePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Genre delete POST");
    },

    updateGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Genre update GET");
    },

    updatePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Genre update POST");
    },
}

module.exports = GenreController;