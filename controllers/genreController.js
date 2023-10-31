const Genre = require("../models/genre");

const GenreController = {
    list: async (req, res) => {
        res.send("NOT IMPLEMENTED: Genre list");
    },

    detail: async (req, res) => {
        res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
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