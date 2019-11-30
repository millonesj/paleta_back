const Joi = require('@hapi/joi');
const ProyectSchema = Joi.object({
  name: Joi.string().min(5).max(100),
  owner: Joi.string().required(),
  private: Joi.boolean(),
});

const validateAdd = (req, res, next) => {
  const validation = ProyectSchema.validate(req.body);
  if (validation.error) return res.status(403).json({"message": validation.error})

  next()
}

module.exports = validateAdd;
