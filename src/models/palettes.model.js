const mongoose = require('mongoose');

// TODO: añadir mas validaciones
const paletteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The palette should have a name']
  },
  proyectId: {
    type: String,
    required: [true, 'The palette should have a proyect']
  },
  owner: {
    type: String,
    required: [true, 'The palette should have an owner']
  },
  colors: {
    type: Array,
    required: [true, 'The palette should have colors'],
    default: [
      {
        color: '#0000FF',
        compId: 'toolBar',
        elementName: 'background'
      },
      {
        color: '#FFFFFF',
        compId: 'toolBar',
        elementName: 'title and menu'
      },
      {
        color: '#AAAAAA',
        compId: 'paletteList',
        elementName: 'background'
      },
      {
        color: '#FFFFFF',
        compId: 'paletteList',
        elementName: 'title'
      },
      {
        color: '#FFFFFF',
        compId: 'paletteList',
        elementName: 'paletteTitleTxt'
      },
      {
        color: '#0000FF',
        compId: 'paletteList',
        elementName: 'paletteTitleBg'
      },
      {
        color: '#FFFFFF',
        compId: 'paletteList',
        elementName: 'paletteSubTitleTxt'
      },
      {
        color: '#AAAAAA',
        compId: 'paletteList',
        elementName: 'paletteSubTitleBg'
      }
    ]
  }
});

module.exports = mongoose.model('palette', paletteSchema);
