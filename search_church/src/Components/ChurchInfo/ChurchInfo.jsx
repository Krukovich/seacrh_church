import React from 'react';

import { Card } from 'react-bootstrap';

const ChurchInfo = (props) => {

  const {
    churchName,
    churchPhoneNumber,
    churchAddressStreetAddress,
    churchUrl,
  } = props;
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Church Info</Card.Title>
        <div className="col-12">
          {churchName}
        </div>
        <div className="col-12">
          {churchPhoneNumber}
        </div>
        <div className="col-12">
          {churchAddressStreetAddress}
        </div>
        <div className="col-12">
          <a href={churchUrl ? churchUrl : ''}>{churchUrl ? churchUrl : ''}</a>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ChurchInfo;
