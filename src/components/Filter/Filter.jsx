import PropTypes from 'prop-types';
import { StyledInput, StyledText } from './Filter.styled';

export const Filter = ({ filter, handleFilter }) => (
  <>
    <StyledText>Find contacts by name</StyledText>
    <StyledInput
      type="text"
      name="name"
      value={filter}
      onChange={handleFilter}
    />
  </>
);

Filter.propsType = {
  filter: PropTypes.string,
  handleFilter: PropTypes.func,
};
