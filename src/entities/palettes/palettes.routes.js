const express = require('express');
const validateAdd = require('./palettes.validate');
const { processError } = require('../../libs/errorHandler');
const { PaletteNoExist, OwnerNoExist } = require('./palettes.error');
let palettesController = require('./palettes.controller');
const auth = require('../../libs/authentication');

const paletteRoutes = express.Router();

// LIST
paletteRoutes.get(
  '/',
  auth,
  processError(async (req, res) => {
    const payload = req.user;
    let userId = payload.id;
    let palettes = await palettesController.getAllWithFilter({ owner: userId });
    res.json({ payload: palettes });
  })
);

// CREATE
paletteRoutes.post(
  '/',
  auth,
  processError(async (req, res) => {
    try {
      const payload = req.user;
      let namePalette = 'New Palette';
      if (payload) {
        let userId = payload.id;
        //Generate name
        const palettes = await palettesController.getAllWithFilter({
          owner: userId
        });
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
          namepalette = `${namepalette} ${maxpalette + 1}`;
        }

        //const NEWpalette = {...req.body, owner: userId, name: namepalette}
        const newpalette = await palettesController.create({
          owner: userId,
          name: namepalette
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
    let idpalette = req.params.id;
    let productSearch = await palettesController.getById(idpalette);

    if (productSearch === null) throw new paletteNoExist(`palette no exist`);

    let result = await palettesController.update(idpalette, { ...req.body });
    if (result) res.json({ message: 'product updated succesfully' });
  })
);

// DELETE
paletteRoutes.delete(
  '/:id',
  processError(async (req, res) => {
    let productToDelete = await palettesController.getById(req.params.id);
    if (productToDelete === null) throw new paletteNoExist(`palette no exist `);
    console.log(productToDelete);
    let result = await palettesController.remove(req.params.id);
    if (result)
      res.json({
        message: 'palette deleted succesfully',
        productDeleted: productToDelete
      });
  })
);

module.exports = paletteRoutes;
