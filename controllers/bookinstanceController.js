const BookInstance = require("../models/bookinstance");

const BookInstanceController = {
    list: async (req, res) => {
        res.send("NOT IMPLEMENTED: BookInstance list");
    },

    detail: async (req, res) => {
        res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
    },

    createGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: BookInstance create GET");
    },

    createPost: async (req, res) => {
        res.send("NOT IMPLEMENTED: BookInstance create POST");
    },

    deleteGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: BookInstance delete GET");
    },

    deletePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: BookInstance delete POST");
    },

    updateGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: BookInstance update GET");
    },

    updatePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: BookInstance update POST");
    },
}

module.exports = BookInstanceController;