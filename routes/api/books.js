const router = require("express").Router();
const studController = require("../../controllers/studController");
const mongoose = require("mongoose");
const db = require("../../models");
// // Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);
db.Student.create({
    name:"chris"
}).then(function(response){
    console.log('anything')
    console.log(response)
})


module.exports = router;
