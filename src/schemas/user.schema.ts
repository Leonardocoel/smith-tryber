import Joi from 'joi';

const RequiredSchema = Joi.object({
  username: Joi.any().required(),
  classe: Joi.any().required(),
  level: Joi.any().required(),
  password: Joi.any().required(),
});

const UserSchema = Joi.object({
  username: Joi.string().min(3),
  classe: Joi.string().min(3),
  level: Joi.number().min(1),
  password: Joi.string().min(8),
});

export { RequiredSchema, UserSchema };