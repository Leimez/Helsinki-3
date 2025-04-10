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

const getById = async (id) => {
  return await Person.findById(id);
};

const getCount = async () => {
  return await Person.countDocuments({});
};

const create = async (newPerson) => {
  const person = new Person(newPerson);
  return await person.save();
};

const remove = async (id) => {
  return await Person.findByIdAndRemove(id);
};

const update = async (id, newData) => {
  return await Person.findByIdAndUpdate(id, newData, { 
    new: true,
    runValidators: true 
  });
};

module.exports = {
  getAll,
  getById,
  getCount,
  create,
  remove,
  update
};
