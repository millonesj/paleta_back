const Joi = require('@hapi/joi');
const ProyectSchema = Joi.object({
  identifier: Joi.string().required(),
  name: Joi.string().min(5).max(100).required(),
  owner: Joi.string().required(),
  private: Joi.boolean().required(),
});

const validateAdd = (req, res, next) => {
  const validation = ProyectSchema.validate(req.body);
  if (validation.error) return res.status(403).json({"message": validation.error})

  next()
}

module.exports = validateAdd;
