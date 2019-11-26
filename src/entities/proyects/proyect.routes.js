const express = require('express');
const validateAdd = require('./proyects.validate');
const { processError } = require('../../libs/errorHandler');
const { ProyectNoExist, OwnerNoExist } = require('./proyects.error');
let proyectsController = require('./proyects.controller');
//let usersController = require('../users/users.controller');
const proyectRoutes = express.Router()

// LIST
proyectRoutes.get('/', processError(async (req, res) => {
    let proyects = await proyectsController.getAll();
      res.json(proyects)
}));

// CREATE
proyectRoutes.post('/',  validateAdd, processError(async(req, res) => {
   let userSearched = await usersController.getById(req.body.owner);

   if (userSearched === null) throw new OwnerNoExist(`owner/user doesn't exist`)
    
    proyectsController.create(req.body);
    res.json({message: 'product created successfully'});

}))

// UPDATE
proyectRoutes.put('/:id',  processError(async (req, res) => {
    let idProyect = req.params.id;
    let productSearch = await proyectsController.getById(idProyect);
    
    if (productSearch === null) throw new ProyectNoExist(`Proyect no exist`);

    let result = await proyectsController.update(idProyect, {...req.body});
    if (result) res.json({message: "product updated succesfully"})

}))

// DELETE
proyectRoutes.delete('/:id', processError(async(req, res) => {
    let productToDelete = await proyectsController.getById(req.params.id);
    if (productToDelete === null) throw new ProyectNoExist(`Proyect no exist `);
    console.log(productToDelete);
      let result = await proyectsController.remove(req.params.id);
      if (result)
      res.json({message: "Proyect deleted succesfully",productDeleted: productToDelete});
}));

module.exports = proyectRoutes;
