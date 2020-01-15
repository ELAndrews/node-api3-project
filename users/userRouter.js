const express = require("express");
const Users = require("./userDb");
const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
  // Users.insert(req.body)
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(error => {
  //     res.status(500).json({
  //       message: error.message
  //     });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts => {
      if (!posts.length) {
        /// CHECK THIS!!!! AS LOGIC ISN't PERFECT!
        res.status(404).json({ message: `user could not be found` });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.delete("/:id", (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(data => {
      if (data === 1) {
        res.status(202).json(`users has been deleted`);
      } else {
        res.status(404).json({ message: `user does not exist` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
    .then(data => {
      if (data === undefined) {
        res.status(404).json({ message: "invalid user id" });
      }
      req.user = data;
      next();
    })
    .catch(error => {
      res.status(500).json(`nope!`);
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
