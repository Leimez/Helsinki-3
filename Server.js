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

app.get('/api/persons', async (req, res, next) => {
  const persons = await db.getAll().catch(next);
  if (persons) res.json(persons);
});

app.post('/api/persons', async (req, res, next) => {
  console.log('Received POST data:', req.body);
  const newPerson = req.body;
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }
  const savedPerson = await db.create(newPerson).catch(next);
  if (savedPerson) res.json(savedPerson);
});

app.delete('/api/persons/:id', async (req, res, next) => {
  const deletedPerson = await db.remove(req.params.id).catch(next);
  if (!deletedPerson) {
    return res.status(404).json({ error: 'Person not found' });
  }
  res.status(200).json(deletedPerson);
});

app.put('/api/persons/:id', async (req, res, next) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: 'Number missing' });
  }
  const updatedPerson = await db.update(req.params.id, { number }).catch(next);
  if (!updatedPerson) {
    return res.status(404).json({ error: 'Person not found' });
  }
  res.json(updatedPerson);
});

const PORT = process.env.PORT || 3001;
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  
  res.status(500).json({ 
    error: error.message || 'Something went wrong' 
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});




  

