import { useState, useEffect } from 'react';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
