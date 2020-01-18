const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(req.body)
      .then(id => {
        if (id) {
          db.findById(id.id).then(post => {
            // console.log(post);
            res.status(201).json(post);
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while saving the post to the database"
        });
      });
  }
});

router.get("/", (req, res) => {
  db.find(req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      });
    });
});

module.exports = router;
