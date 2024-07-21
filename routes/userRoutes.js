const express = require("express");
const userController = require("../controller/user/userController");

const userRouter = express.Router();

/**
 * @api {post} /signup
 * @apiName signup
 * @apiDescription New user can Register
 * @apiPermission User
 * @apiParam { String } email Need to pass EmailId (Required, Unique)
 * @apiParam { String } password Need to pass (Required)
 * @apiParam { String } name Need to Pass  (Required)
 * @apiSuccess { Object} user Details of registered user
 */

userRouter.post("/signup", userController.signup);

/**
 * @api {post} /login
 * @apiName login
 * @apiDescription New user can Login
 * @apiPermission User
 * @apiParam { String } username Need to pass (Required)
 * @apiParam { String } password Need to pass (Required)
 * @apiSuccess { Object} user Login and Token
 */

userRouter.post("/login", userController.login);


module.exports = { userRouter };