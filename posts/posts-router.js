const express = require("express");
const db = require("../data/db");

const router = express.Router();

//Creates a post using the information sent inside the request body.
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db.insert(req.body)
      .then(({ id }) => {
        if (id) {
          db.findById(id).then(post => {
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

//Creates a comment for the post with the specified id using information sent inside of the request body.
router.post("/:id/comments", (req, res) => {
  const { text } = req.body;
  const post_id = req.params.id;

  if (!text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.findById(post_id).then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        let newComment = {
          text: text,
          post_id: post_id
        };
        db.insertComment(newComment)
          .then(({ id }) => {
            db.findCommentById(id).then(comment => {
              res.status(201).json(comment);
            });
          })
          .catch(err => {
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database"
            });
          });
      }
    });
  }
});

//Returns an array of all the post objects contained in the database.
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

//Returns the post object with the specified id.
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if ((post = [])) {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

//Returns an array of all the comment objects associated with the post with the specified id.
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  db.findById(id).then(post => {
    if ((post = [])) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    } else {
      db.findPostComments(id)
        .then(comments => {
          res.status(200).json(comments);
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "The comments information could not be retrieved." })
        );
    }
  });
});

//Removes the post with the specified id and returns the deleted post object.
//You may need to make additional calls to the database in order to satisfy this requirement.
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }
});

//Updates the post with the specified id using data from the request body.
//Returns the modified document, NOT the original.

module.exports = router;
