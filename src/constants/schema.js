import Joi from 'joi';

export const waiterSchema = {
  name: Joi.string().min(3).max(25).required(),
  contact: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  salary: Joi.number().required(),
};

export const chefSchema = {
  name: Joi.string().min(3).max(25).required(),
  contact: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  salary: Joi.number().required(),
};
