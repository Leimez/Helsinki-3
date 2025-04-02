const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

const persons = [
  { id: 1, name: 'John Doe', number: '123-456-7890' },
  { id: 2, name: 'Jane Smith', number: '234-567-8901' },
  { id: 3, name: 'Bob Johnson', number: '345-678-9012' }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




  

