import Joi from 'joi';

const RequiredSchema = Joi.object({
  name: Joi.any().required(),
  amount: Joi.any().required(),
});

const ProductSchema = Joi.object({
  name: Joi.string().min(3),
  amount: Joi.string().min(3),
});

export { RequiredSchema, ProductSchema };