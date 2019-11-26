const User = require('./users.models');

function create(user) {
return new User(user).save();
}

function getAll() {
  return User.find({});
}

function getOne(filter) {
  try {
    let user = User.findOne( filter);
    return user;
  } catch (error) {
    console.log("error desde obtener usuario");
    console.log(error);
  }
}

function getById(id) {
  try {
    let user = User.findById( id);
    return user;
  } catch (error) {
    console.log("error desde obtener usuario");
    console.log(error);
  }
}

function update(id, user) {
  return User.findOneAndUpdate({ _id: id}, user,  {new: false, useFindAndModify: false});
}

function remove(filter) {
  return User.findOneAndRemove(filter);
}

module.exports = {
  create,
  getAll,
  getOne,
  getById,
  update,
  remove
}
