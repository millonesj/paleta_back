const Palette = require('../models/palettes.model');

function create(palette) {
  return new Palette(palette).save();
}

function getAllWithFilter(filter) {
  return Palette.find(filter);
}

function update(id, palette) {
  return Palette.findOneAndUpdate({ _id: id }, palette, {
    new: false,
    useFindAndModify: false
  });
}

function getOne(filter) {
  let palette = Palette.findOne(filter);
  return palette;
}

function getById(id) {
  let palette = Palette.findById(id);
  return palette;
}
function remove(id) {
  return Palette.findOneAndDelete({ _id: id });
}

module.exports = {
  create,
  getAllWithFilter,
  getOne,
  getById,
  update,
  remove
};
