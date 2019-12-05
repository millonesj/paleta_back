const Joi = require('@hapi/joi');
const UserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(2)
    .max(100)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .max(20)
});

const validateUser = (req, res, next) => {
  const validation = UserSchema.validate(req.body);
  if (validation.error)
    return res.status(403).json({ message: validation.error.message });

  next();
};

module.exports = validateUser;
