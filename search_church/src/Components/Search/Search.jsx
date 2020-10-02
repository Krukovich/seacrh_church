import React from 'react';

import { InputGroup, FormControl, Button } from 'react-bootstrap';

const Search = (props) => {

  const { writeQuery, searchChurchInCity } = props;

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter city name"
        onChange={(event) => writeQuery('cityName', event.target.value)}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={() => searchChurchInCity()}
        >
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>  
  );
}

export default Search;
