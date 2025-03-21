const express = require('express');
const app = express();
app.use(express.json())

app.set('json spaces', 2); 

const persons = [
  { id: 1, name: 'John Doe', number: '123-456-7890' },
  { id: 2, name: 'Jane Smith', number: '234-567-8901' },
  { id: 3, name: 'Bob Johnson', number: '345-678-9012' }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).send({ error: 'Person not found' });
  }
});

app.get('/info', (req, res) => {
  const count = persons.length;
  const date = new Date().toString();
  res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = persons.findIndex(p => p.id === id);
  
    if (index !== -1) {
      persons.splice(index, 1);
      res.status(204).end(); 
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  });
  app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }

    const person = {
        id: Math.floor(Math.random() * 10000), 
        name: body.name,
        number: body.number
    };

    persons.push(person);
    res.json(person);
});
app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({ error: 'Name or number is missing' });
    }

    if (persons.some(p => p.name === body.name)) {
        return res.status(400).json({ error: 'Name must be unique' });
    }

    const newPerson = {
        id: Math.floor(Math.random() * 1000000),
        name: body.name,
        number: body.number
    };

    persons.push(newPerson);
    res.json(newPerson);
});

  

