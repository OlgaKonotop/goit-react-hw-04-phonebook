import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import Form from '../Form/Form';
import { PhoneBook, Container, PhoneContacts } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  //
  useEffect(() => {
    console.log(11);
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = object => {
    if (contacts.find(contact => contact.name === object.name)) {
      return alert(`${object.name} is already in contact`);
    }

    setContacts(prevState => [object, ...prevState]);
    console.log(contacts);
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };
  const onFilterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const onDeleteContact = contactId => {
    setContacts(prevState => ({
      contacts: prevState.filter(contact => contact.id !== contactId),
    }));
  };

  const visibleContacts = onFilterContacts();

  return (
    <Container>
      <PhoneBook>Телефонна книга</PhoneBook>
      <Form onSubmitName={addContacts} />
      <PhoneContacts>Контакти</PhoneContacts>
      <Filter filterValue={filter} onChange={changeFilter}></Filter>
      <ContactList contacts={visibleContacts} onDelete={onDeleteContact} />
    </Container>
  );
}

App.propTypes = {
  onSubmitName: PropTypes.object,
};
