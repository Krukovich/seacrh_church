import React, { Component } from 'react';

import { getData } from '../../service';

import Map from '../../Components/Map/Map';
import ChurchInfo from '../ChurchInfo/ChurchInfo';
import Search from '../Search/Search';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../App/App.scss';

class App extends Component {
  constructor() {
    super()

    this.state = {
      churches: [],
      latitude: 40.730610,
      longitude: -73.935242,
      cityName: '',
      churchName: '',
      churchPhoneNumber: '',
      churchAddressStreetAddress: '',
      churchUrl: '',
    }
  }

  componentDidMount = async () => {
    const data = await getData();
    this.setState({ churches: data });
  }

  writeQuery = (label, value) => {
    this.setState({ [label]: value});
  }

  searchChurch = (id) => {
    const { churches } = this.state;
    const tempCurch = churches.filter((church) => church.id === id);
    this.setState(
      {
        churchName: tempCurch[0].name,
        churchPhoneNumber: tempCurch[0].phone_number,
        churchAddressStreetAddress: tempCurch[0].church_address_street_address,
        churchUrl: tempCurch[0].url,
      }
    );
  }

  searchChurchInCity = () => {
    const { churches, cityName } = this.state;
    const newData = churches.filter((church) => church.church_address_city_name = cityName);
    this.setState({ churches: newData });
  }
  

  render() {
    const {
      churches,
      latitude,
      longitude,
      churchName,
      churchPhoneNumber,
      churchAddressStreetAddress,
      churchUrl,
    } = this.state;

    return(
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 mt-5">
              <div className="col-12">
                <Search
                  writeQuery={ this.writeQuery }
                  searchChurchInCity={ this.searchChurchInCity }
                />
              </div>
              <div className="col-12">
                <ChurchInfo
                  churchName={ churchName }
                  churchPhoneNumber={ churchPhoneNumber }
                  churchAddressStreetAddress={ churchAddressStreetAddress }
                  churchUrl={ churchUrl }
                />
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-5">
              <Map
                churches={ churches }
                latitude={ latitude }
                longitude={ longitude }
                searchChurch={ this.searchChurch }
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;