const mongoose = require('mongoose');
const Person = require('../models/person');

const url = 'mongodb://localhost:27017/phonebook';

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

const getAll = async () => {
  return await Person.find({});
};

const create = async (newPerson) => {
  const person = new Person(newPerson);
  return await person.save();
};

const remove = async (id) => {
  return await Person.findByIdAndRemove(id);
};

module.exports = {
  getAll,
  create,
  remove
};
