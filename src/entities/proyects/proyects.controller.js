const Proyect = require('./proyects.model');

function create(proyect) {
  return new Proyect(proyect).save();
}

function getAll() {
  return Proyect.find({});
}

function update(id, proyect) {
  return Proyect.findOneAndUpdate({ _id: id}, proyect,  {new: false, useFindAndModify: false});
}

function getOne(filter) {
    let proyect = Proyect.findOne(filter);
    return proyect;
}

function getById(id) {
    let proyect = Proyect.findById(id);
    return proyect;
}
function remove(id) {
  return Proyect.findOneAndDelete(id);
}

module.exports = {
  create,
  getAll,
  getOne,
  getById,
  update,
  remove,
}
