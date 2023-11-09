const Genre = require("../models/genre");
const Book = require("../models/book");

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

            if(genre === null) {
                const error = new Error("Genre not found");
                error.status = 404;

                return error;
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
        res.send("NOT IMPLEMENTED: Genre create GET");
    },

    createPost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Genre create POST");
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