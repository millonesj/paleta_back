const mongoose = require('mongoose');

// TODO: añadir mas validaciones
const proyectSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: [true, 'The proyect should have a name']
  },
  name: {
    type: String,
    required: [true, 'The proyect should have a name']
  },
  private: {
    type: Boolean,
    required: [true, 'User should have a status'],
    default: true
  },
  owner: {
    type: String,
    required: [true, 'The proyect should have an owner']
  },
});

module.exports = mongoose.model('proyect', proyectSchema);
