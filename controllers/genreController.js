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
            res.send("An error has occurred.");
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
            res.send("An error has occurred.");
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
        try {
            await body("name", "Genre name must contain at least 3 characters.")
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
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Genre create POST");
    },

    deleteGet: async (req, res) => {
        try {
            const [
                genre,
                allBooksByGenre
            ] = await Promise.all([
                Genre.findById(req.params.id).exec(),
                Book.find({ genre: req.params.id }, "title summary").exec()
            ]);

            if(genre === null) {
                res.redirect("/catalog/genres");
            }

            res.render("genre-delete", {
                title: "Delete Genre",
                genre: genre,
                genreBooks: allBooksByGenre
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Genre delete GET");
    },

    deletePost: async (req, res) => {
        try {
            const [
                genre,
                allBooksByGenre
            ] = await Promise.all([
                Genre.findById(req.params.id).exec(),
                Book.find({ genre: req.params.id }, "title summary").exec()
            ]);

            if(allBooksByGenre.length > 0) {
                res.render("genre-delete", {
                    title: "Delete Genre",
                    genre: genre,
                    authorBooks: allBooksByGenre
                });
            }
            else {
                await Genre.findByIdAndDelete(req.body.genreid);

                res.redirect("/catalog/genres");
            }
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Genre delete POST");
    },

    updateGet: async (req, res) => {
        try {
            const genre = await Genre.findById(req.params.id).exec();

            if(genre === null) {
                return res.send("Genre not found");
            }

            res.render("genre-form", {
                title: "Update Genre",
                genre: genre
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Genre update GET");
    },

    updatePost: async (req, res) => {
        try {
            await body("name", "Genre must not be empty.")
                .isLength({ min: 1 })
                .escape()
                .run(req);

            const errors = validationResult(req);

            const genre = new Genre({
                name: req.body.name,
                _id: req.params.id
            });

            if(!errors.isEmpty()) {
                const genre = await Genre.findById(req.params.id);

                res.render("genre-form", {
                    title: "Update Genre",
                    genre: genre
                });
            }
            else {
                const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, genre);

                res.redirect(updatedGenre.url);
            }
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Genre update POST");
    },
}

module.exports = GenreController;