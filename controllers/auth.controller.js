var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");
const { request } = require("express");

exports.signup = (req, res) => {
  const user = new User({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
    gender: req.body.gender,  
    birthDate: req.body.birthDate,
  });

  user.save((err, user) => {
    if (err) {         
      res.status(500)
        .send({
          message: err
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "Та амжилттай бүртгэгдлээ."
        })
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
      email: req.body.email
    })
    .exec((err, user) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      }
      if (!user) {
        return res.status(404)
          .send({
            message: "Хэрэглэгч олдсонгүй."
          });
      }

      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Нэвтрэх нэр эсвэл нууц үг буруу байна!"
          });
      }
      
      var token = jwt.sign({
        id: user.id,
        email: user.email,
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });
      
      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            fullName: user.lastName + " " + user.firstName,
          },
          message: "Амжилттай нэвтэрлээ",
          accessToken: token,
        });
    });
};


exports.addUser = (req, res) => {  
  const user = new User({
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 8),
    gender: req.body.gender,  
    birthDate: req.body.birthDate,
    role: 'normal',
    createUser: req.user.id
  });

  user.save((err, user) => {
    if (err) {         
      res.status(500)
        .send({
          message: err
        });
      return;
    } else {
      res.status(200)
        .send({
          message: "Та амжилттай хадгалагдлаа."
        })
    }
  });
};

exports.editUser = (req, res) => {

  User.findOne({
    email: req.params.email
  })
  .exec((err, user) => {
    if (err) {
      res.status(500)
        .send({
          message: err
        });
      return;
    }
    if (!user) {
      return res.status(404)
        .send({
          message: "Хэрэглэгч олдсонгүй."
        });
    }

    user.lastName = req.body.lastName;    
    user.firstName = req.body.firstName;
    user.role = req.body.role;
    user.birthDate = req.body.birthDate;

    user.save((err, user) => {
      if (err) {         
        res.status(500)
          .send({
            message: err
          });
        return;
      } else {
        res.status(200)
          .send({
            message: "Та амжилттай хадгалагдлаа."
          })
      }
    });
    
  })
};

exports.deleteUser = (req, res) => {  
  User.findOneAndDelete({
    email: req.params.email
  })
  .exec((err, user) => {
    if (err) {      
      res.status(500)
        .send({
          message: err
        });
      return;
    }
    if (!user) {
      return res.status(404)
        .send({
          message: "Хэрэглэгч олдсонгүй."
        });
    }
    else{
      return res.status(200)
      .send({
        message: "Та амжилттай устлаа.",
        deletedUser: user
      })
    }    
  })
};

exports.userList = (req, res) =>{
  User.find({createUser: req.user.id}).exec((err,users)=>{
    if(err){
      res.status(500)
        .send({
          message: err
        });
      return;
    }
    else{
      res.status(200).send({
        users
      })
    }
    
  })
}