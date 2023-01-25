import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Button, FormStyle, Input, TitleInput } from './Form.styled';

export default function Form({ onSubmitName }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onhandleSubmit = e => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.number.value);
    const ListContacts = {
      name,
      number,
      id: nanoid(),
    };

    onSubmitName(ListContacts);
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <FormStyle onSubmit={onhandleSubmit}>
      <TitleInput>
        Ім'я
        <Input
          onChange={handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </TitleInput>
      <TitleInput>
        Телефон
        <Input
          onChange={handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </TitleInput>
      <Button type="submit">Додати контакт</Button>
    </FormStyle>
  );
}
