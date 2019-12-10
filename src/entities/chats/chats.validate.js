const Joi = require('@hapi/joi');
const ChatSchema = Joi.object({
  proyectId: Joi.string().required(),
  message: Joi.string().required(),
  userId: Joi.string().required()
});

const validateAdd = (req, res, next) => {
  const validation = ChatSchema.validate(req.body);
  if (validation.error)
    return res.status(403).json({ message: validation.error.message });

  next();
};

module.exports = validateAdd;
