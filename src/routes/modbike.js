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
  "/bike/:id",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle.getBikeById(req.params.id).then((bikes) => {
      res.json(bikes);
    });
  }
);

router.put(
  "/bikes/borrow/:id",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle
      .borrowBike(req.params.id)
      .then((result) =>
        queries.history
          .borrowBikeHistory(req.body)
          .then((response) => res.status(200).json({ message: "complete" }))
      );
  }
);

router.get(
  "/bikes/types",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bikeType
      .allType()
      .then((response) => res.status(200).json(response));
  }
);

router.get(
  "/bikes/branch",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.branchs.allB().then((result) => res.status(200).json(result));
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

router.post("/bikes/create"),
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.bicycle.createBike(req.body).then((result) => res.send(result));
  };

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
  "/history/:id",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.history.getAllHistory(req.params.id).then((his) => res.json(his));
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
  "/history/:id",
  (req, res, next) => {
    checkAuth(req, res, next);
  },
  (req, res) => {
    queries.history
      .returnBikeHistory(
        req.params.id,
        req.body.finish_date,
        req.body.return_ontime
      )
      .then((result) => res.sendStatus(200));
  }
);

router.post("/login", (req, res) => {
  queries.auth.authLogin(req.body).then((user) => {
    if (user.password == req.body.password) {
      return res.status(200).json({ message: "complete", user });
    } else {
      console.log(user.password);
      return res.status(500).json({ message: "fail" });
    }
  });
});

router.post("/register", (req, res) => {
  queries.auth
    .registerMember({
      username: req.body.username,
      password: req.body.password,
    })
    .then((response) =>
      queries.user
        .setPersonalData({
          student_id: req.body.student_id,
          f_name: req.body.f_name,
          l_name: req.body.l_name,
          faculty: req.body.faculty,
          department: req.body.department,
          mobile_no: req.body.mobile_no,
          email: req.body.email,
          other_contact: req.body.other_contact,
        })
        .then((profile) => res.status(200).json({ response, profile }))
    );
});

router.get("/:id", (req, res) => {
  queries.user.getPersonalData(req.params.id).then((user) => res.json(user));
});

module.exports = router;
