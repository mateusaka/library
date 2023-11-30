const Author = require("../models/author");
const Book = require("../models/book");

const { body, validationResult } = require("express-validator");

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
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Author list");
    },

    detail: async (req, res) => {
        try {
            const [
                author,
                allBooksByAuthor
            ] = await Promise.all([
                Author.findById(req.params.id).exec(),
                Book.find({ author: req.params.id }, "title summary").exec()
            ]);

            if(author === null) {
                return res.send("Author not found");
            }

            res.render("author-detail", {
                title: "Author Detail",
                author: author,
                authorBooks: allBooksByAuthor
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
    },

    createGet: async (req, res) => {
        res.render("author-form", {
            title: "Create Author"
        });

        //res.send("NOT IMPLEMENTED: Author create GET");
    },

    createPost: async (req, res) => {
        try {
            await Promise.all([
                body("firstName")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .withMessage("First name must be specified.")
                    /* .isAlphanumeric()
                    .withMessage("First name has non-alphanumeric characters.") */
                    .run(req),
                body("lastName")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .withMessage("Last name must be specified.")
                    /* .isAlphanumeric()
                    .withMessage("Last name has non-alphanumeric characters.") */
                    .run(req),
                body("dateOfBirth", "Invalid date of birth")
                    .optional({ values: "falsy" })
                    .isISO8601()
                    .toDate()
                    .run(req),
                body("dateOfDeath", "Invalid date of death")
                    .optional({ values: "falsy" })
                    .isISO8601()
                    .toDate()
                    .run(req)
            ]);

            const errors = validationResult(req);

            const author = new Author({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                dateOfDeath: req.body.dateOfDeath,
            });

            if(!errors.isEmpty()) {
                res.render("author-form", {
                    title: "Create Author",
                    author: author,
                    errors: errors.array()
                });

                return;
            }
            else {
                await author.save();

                res.redirect(author.url);
            }
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Author create POST");
    },

    deleteGet: async (req, res) => {
        try {
            const [
                author,
                allBooksByAuthor
            ] = await Promise.all([
                Author.findById(req.params.id).exec(),
                Book.find({ author: req.params.id }, "title summary").exec()
            ]);

            if(author === null) {
                res.redirect("/catalog/authors");
            }

            res.render("author-delete", {
                title: "Delete Author",
                author: author,
                authorBooks: allBooksByAuthor
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Author delete GET");
    },

    deletePost: async (req, res) => {
        try {
            const [
                author,
                allBooksByAuthor
            ] = await Promise.all([
                Author.findById(req.params.id).exec(),
                Book.find({ author: req.params.id }, "title summary").exec()
            ]);

            if(allBooksByAuthor.length > 0) {
                res.render("author-delete", {
                    title: "Delete Author",
                    author: author,
                    authorBooks: allBooksByAuthor
                });
            }
            else {
                await Author.findByIdAndDelete(req.body.authorid);

                res.redirect("/catalog/authors");
            }
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Author delete POST");
    },

    updateGet: async (req, res) => {
        try {
            const author = await Author.findById(req.params.id);

            if(author === null) {
                return res.send("Author not found");
            }

            res.render("author-form", {
                title: "Update Book",
                author: author
            });
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Author update GET");
    },

    updatePost: async (req, res) => {
        try {
            await Promise.all([
                body("firstName")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .withMessage("First name must be specified.")
                    .run(req),
                body("lastName")
                    .trim()
                    .isLength({ min: 1 })
                    .escape()
                    .withMessage("Last name must be specified.")
                    .run(req),
                body("dateOfBirth", "Invalid date of birth")
                    .optional({ values: "falsy" })
                    .isISO8601()
                    .toDate()
                    .run(req),
                body("dateOfDeath", "Invalid date of death")
                    .optional({ values: "falsy" })
                    .isISO8601()
                    .toDate()
                    .run(req)
            ]);

            const errors = validationResult(req);

            const author = new Author({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dateOfBirth: req.body.dateOfBirth,
                dateOfDeath: req.body.dateOfDeath,
                _id: req.params.id,
            });

            if(!errors.isEmpty()) {
                res.render("author-form", {
                    title: "Update Author",
                    author: author,
                    errors: errors.array()
                });
            }
            else {
                const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, author);

                res.redirect(updatedAuthor.url);
            }
        } catch (error) {
            res.send("An error has occurred.");
        }

        //res.send("NOT IMPLEMENTED: Author update POST");
    },
}

module.exports = AuthorController;