var express = require("express"),
  router = express.Router(),
  verifyToken = require('../middlewares/authJWT'),
  {
    signup,
    signin,
    addUser,
    editUser,
    deleteUser,
    userList
  } = require("../controllers/auth.controller.js");

router.post("/register", signup, function (req, res) {

});

router.post("/login", signin, function (req, res) {

});

router.get("/secretContent", verifyToken, function (req, res) {
    if (!user) {
      res.status(403)
        .send({
          message: "Алдаа гарлаа"
        });
    }
    if (req.user == "admin") {
      res.status(200)
        .send({
          message: "Secret contents here"
        });
    } else {
      res.status(403)
        .send({
          message: "Алдаа гарлаа"
        });
    }
  });

  router.post("/addUser", verifyToken, addUser, function (req, res) {

  });

  router.put("/editUser/:email", verifyToken, editUser, function (req, res) {

  });

  router.delete("/deleteUser/:email", verifyToken, deleteUser, function (req, res) {

  });
  
  router.get("/userList", verifyToken, userList, function (req, res) {

  });

  

module.exports = router;