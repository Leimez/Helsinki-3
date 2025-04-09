const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

let persons = [
  { id: 1, name: 'John Doe', number: '123-456-7890' },
  { id: 2, name: 'Jane Smith', number: '234-567-8901' },
  { id: 3, name: 'Bob Johnson', number: '345-678-9012' }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.post('/api/persons', (req, res) => {
  console.log('Received POST data:', req.body);
  const newPerson = req.body;
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }
  newPerson.id = Math.floor(Math.random() * 1000000);
  persons.push(newPerson);
  res.json(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




  

