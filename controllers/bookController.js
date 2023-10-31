const Book = require("../models/book");

const BookController = {
    index: async (req, res) => {
        res.send("NOT IMPLEMENTED: Site Home Page");
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