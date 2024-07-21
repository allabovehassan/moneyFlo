const Joi = require("joi");

function validateProduct(body) {
  const productSchema = Joi.object({
    name: Joi.string().trim().required(),
    qty: Joi.number().min(0).required(),
    rate: Joi.number().min(0).required()
  });

  const schema = Joi.array()
    .items(productSchema)
    .required();

  const { value, error } = schema.validate(body);
  if (error && error.details) {
    return { error };
  }
  return { value };
}

module.exports = {
  validateProduct
};
