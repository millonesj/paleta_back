const mongoose = require('mongoose');

// TODO: añadir mas validaciones
const proyectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The proyect should have a name']
  },
  private: {
    type: Boolean,
    required: [true, 'The proyect should have a status'],
    default: false
  },
  palettes: {
    type: Array,
    required: [true, 'The proyect should have palettes']
  },
  owner: {
    type: String,
    required: [true, 'The proyect should have an owner']
  }
});

module.exports = mongoose.model('proyect', proyectSchema);
