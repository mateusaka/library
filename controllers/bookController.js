const Book = require("../models/book");
const BookInstance = require("../models/bookinstance");
const Author = require("../models/author");
const Genre = require("../models/genre");

const { body, validationResult } = require("express-validator");

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
        try {
            const [
                allAuthors,
                allGenres
            ] = await Promise.all([
                Author.find().exec(),
                Genre.find().exec()
            ]);

            allAuthors.sort(function(a, b) {
                let textA = a.lastName.toUpperCase();
                let textB = b.lastName.toUpperCase();

                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            res.render("book-form", {
                title: "Create Book",
                authors: allAuthors,
                genres: allGenres
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Book create GET");
    },

    createPost: async (req, res) => {
        if(!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
        }

        try {
            await Promise.all([
                body("title", "Title must not be empty.")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .run(req),
                body("author", "Author must not be empty.")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .run(req),
                body("summary", "Summary must not be empty.")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .run(req),
                body("isbn", "ISBN must not be empty")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .run(req),
                body("genre.*")
                    .escape()
                    .run(req)
            ]);

            const errors = validationResult(req);

            const book = new Book({
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                isbn: req.body.isbn,
                genre: req.body.genre,
            });

            if(!errors.isEmpty()) {
                const [
                    allAuthors,
                    allGenres
                ] = await Promise.all([
                    Author.find().exec(),
                    Genre.find().exec()
                ]);

                for(const genre of allGenres) {
                    if(book.genre.includes(genre._id)) {
                        genre.checked = "true";
                    }
                }

                allAuthors.sort(function(a, b) {
                    let textA = a.lastName.toUpperCase();
                    let textB = b.lastName.toUpperCase();

                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });

                res.render("book-form", {
                    title: "Create Book",
                    authors: allAuthors,
                    genres: allGenres,
                    book: book,
                    errors: errors.array()
                });
            }
            else {
                await book.save();

                res.redirect(book.url);
            }
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Book create POST");
    },

    deleteGet: async (req, res) => {
        try {
            const [
                book,
                bookInstances
            ] = await Promise.all([
                Book.findById(req.params.id).exec(),
                BookInstance.find({ book: req.params.id }).exec()
            ]);

            if(book === null) {
                res.redirect("/catalog/books");
            }

            res.render("book-delete", {
                title: "Delete Book",
                book: book,
                bookInstances: bookInstances
            });
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Book delete GET");
    },

    deletePost: async (req, res) => {
        try {
            const [
                book,
                bookInstances
            ] = await Promise.all([
                Book.findById(req.params.id).exec(),
                BookInstance.find({ book: req.params.id }, "title summary").exec()
            ]);

            if(bookInstances.length > 0) {
                res.render("author-delete", {
                    title: "Delete Book",
                    book: book,
                    bookInstances: bookInstances
                });
            }
            else {
                await Book.findByIdAndDelete(req.body.bookid);

                res.redirect("/catalog/books");
            }
        } catch (error) {
            console.log("Error: " + error);
        }

        //res.send("NOT IMPLEMENTED: Book delete POST");
    },

    updateGet: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book update GET");
    },

    updatePost: async (req, res) => {
        res.send("NOT IMPLEMENTED: Book update POST");
    },
}

module.exports = BookController;