import React from 'react';
import { connect } from 'react-redux';
 
import { Card } from 'react-bootstrap';

const mapStateToProps = ({ appSettings }) => {
  return {
    churchName: appSettings.churchName,
    churchPhoneNumber: appSettings.churchPhoneNumber,
    churchAddress: appSettings.churchAddress,
    churchUrl: appSettings.churchUrl,
  }
}

const ChurchInfo = (props) => {

  const {
    churchName,
    churchPhoneNumber,
    churchAddress,
    churchUrl,
  } = props;
  
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Church Info</Card.Title>
        <div className="col-12">
          { churchName }
        </div>
        <div className="col-12">
          { churchPhoneNumber }
        </div>
        <div className="col-12">
          { churchAddress }
        </div>
        <div className="col-12">
          <a href={ churchUrl ? churchUrl : '' }>{ churchUrl ? churchUrl : '' }</a>
        </div>
      </Card.Body>
    </Card>
  );
}

export default connect(mapStateToProps)(ChurchInfo);
