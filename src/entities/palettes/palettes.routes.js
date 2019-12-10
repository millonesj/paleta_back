const express = require('express');
const validateAdd = require('./palettes.validate');
const { processError } = require('../../libs/errorHandler');
const { PaletteNoExist, OwnerNoExist } = require('./palettes.error');
let palettesController = require('./palettes.controller');
const auth = require('../../libs/authentication');

const paletteRoutes = express.Router();

// LIST
paletteRoutes.get(
  '/:id',
  auth,
  processError(async (req, res) => {
    let palettes = await palettesController.getAllWithFilter({
      proyectId: req.params.id
    });
    res.json({ payload: palettes });
  })
);

// CREATE
paletteRoutes.post(
  '/:proyectId',
  auth,
  processError(async (req, res) => {
    try {
      const payload = req.user;
      let namePalette = 'New Palette';
      if (payload) {
        let userId = payload.id;
        //Generate name
        const palettes = await palettesController.getAllWithFilter({
          owner: userId,
          proyectId: req.params.proyectId
        });
        if (palettes.length == 0) {
          await palettesController.create({
            owner: userId,
            proyectId: req.params.proyectId,
            name: 'default'
          });
          console.log('deafult palette created');
        }
        const palettesNews = await palettes.filter(palette => {
          if (palette.name) {
            if (palette.name.substring(0, 11) == 'New palette') return true;
          } else {
            return false;
          }
        });
        if (palettesNews) {
          let maxpalette = 0;
          palettesNews.forEach(palette => {
            const numberpalette = Number(palette.name.substring(12));
            if (numberpalette > maxpalette) {
              maxpalette = numberpalette;
            }
          });
          namePalette = `${namePalette} ${maxpalette + 1}`;
        }

        //const NEWpalette = {...req.body, owner: userId, name: namepalette}
        const newpalette = await palettesController.create({
          owner: userId,
          proyectId: req.params.proyectId,
          name: namePalette
        });
        return res.json({
          message: 'palette created successfully',
          payload: newpalette
        });
      }

      return res.json({ message: 'Error' });
    } catch (error) {
      console.log(error);
    }
  })
);

// UPDATE
paletteRoutes.put(
  '/:id',
  processError(async (req, res) => {
    let idPalette = req.params.id;
    let paletteSearch = await palettesController.getById(idPalette);

    if (paletteSearch === null) throw new PaletteNoExist(`Palette no exist`);

    let result = await palettesController.update(idPalette, { ...req.body });
    if (result) res.json({ message: 'Palette updated succesfully' });
  })
);

// DELETE
paletteRoutes.delete(
  '/:id',
  processError(async (req, res) => {
    let paletteToDelete = await palettesController.getById(req.params.id);
    if (paletteToDelete === null) throw new PaletteNoExist(`palette no exist `);
    console.log(paletteToDelete);
    let result = await palettesController.remove(req.params.id);
    if (result)
      res.json({
        message: 'Palette deleted succesfully',
        paletteDeleted: paletteToDelete
      });
  })
);

module.exports = paletteRoutes;
