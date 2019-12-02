const mongoose = require('mongoose');

// TODO: añadir mas validaciones
const paletteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The palette should have a name']
  },
  proyectId: {
    type: String,
    required: [true, 'The palette should have a proyect'],
    default: ''
  },
  owner: {
    type: String,
    required: [true, 'The palette should have an owner']
  },
  colors: {
    type: Array,
    required: [true, 'The palette should have colors']
  }
});

module.exports = mongoose.model('palette', paletteSchema);
