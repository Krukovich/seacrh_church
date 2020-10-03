import React from 'react';

import { Alert } from 'react-bootstrap';

const Warning = ({ message }) => {

  return(
    <Alert variant="danger">
      { message }
    </Alert>
  );
}

export default Warning;
