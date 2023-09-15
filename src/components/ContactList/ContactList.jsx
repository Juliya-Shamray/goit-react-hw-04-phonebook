import PropTypes from 'prop-types';
import {
  StyledBtn,
  StyledLi,
  StyledList,
  StyledText,
} from './ContactList.styled';

export const ContactList = ({ filteredData, handleDelete }) => (
  <StyledList>
    {filteredData.map(contact => (
      <StyledLi key={contact.id}>
        <StyledText>
          {contact.name}: {contact.number}
        </StyledText>
        <StyledBtn onClick={() => handleDelete(contact.id)}>Delete</StyledBtn>
      </StyledLi>
    ))}
  </StyledList>
);
ContactList.propTypes = {
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  handleDelete: PropTypes.func,
};
