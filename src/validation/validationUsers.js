import Joi from 'joi';
import { emailRegexp } from '../constants/constantsUsers.js';

export const userregisterSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have at least 3 characters',
      'string.max': 'Name should have at most 20 characters',
    })
    .required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});

export const userloginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});
