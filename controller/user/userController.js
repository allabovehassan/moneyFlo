const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../model/userModel.js");
const messages = require("../../utils/messages.js");
const {
  validateSignup,
  validateLogin
} = require("./userValidation.js");

require("dotenv").config();

// sign up user
async function signup(req, res) {
  try {
    console.log(1);
    const { value, error } = validateSignup(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: messages.VALIDATION_ERROR,
        data: error
      });
    }

    const checkEmail = await User.findOne({
      email: new RegExp("^" + value.email + "$", "i")
    });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: messages.DUPLICATE_ENTRY_EMAILID,
        data: null
      });
    }

    const hash = await bcrypt.hash(
      value.password,
      +process.env.saltround
    );

    let data = new User({
      email: value.email,
      password: hash,
      name: value.name
    });

    if (data && data.name) {
      await data.save();
      return res.status(200).send({
        success: true,
        message: messages.SUCCESSFULLY_REGISTER,
        data: data.email
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
}

//login user
async function login(req, res) {
  try {
    const { value, error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({
        success: false,
        message: messages.VALIDATION_ERROR,
        data: error
      });
    }
    const userFind = await User.findOne({
      email: value.email
    });

    if (userFind) {
      const isMatch = await bcrypt.compare(
        value.password,
        userFind.password
      );

      if (isMatch) {
        const token = jwt.sign(
          {
            userId: userFind._id,
            isAdmin: userFind.isAdmin
          },
          process.env.KEY,
          { expiresIn: "3h" }
        );

        return res.status(200).send({
          success: true,
          message: messages.LOGIN_SUCCESSFULLY,
          data: {
            token
          }
        });
      } else {
        return res.status(403).send({
          success: false,
          message: messages.INVALID_CREDENTIALS,
          data: null
        });
      }
    } else {
      return res.status(403).send({
        success: false,
        message: messages.UNAUTHORIZED,
        data: null
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
}

module.exports = {
  signup,
  login
};
