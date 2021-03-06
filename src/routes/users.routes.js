const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userValidate = require('../libs/users.validate');
const auth = require('../helpers/authentication');
const userController = require('../controllers/users.controller');
const router = express.Router();
const { processError } = require('../helpers/errorHandler');
const {
  InvalidAuthentication,
  UserNoExist,
  UsernameAlreadyExists,
  InvalidCode
} = require('../libs/users.error');
require('dotenv').config();

router.get(
  '/',
  processError(async (req, res) => {
    let users = await userController.getAll();
    res.json(users);
  })
);

router.get(
  '/whoami',
  auth,
  processError(async (req, res) => {
    const payload = req.user;
    if (payload) {
      let userSearched = await userController.getById(payload.id);
      let user = {
        name: userSearched.name,
        email: userSearched.email
      };
      res.json({ user });
    } else {
      res.status(400).json({ message: 'Invalid token' });
    }
  })
);

router.post(
  '/register',
  userValidate,
  processError(async (req, res) => {
    let email = req.body.email;
    let userSearched = await userController.getOne({ email });
    if (userSearched) throw new UsernameAlreadyExists('User exist');
    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    let newUser = { ...req.body, password: hashPassword };
    const userCreated = await userController.create(newUser);
    const token = jwt.sign({ id: userCreated._id }, process.env.SECRET_KEY, {
      expiresIn: '10h'
    });
    res.json({ message: 'User registerd succesfully.', token });
  })
);

router.post(
  '/',
  userValidate,
  processError(async (req, res) => {
    const hashPassword = '';
    if (req.body.password) {
      hashPassword = bcrypt.hashSync(req.body.password, 10);
    }
    let newUser = { ...req.body, password: hashPassword };
    let email = req.body.email;
    let userSearched = await userController.getOne({ email });
    if (userSearched) throw new UsernameAlreadyExists('User exist');
    const userCreated = await userController.create(newUser);
    const token = jwt.sign({ id: userCreated._id }, process.env.SECRET_KEY, {
      expiresIn: '10h'
    });
    res.json({ token });
  })
);

router.put(
  '/:id',
  auth,
  processError(async (req, res) => {
    let userSearched = await userController.getById(req.params.id);
    if (userSearched === null) throw new UserNoExist("User doesn't exist");

    const hashPassword = bcrypt.hashSync(req.body.password, 10);
    let result = await userController.update(req.params.id, {
      ...userSearched._doc,
      ...req.body,
      password: hashPassword
    });
    if (result) {
      res.status(200).json({ message: 'User updated' });
    }
  })
);

router.delete(
  '/:id',
  auth,
  processError(async (req, res) => {
    let userIndexSearched = await userController.remove({ _id: req.params.id });
    if (userIndexSearched === null) throw new UserNoExist("user doesn't exist");

    return res.json({ message: 'User deleted succesfully' });
  })
);

router.post(
  '/login',
  processError(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userSearched = await userController.getOne({ email });

    if (userSearched === null) throw new UserNoExist("Email doesn't exist");
    const isAuthenticated = bcrypt.compareSync(password, userSearched.password);
    if (!isAuthenticated)
      throw new InvalidAuthentication('Username or password  invalid');
    const token = jwt.sign({ id: userSearched.id }, process.env.SECRET_KEY, {
      expiresIn: '10h'
    });
    res.json({ token });
  })
);

module.exports = router;
