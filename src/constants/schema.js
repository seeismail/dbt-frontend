import Joi from 'joi';

export const waiterSchema = {
  name: Joi.string().min(3).max(25).required(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  salary: Joi.number().required(),
};

export const chefSchema = {
  name: Joi.string().min(3).max(25).required(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  salary: Joi.number().required(),
};

export const customerSchema = {
  name: Joi.string().min(3).max(25).required(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  address: Joi.string().required(),
  waiter_id: Joi.number().required(),
};

export const mealSchema = {
  name: Joi.string().min(3).max(25).required(),
  price: Joi.number().required(),
  cheff_id: Joi.number().required(),
};
