import * as Joi from "joi";

const messages = {
  "any.required": "This is a required field.",
  "string.email": "The string is not a valid e-mail.",
  "string.length": "The value is not of the expected length.",
  "string.max": "The string is longer than expected.",
  "string.min": "The string is shorter than expected.",
  "string.pattern.base": "Invalid field",
};

export const orderFormSchema = Joi.object().keys({
  name: Joi.string().min(2).max(32).required().messages(messages),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages(messages),
  tel: Joi.string()
    .pattern(/^[\+]?[0-9]{3}[ ]?[(]?[0-9]{2}[)]?[ ]?[0-9]{3}[ ]?[0-9]{2}[ ]?[0-9]{2}$/)
    .required()
    .messages(messages),
  address: Joi.string().min(2).max(128).required().messages(messages),
});
