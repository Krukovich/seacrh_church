import React, { Component } from 'react';

import { getData, getCityInfo } from '../../service';

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
      latitude: 0,
      longitude: 0,
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

  searchChurch = (id) => {
    const { churches } = this.state;
    const tempChurch = churches.find((church) => church.id === id);
    this.setState(
      {
        churchName: tempChurch.name,
        churchPhoneNumber: tempChurch.phone_number,
        churchAddressStreetAddress: tempChurch.church_address_street_address,
        churchUrl: tempChurch.url,
      }
    );
  }

  searchCity = async({ current }) => {
    const { location } = await getCityInfo(current.value);
    this.setState(
      {
        latitude: location.lat,
        longitude: location.lon,
      }
    );
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
                  searchCity={ this.searchCity }
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