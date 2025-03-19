const express = require('express');
const app = express();

app.set('json spaces', 2); 

const persons = [
  { id: 1, name: 'John Doe', number: '123-456-7890' },
  { id: 2, name: 'Jane Smith', number: '234-567-8901' },
  { id: 3, name: 'Bob Johnson', number: '345-678-9012' }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
