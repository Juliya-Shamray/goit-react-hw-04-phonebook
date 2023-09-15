import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyledBtn,
  StyledForm,
  StyledInput,
  StyledLabel,
} from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddContact(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <StyledLabel>
          Name
          <StyledInput
            type="text"
            name="name"
            pattern="^[A-Za-zА-Яа-я\s'\-]{3,20}"
            title="Name may contain only letters apostrophe, dash and spaces. Min- 3, max- 20 letters"
            required
            value={name}
            onChange={this.handleChange}
          />
        </StyledLabel>
        <StyledLabel>
          Number
          <StyledInput
            type="tel"
            name="number"
            pattern="[0-9+\s]*"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleChange}
          />
        </StyledLabel>
        <StyledBtn type="submit" onClick={this.handleAddContact}>
          Add contact
        </StyledBtn>
      </StyledForm>
    );
  }
}

ContactForm.propTypes = {
  handleAddContact: PropTypes.func,
};
