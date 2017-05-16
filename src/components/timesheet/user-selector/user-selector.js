import React from 'react';
import PropTypes from 'prop-types';

export default function UserSelector({ selected = '', data = [], handleOnChange }) {
  return (
    <form>
      <label>
        Select User:
        <select value={selected} onChange={handleOnChange}>
          <option value="">Please Select</option>
          {data.map(({ id, username }) =>
            <option key={id} value={id}>{username}</option>
          )}
        </select>
      </label>
    </form>
  );
}
UserSelector.propTypes = {
  selected: PropTypes.number,
  data: PropTypes.array.isRequired,
  handleOnChange: PropTypes.func.isRequired,
}
