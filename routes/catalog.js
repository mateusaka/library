const express = require("express");

const router = express.Router();

const BookController = require("../controllers/bookController");
const BookInstanceController = require("../controllers/bookinstanceController");
const AuthorController = require("../controllers/authorController");
const GenreController = require("../controllers/genreController");

// BOOK
router.get("/", BookController.index);
router.get("/book/create", BookController.createGet);
router.get("/book/:id/delete", BookController.deleteGet);
router.get("/book/:id/update", BookController.updateGet);
router.get("/book/:id", BookController.detail);
router.get("/books", BookController.list);

router.post("/book/create", BookController.createPost);
router.post("/book/:id/delete", BookController.deletePost);
router.post("/book/:id/update", BookController.updatePost);

// AUTHOR
router.get("/author/create", AuthorController.createGet);
router.get("/author/:id/delete", AuthorController.deleteGet);
router.get("/author/:id/update", AuthorController.updateGet);
router.get("/author/:id", AuthorController.detail);
router.get("/authors", AuthorController.list);

router.post("/author/create", AuthorController.createPost);
router.post("/author/:id/delete", AuthorController.deletePost);
router.post("/author/:id/update", AuthorController.updatePost);

// GENRE
router.get("/genre/create", GenreController.createGet);
router.get("/genre/:id/delete", GenreController.deleteGet);
router.get("/genre/:id/update", GenreController.updateGet);
router.get("/genre/:id", GenreController.detail);
router.get("/genres", GenreController.list);

router.post("/genre/create", GenreController.createPost);
router.post("/genre/:id/delete", GenreController.deletePost);
router.post("/genre/:id/update", GenreController.updatePost);

// BOOKINSTANCE
router.get("/bookinstance/create", BookInstanceController.createGet);
router.get("/bookinstance/:id/delete", BookInstanceController.deleteGet);
router.get("/bookinstance/:id/update", BookInstanceController.updateGet);
router.get("/bookinstance/:id", BookInstanceController.detail);
router.get("/bookinstances", BookInstanceController.list);

router.post("/bookinstance/create", BookInstanceController.createPost);
router.post("/bookinstance/:id/delete", BookInstanceController.deletePost);
router.post("/bookinstance/:id/update", BookInstanceController.updatePost);

module.exports = router;