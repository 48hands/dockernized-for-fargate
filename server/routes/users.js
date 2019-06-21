const express = require('express');
const Joi = require('@hapi/joi');
const User = require('../models/users');
const router = express.Router();

const users = [
  new User('1', 'yuichi.nagakura', 32),
  new User('2', 'hanako.yamada', 22)
];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const { name, age } = req.body;
  const id = users.length + 1;
  const user = new User(id, name, age);
  const { error } = validateUser(user);
  if (error) {
    res.status(400).json(error.details.map((element) => element.message));
  } else {
    users.push(user);
    res.json(user);
  }
});

function validateUser(user) {
  const schema = {
    id: Joi.number().required(),
    name: Joi.string().min(3).required(),
    age: Joi.number().min(0).required()
  };
  return Joi.validate(user, schema);
}
module.exports = router;
