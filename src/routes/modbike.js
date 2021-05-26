const express = require("express");
const router = express.Router();
const queries = require("../db/queries");

const checkAuth = (req, res, next) => {
  // console.log("checkAuth").then(next());
  next();
};

router.get(
  "/bikes",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle.getAllBike().then((bikes) => {
      res.json(bikes);
    });
  }
);

router.get(
  "/bike",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle.getBikeById(req.body.bike_id).then((bikes) => {
      res.json(bikes);
    });
  }
);

router.put(
  "/bikes/borrow",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle
      .borrowBike(req.body.bike_id, req.body.is_available)
      .then((result) => res.sendStatus(200));
  }
);

router.put(
  "/bikes/return",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle
      .returnBike(req.body.bike_id)
      .then((result) => res.sendStatus(200));
  }
);

router.put(
  "/bikes/:id/edit",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle
      .editBike(req.params.id, req.body)
      .then((result) => res.sendStatus(200));
  }
);

router.put(
  "/bikes/:id/remove",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle
      .removeBike(req.params.id)
      .then((result) => res.sendStatus(200));
  }
);

router.get(
  "/user",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.user
      .getPersonalData(req.body.student_id)
      .then((user) => res.json(user));
  }
);

router.get(
  "/users",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.user.getAllUsers().then((users) => res.json(users));
  }
);

router.get(
  "/history",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.history
      .getAllHistory(req.body.student_id)
      .then((his) => res.json(his));
  }
);

router.post(
  "/history",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.history
      .borrowBikeHistory(req.body)
      .then((result) => res.sendStatus(200));
  }
);

router.put(
  "/history",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.history
      .returnBikeHistory(req.body.history_id, req.body.finish_date)
      .then((result) => res.sendStatus(200));
  }
);

module.exports = router;
