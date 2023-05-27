import Joi from "joi";

export const signupResolver = Joi.object({
  userName: Joi.string().label("userName").required(),
  firstName: Joi.string().label("firstName").required(),
  lastName: Joi.string().label("lastName").required(),
  email: Joi.string()
    .label("Email")
    .pattern(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
    .required()
    .messages({
      "string.pattern.base": "Invalid Email",
    }),
  password: Joi.string().label("Password").min(6).required(),
  // remember: Joi.boolean().default(true),
});
