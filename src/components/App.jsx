import { nanoid } from 'nanoid';
import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { toast } from 'react-toastify';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const items = JSON.parse(window.localStorage.getItem('contacts'));

    if (items?.length) {
      this.setState({ contacts: items });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleAddContact = data => {
    const contact = {
      ...data,
      id: nanoid(),
    };
    const findByName = this.state.contacts.find(
      contact => contact.name === data.name
    );
    findByName
      ? toast.info(`${findByName.name} is already in contacts`)
      : this.setState(prev => ({
          contacts: [...prev.contacts, contact],
        }));
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { filter } = this.state;
    const filteredData = this.filterContacts();
    return (
      <div>
        <h1>Phone book</h1>
        <ContactForm handleAddContact={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleFilter={this.handleFilter} />
        <ContactList
          filteredData={filteredData}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}
