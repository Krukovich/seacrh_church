import React, { useRef } from 'react';

import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';

const Search = (props) => {
  const input = useRef(null);

  const { searchCity } = props;

  const handlerSubmit = (event) => {
    event.preventDefault();
    searchCity(input);
  }

  return (
    <Form onSubmit={ (event) => handlerSubmit(event) }>
      <InputGroup className="mb-3">
        <FormControl
          ref={input}
          placeholder="Enter city name"
        />
        <InputGroup.Append>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={ (event) => handlerSubmit(event) }
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
}

export default Search;
