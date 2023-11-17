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
        try {
            const allBooks = await Book.find({}, "title author")
            .sort({ title: 1 })
            .populate("author")
            .exec();

            res.render("book-list", {
                title: "Book List",
                bookList: allBooks
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Book list");
    },

    detail: async (req, res) => {
        try {
            const [
                book,
                bookInstances
            ] = await Promise.all([
                Book.findById(req.params.id).populate("author").populate("genre").exec(),
                BookInstance.find({ book: req.params.id }).exec()
            ]);

            if(book === null) {
                return res.send("Book not found");
            }

            res.render("book-detail", {
                title: book.title,
                book: book,
                bookInstances: bookInstances
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
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