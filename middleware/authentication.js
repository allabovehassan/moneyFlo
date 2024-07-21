const jwt = require("jsonwebtoken");
const messages = require("../utils/messages");
require("dotenv").config();

function authenticator(req, res, next) {
  try {
    let token = req.headers.token;
    if (!token) {
      return res.status(404).send({
        success: false,
        messages: "Token not found",
        data: null
      });
    }

      jwt.verify(
        token,
        process.env.key,
      (err, decoded) => {
        if (err) {
          return res.status(401).send({
            success: false,
            message: messages.LOGIN_AGAIN,
            data: null
          });
        }
        req.user = req.user || {};
        req.user.isAdmin = decoded.isAdmin;
        req.user.id = decoded.userId;
        next();
      }
    );
    
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: messages.SERVER_ERROR,
      data: JSON.stringify(error)
    });
  }
}

module.exports = { authenticator };
