const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./services/db');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist'), { 
  index: 'index.html',
  extensions: ['html']
}));

app.get('/api/persons', async (req, res) => {
  try {
    const persons = await db.getAll();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching persons' });
  }
});

app.post('/api/persons', async (req, res) => {
  console.log('Received POST data:', req.body);
  const newPerson = req.body;
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }
  try {
    const savedPerson = await db.create(newPerson);
    res.json(savedPerson);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error creating person' });
  }
});

app.delete('/api/persons/:id', async (req, res) => {
  try {
    const deletedPerson = await db.remove(req.params.id);
    if (!deletedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(deletedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting person' });
  }
});

app.put('/api/persons/:id', async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: 'Number missing' });
  }
  try {
    const updatedPerson = await db.update(req.params.id, { number });
    if (!updatedPerson) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Error updating person' });
  }
});

app.get('/api/persons/:id', async (req, res) => {
  try {
    const person = await db.getById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching person' });
  }
});

app.get('/info', async (req, res) => {
  try {
    const count = await db.getCount();
    res.send(`
      <div>
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      </div>
    `);
  } catch (error) {
    res.status(500).send('Error getting info');
  }
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    error: error.message || 'Something went wrong' 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
