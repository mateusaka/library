const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");

const { body, validationResult } = require("express-validator");
const bookinstance = require("../models/bookinstance");

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
            res.send("An error has occurred.");
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
            res.send("An error has occurred.");
        }

        //res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
    },

    createGet: async (req, res) => {
        try {
            const allBooks = await Book.find({}, "title").exec();

            allBooks.sort(function(a, b) {
                let textA = a.title.toUpperCase();
                let textB = b.title.toUpperCase();

                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            res.render("bookinstance-form", {
                title: "Create BookInstance",
                bookList: allBooks,
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: BookInstance create GET");
    },

    createPost: async (req, res) => {
        try {
            await Promise.all([
                body("book", "Book must be specified")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .run(req),
                body("status")
                    .escape()
                    .run(req),
                body("dueBack", "Invalid date")
                    .optional({ values: "falsy" })
                    .isISO8601()
                    .toDate()
                    .run(req)
            ]);

            const errors = validationResult(req);

            const bookInstance = new BookInstance({
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                dueBack: req.body.dueBack,
            });

            if(!errors.isEmpty()) {
                const allBooks = await Book.find({}, "title").exec();

                allBooks.sort(function(a, b) {
                    let textA = a.title.toUpperCase();
                    let textB = b.title.toUpperCase();
    
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });

                res.render("bookinstance-form", {
                    title: "Create BookInstance",
                    bookList: allBooks,
                    selectedBook: bookInstance.book._id,
                    errors: errors.array(),
                    bookInstance: bookInstance,
                });
            }
            else {
                await bookInstance.save();

                res.redirect(bookInstance.url);
            }

        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: BookInstance create POST");
    },

    deleteGet: async (req, res) => {
        try {
            const bookInstance = await BookInstance.findById(req.params.id)
            .populate("book")
            .exec();

            if(bookInstance === null) {
                res.redirect("/catalog/books");
            }

            res.render("bookinstance-delete", {
                title: "Delete Copy",
                bookInstance: bookInstance,
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: BookInstance delete GET");
    },

    deletePost: async (req, res) => {
        try {
            const bookInstance = await BookInstance.findById(req.params.id)

            if(bookInstance.status !== "Available") {
                res.render("bookinstance-delete", {
                    title: "Delete Copy",
                    bookInstance: bookInstance,
                });
            }
            else {
                await BookInstance.findByIdAndDelete(req.body.bookinstanceid);

                res.redirect("/catalog/bookinstances");
            }
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: BookInstance delete POST");
    },

    updateGet: async (req, res) => {
        try {
            const bookInstance = await BookInstance.findById(req.params.id)
                .populate("book")
                .exec();

            if(bookInstance === null) {
                return res.send("Book instance(copy) not found");
            }

            const book = await Book.findById(bookInstance.book._id).exec();

            res.render("bookinstance-form", {
                title: "Update BookInstance",
                book: book,
                bookInstance: bookInstance
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: BookInstance update GET");
    },

    updatePost: async (req, res) => {
        try {
            await Promise.all([
                body("book", "Book must be specified")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .run(req),
                body("status")
                    .escape()
                    .run(req),
                body("dueBack", "Invalid date")
                    .optional({ values: "falsy" })
                    .isISO8601()
                    .toDate()
                    .run(req)
            ]);

            const errors = validationResult(req);

            const bookInstance = new BookInstance({
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                dueBack: req.body.dueBack,
                _id: req.params.id,
            });

            const book = await Book.findById(bookInstance.book._id).exec();

            if(!errors.isEmpty()) {
                res.render("bookinstance-form", {
                    title: "Update BookInstance",
                    book: book,
                    bookInstance: bookInstance,
                    errors: errors.array()
                });
            }
            else {
                const updatedBookInstance = await BookInstance.findByIdAndUpdate(req.params.id, bookInstance);

                res.redirect(updatedBookInstance.url);
            }

        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: BookInstance update POST");
    },
}

module.exports = BookInstanceController;