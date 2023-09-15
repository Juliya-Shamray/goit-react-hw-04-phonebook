import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { toast } from 'react-toastify';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (name, number) => {
    console.log(name, number);

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    const findByName = contacts.find(contact => contact.name === name);

    findByName
      ? toast.info(`${findByName.name} is already in contacts`)
      : setContacts(prev => [...prev, contact]);
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };
  const filteredData = filterContacts();

  return (
    <div>
      <h1>Phone book</h1>
      <ContactForm handleAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <ContactList filteredData={filteredData} handleDelete={handleDelete} />
    </div>
  );
};
