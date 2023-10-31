const Book = require("../models/book");
const BookInstance = require("../models/bookinstance");
const Author = require("../models/author");
const Genre = require("../models/genre");

const BookController = {
    index: async (req, res) => {
        try {
            const [
                numBooks,
                numBookInstances,
                numAvailableBookInstances,
                numAuthors,
                numGenres
            ] = await Promise.all([
                Book.count({}),
                BookInstance.count({}),
                BookInstance.count({ status: "Available" }),
                Author.count({}),
                Genre.count({})
            ]);

            res.render("index", {
                title: "Local Library Home",
                bookCount: numBooks,
                bookInstanceCount: numBookInstances,
                bookInstanceAvailableCount: numAvailableBookInstances,
                authorCount: numAuthors,
                genreCount: numGenres
            });
        } catch (error) {
            console.log("Error: " + error);
        }
        //res.send("NOT IMPLEMENTED: Site Home Page");
    },

    list: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book list");
    },

    detail: async (req, res) => {
        res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
    },

    createGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book create GET");
    },

    createPost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book create POST");
    },

    deleteGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book delete GET");
    },

    deletePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book delete POST");
    },

    updateGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book update GET");
    },

    updatePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book update POST");
    },
}

module.exports = BookController;