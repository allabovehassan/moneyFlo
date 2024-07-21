const Joi = require("joi");

function validateSignup(body) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .replace(/  +/g, " ")
      .trim()
      .required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required()
  });
  const { value, error } = schema.validate(body);
  if (error && error.details) {
    return {
      error
    };
  }
  return {
    value
  };
}

function validateLogin(body) {
  const schema = Joi.object().keys({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required()
  });
  const { value, error } = schema.validate(body);
  if (error && error.details) {
    return {
      error
    };
  }
  return {
    value
  };
}

module.exports = { validateSignup, validateLogin };
