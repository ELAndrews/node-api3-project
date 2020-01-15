const express = require("express");
const Users = require("./userDb");
const router = express.Router();

router.post("/", validateNewUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      next(new Error("not happy at all"));
    });
});

router.post("/:id/posts", validateUserId, validateNewPost, (req, res) => {
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

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

router.delete("/:id", validateUserId, (req, res) => {
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

router.put("/:id", validateUserId, (req, res) => {
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

function validateNewUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validateNewPost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
