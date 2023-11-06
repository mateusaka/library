const Author = require("../models/author");

const AuthorController = {
    list: async (req, res) => {
        try {
            const allAuthors = await Author.find()
            .sort({ lastName: 1 })
            .exec();

            res.render("author-list", {
                title: "Author List",
                authorList: allAuthors
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Author list");
    },

    detail: async (req, res) => {
        res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
    },

    createGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Author create GET");
    },

    createPost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Author create POST");
    },

    deleteGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Author delete GET");
    },

    deletePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Author delete POST");
    },

    updateGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Author update GET");
    },

    updatePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Author update POST");
    },
}

module.exports = AuthorController;