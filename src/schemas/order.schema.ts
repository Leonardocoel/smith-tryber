import Joi from 'joi';

const RequiredSchema = Joi.object({
  productsIds: Joi.any().required(),
});

const OrderSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).min(1).messages({
    'array.min': '"productsIds" must include only numbers',
  }),
});

export { RequiredSchema, OrderSchema };