import Joi from 'joi';
import { contactTypeList } from '../constants/constantsContacts.js';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'string.min': 'Phone number should have at least 3 characters',
    'string.max': 'Phone number should have at most 20 characters',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().min(3).max(20),
  isFavorite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid(...contactTypeList)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have at most 20 characters',
  }),
  phoneNumber: Joi.string().min(3).max(20).messages({
    'string.min': 'Phone number should have at least 3 characters',
    'string.max': 'Phone number should have at most 20 characters',
  }),
  email: Joi.string().min(3).max(20),
  isFavorite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
});
