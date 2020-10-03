import React, { Component } from 'react';

import { getData, getCityInfo } from '../../service';
import { MESSAGE } from '../../constants';

import Map from '../../Components/Map/Map';
import ChurchInfo from '../ChurchInfo/ChurchInfo';
import Search from '../Search/Search';
import Warning from '../Warning/Warning';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../App/App.scss';

class App extends Component {
  constructor() {
    super()

    this.state = {
      isError: false,
      message: '',
      churches: [],
      latitude: 40.730610,
      longitude: -73.935242,
      churchName: '',
      churchPhoneNumber: '',
      churchAddressStreetAddress: '',
      churchUrl: '',
    }
  }

  componentDidMount = async () => {
    const { latitude, longitude } = this.state;
    const data = await getData(latitude, longitude);
    this.setState({ churches: data });
  }


  searchChurchOnMoveMap = async (lat, lon) => {
    const { churches } = this.state;
    const churchIds = churches.map((church) => church.id);
    const data = await getData(lat, lon);
    const newChurches = data.filter((newChurch) => !churchIds.includes(newChurch.id));
    this.setState({ churches: [...churches, ...newChurches] });
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
    try {
      const { location } = await getCityInfo(current.value);
      const data = await getData(location.lat, location.lon);
      this.setState(
        {
          churches: data, 
          latitude: location.lat,
          longitude: location.lon,
          isError: false,
        }
      ); 
    } catch (error) {
      this.setState({ isError: true });
    }
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
      isError,
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
                { isError ? <Warning message={ MESSAGE.NOT_FOUND } /> : '' }
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
                searchChurchOnMoveMap={ this.searchChurchOnMoveMap }
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;