const BookInstance = require("../models/bookinstance");

const BookInstanceController = {
    list: async (req, res) => {
        try {
            const allBookInstances = await BookInstance.find()
            .populate("book")
            .exec();

            res.render("bookinstance-list", {
                title: "Book Instance List",
                bookInstanceList: allBookInstances
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: BookInstance list");
    },

    detail: async (req, res) => {
        try {
            const bookInstance = await BookInstance.findById(req.params.id)
            .populate("book")
            .exec();

            if(bookInstance === null) {
                return res.send("Book copy not found");
            }

            res.render("bookinstance-detail", {
                title: "Book:",
                bookInstance: bookInstance
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
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