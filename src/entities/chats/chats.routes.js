const express = require('express');
const validateAdd = require('./chats.validate');
const { processError } = require('../../libs/errorHandler');
const { ChatNoExist } = require('./chats.error');
const { ProyectNoExist } = require('../proyects/proyects.error');
const chatsController = require('./chats.controller');
const proyectController = require('../proyects/proyects.controller');
const auth = require('../../libs/authentication');

const chatRoutes = express.Router();

// LIST
chatRoutes.get(
  '/:ProyectId',
  auth,
  processError(async (req, res) => {
    const proyectId = req.params.ProyectId;
    let chats = await chatsController.getAllWithFilter({ proyectId });
    res.json({ payload: chats });
  })
);

// CREATE
chatRoutes.post(
  '/',
  auth,
  processError(async (req, res) => {
    const payload = req.user;
    let userId = payload.id;
    const proyectId = req.body.proyectId;
    let proyectSearched = await proyectController.getById(proyectId);
    if (proyectSearched == null)
      throw new ProyectNoExist(`Proyect  doesn't exist`);
    const chatSaved = await chatsController.create({ ...req.body, userId });
    res.json({ message: 'message saved' });
  })
);

module.exports = chatRoutes;
