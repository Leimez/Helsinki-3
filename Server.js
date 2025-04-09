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
    res.status(500).json({ error: 'Error creating person' });
  }
});

app.delete('/api/persons/:id', async (req, res) => {
  try {
    await db.remove(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting person' });
  }
});

const PORT = process.env.PORT || 3001;
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});




  

