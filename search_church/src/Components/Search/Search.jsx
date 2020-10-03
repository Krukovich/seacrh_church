import React, { useRef } from 'react';

import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const Search = (props) => {
  const input = useRef(null);

  const { searchCity } = props;

  return (
    <Form onSubmit={() => searchCity(input)}>
      <InputGroup className="mb-3">
        <FormControl
          ref={input}
          placeholder="Enter city name"
        />
        <InputGroup.Append>
          <Button
            type="submit"
            variant="outline-secondary"
            onClick={() => searchCity(input)}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>  
  );
}

export default Search;
