import { Component } from 'react';
import PropTypes from 'prop-types';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import Form from '../Form/Form';
import { PhoneBook, Container, PhoneContacts } from './App.styled';

export class App extends Component {
  static propTypes = {
    onSubmitName: PropTypes.object,
  };

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addName = object => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === object.name)) {
      return alert(`${object.name} is already in contact`);
    }

    this.setState(prevState => ({
      contacts: [object, ...prevState.contacts],
    }));
    console.log(contacts);
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };
  onFilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  onDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.onFilterContacts();

    return (
      <Container>
        <PhoneBook>Телефонна книга</PhoneBook>
        <Form onSubmitName={this.addName} />
        <PhoneContacts>Контакти</PhoneContacts>
        <Filter filterValue={filter} onChange={this.changeFilter}></Filter>
        <ContactList
          contacts={visibleContacts}
          onDelete={this.onDeleteContact}
        />
      </Container>
    );
  }
}
