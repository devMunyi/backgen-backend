require("dotenv").config();
const axios = require("axios");
const {
  addUser,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUsernameOrByEmail,
  getCurrentUser,
} = require("../models/user");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  addUser: (req, res) => {
    //After input validation using userRegisterValidation middleware try to save the user data
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    addUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new user",
        });
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "Error occured in adding a new user",
        });
      } else {
        return res.json({
          success: true,
          data: results,
          message: "User added Successfully",
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const { id } = req.params;
    getUserByUserId(parseInt(id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record not found",
        });
      }
      return res.json({
        success: false,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    //console.log(req.user);
    let queryObj = {};

    let { status, orderby, dir, offset, rpp } = req.body;

    if (!status) {
      status = 1;
    }
    if (!orderby) {
      orderby = "username";
    }
    if (!dir) {
      dir = "ASC";
    }
    if (!offset) {
      offset = 0;
    }

    if (!rpp) {
      rpp = 10;
    }

    //add data to queryObj object
    queryObj.status = parseInt(status);
    queryObj.orderby = orderby;
    queryObj.dir = dir;
    queryObj.offset = parseInt(offset);
    queryObj.rpp = parseInt(rpp);
    getUsers(queryObj, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No record(s) found",
        });
      }
      return res.json({
        success: true,
        data: results,
      });
    });
  },
  updateUser: (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const { id } = req.params;

    updateUser(parseInt(id), body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }

      if (!results) {
        return res.json({
          success: false,
          message: "Failed to update user",
        });
      }

      return res.json({
        success: true,
        message: "User updated successfully!",
      });
    });
  },
  deleteUser: (req, res) => {
    const { id } = req.params;
    deleteUser(parseInt(id), (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Record Not Found",
        });
      }
      console.log(results);
      return res.json({
        success: true,
        message: "User deleted successfully!",
      });
    });
  },
  loginUser: (req, res) => {
    const { body } = req;
    getUserByUsernameOrByEmail(body.emailOrUsername, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          data: "Invalid email, username or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        //console.log(results);
        const { password, ...rest } = results;
        //results.password = undefined;
        const jsontoken = sign({ result: rest }, process.env.JWT_SECRET, {
          expiresIn: "90d",
        });
        return res.json({
          success: true,
          message: "Logged In Successfully",
          token: jsontoken,
          user: rest,
        });
      } else {
        return res.json({
          success: false,
          data: "Invalid email, username or password",
        });
      }
    });
  },

  currentUser: (req, res) => {
    const { result } = req.user;
    const { country, ...rest } = result;
    console.log(rest);

    getCurrentUser(rest, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "No recod found",
        });
      }
      if (results) {
        return res.json({
          success: true,
          sameUser: results,
        });
      }
    });
  },

  gitOauth: (req, res) => {
    axios({
      method: "POST",
      url: `${process.env.GTHB_URL}?client_id=${process.env.GTHB_SECRET_ID}&client_secret=${process.env.GTHB_CLIENT_SECRETS}&code=${req.query.code}`,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      res.redirect(
        `http://localhost?access_token=${response.data.access_token}`
      );
    });
  },
};
