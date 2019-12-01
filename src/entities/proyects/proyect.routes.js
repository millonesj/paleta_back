const express = require('express');
const validateAdd = require('./proyects.validate');
const { processError } = require('../../libs/errorHandler');
const { ProyectNoExist, OwnerNoExist } = require('./proyects.error');
let proyectsController = require('./proyects.controller');
const auth = require('../../libs/authentication');

const proyectRoutes = express.Router();

// LIST
proyectRoutes.get(
  '/',
  processError(async (req, res) => {
    let proyects = await proyectsController.getAllWithFilter({});
    res.json(proyects);
  })
);

// CREATE
proyectRoutes.post(
  '/',
  auth,
  processError(async (req, res) => {
    try {
      const payload = req.user;
      let nameProyect = 'New Proyect';
      if (payload) {
        let userId = payload.id;
        //Generate name
        const proyects = await proyectsController.getAllWithFilter({
          owner: userId
        });
        const proyectsNews = await proyects.filter(proyect => {
          if (proyect.name) {
            if (proyect.name.substring(0, 11) == 'New Proyect') return true;
          } else {
            return false;
          }
        });

        if (proyectsNews) {
          let maxProyect = 0;
          proyectsNews.forEach(proyect => {
            const numberProyect = Number(proyect.name.substring(12));
            if (numberProyect > maxProyect) {
              maxProyect = numberProyect;
            }
          });
          nameProyect = `${nameProyect} ${maxProyect + 1}`;
        }

        //const NEWPROYECT = {...req.body, owner: userId, name: nameProyect}
        const newProyect = await proyectsController.create({
          owner: userId,
          name: nameProyect
        });
        return res.json({
          message: 'Proyect created successfully',
          payload: newProyect
        });
      }

      return res.json({ message: 'Error' });
    } catch (error) {
      console.log(error);
    }
  })
);

// UPDATE
proyectRoutes.put(
  '/:id',
  processError(async (req, res) => {
    let idProyect = req.params.id;
    let productSearch = await proyectsController.getById(idProyect);

    if (productSearch === null) throw new ProyectNoExist(`Proyect no exist`);

    let result = await proyectsController.update(idProyect, { ...req.body });
    if (result) res.json({ message: 'product updated succesfully' });
  })
);

// DELETE
proyectRoutes.delete(
  '/:id',
  processError(async (req, res) => {
    let productToDelete = await proyectsController.getById(req.params.id);
    if (productToDelete === null) throw new ProyectNoExist(`Proyect no exist `);
    console.log(productToDelete);
    let result = await proyectsController.remove(req.params.id);
    if (result)
      res.json({
        message: 'Proyect deleted succesfully',
        productDeleted: productToDelete
      });
  })
);

module.exports = proyectRoutes;
