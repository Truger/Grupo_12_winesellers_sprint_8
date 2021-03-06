const { User } = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const controller = {
  register: (req, res) => {
    return res.render("user/register");
  },

  login: (req, res) => {
    return res.render("user/login");
  },

  loguear: async (req, res) => {
    let error = {
      msg: "user or key not validated",
      params: "error"
    };
      let errors = validationResult(req);   
      if (errors.isEmpty()) {
        const userLoguear = await User.findOne({
          where: { email: req.body.email },
        });
        if (userLoguear) {
          let password = req.body.password;
          if (bcrypt.compareSync(password, userLoguear.password)) {
            delete userLoguear.password;
            req.session.userLogueado = userLoguear;
            console.log(req.session.userLogueado);
            if (req.body.remember != undefined) {
              res.cookie("userEmail", userLoguear.email, {
                maxAge: 100 * 60 * 10,
              });
            }
            return res.redirect("/products");
          } else {
            return res.render("user/login", { errors: error });
          }
        } else {
          return res.render("user/login", { errors: error});
        }
      } else {
        return res.render("user/login", { errors: error });
      }
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },

  create: async (req, res) => {
    console.log(req.body);
    let errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      let userNew = {
        first_name: req.body.name,
        last_name: req.body.lastName,
        username: req.body.lastName,
        date: req.body.date,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      };
      User.create(userNew)
        .then(function (user) {
          return res.render("user/login");
        })
        .catch(function (error) {
          console.log("error:" + error.message);
        });
  }else {
      return res.render("user/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  detail: (req, res) => {
    let user = model.findOne(req.params.id);
    return res.render("user/detailUser", { user: user });
  },
};

module.exports = controller;
