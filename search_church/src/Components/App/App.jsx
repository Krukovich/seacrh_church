import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  addNewChurches,
  setChurchName,
  setChurchAddress,
  setChurchPhone,
  setChurchUrl,
  setMode,
  setLatitude,
  setLongitude,
  setIsError
} from '../../Store/Actions';

import { getData, getCityInfo } from '../../service';
import { MESSAGE, MODE, BREAK_POINT } from '../../constants';

import Map from '../../Components/Map/Map';
import ChurchInfo from '../ChurchInfo/ChurchInfo';
import Search from '../Search/Search';
import Warning from '../Warning/Warning';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../App/App.scss';

const mapStateToProps = ({ appSettings }) => {
  return {
    isError: appSettings.isError,
    message: appSettings.message,
    churches: appSettings.churches,
    latitude: appSettings.latitude,
    longitude: appSettings.longitude,
    churchName: appSettings.churchName,
    churchPhoneNumber: appSettings.churchPhoneNumber,
    churchAddressStreetAddress: appSettings.churchAddressStreetAddress,
    churchUrl: appSettings.churchUrl,
    mode: appSettings.mode,
  }
}

const mapActionToProps = {
  addNewChurches,
  setChurchName,
  setChurchAddress,
  setChurchPhone,
  setChurchUrl,
  setMode,
  setLatitude,
  setLongitude,
  setIsError,
}

class App extends Component {

  componentDidMount = async () => {
    const { latitude, longitude, addNewChurches } = this.props;
    const data = await getData(latitude, longitude);
    addNewChurches(data);
  }

  handleZoom = async (zoom) => {
    const { setMode } = this.props;

    setMode((zoom < BREAK_POINT) ? MODE.GROUP : MODE.DETAILED);
  }

  searchChurch = (id) => {
    const {
      churches,
      setChurchName,
      setChurchPhone,
      setChurchAddress,
      setChurchUrl,
    } = this.props;

    const tempChurch = churches.find((church) => church.id === id);

    setChurchName(tempChurch.name);
    setChurchPhone(tempChurch.phone_number);
    setChurchAddress(tempChurch.church_address_street_address);
    setChurchUrl(tempChurch.url);
  }

  searchCity = async({ current }) => {
    const {
      addNewChurches,
      setIsError,
      setLatitude,
      setLongitude,
    } = this.props;

    try {
      const { location } = await getCityInfo(current.value);
      const data = await getData(location.lat, location.lon);
      addNewChurches(data);
      setIsError(false);
      debugger;
      setLatitude(location.lat);
      setLongitude(location.lon);

    } catch (error) {
      setIsError(true);
    }
  }
  
  render() {
    const { isError } = this.props;
    
    return(
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 mt-5">
              <div className="col-12">
                <Search searchCity={ this.searchCity } />
              </div>
              <div className="col-12">
                { isError ? <Warning message={ MESSAGE.NOT_FOUND } /> : '' }
              </div>
              <div className="col-12">
                <ChurchInfo />
              </div>
            </div>
            <div className="col-12 col-lg-6 mt-5">
              <Map
                searchChurch={ this.searchChurch }
                handleZoom={ this.handleZoom }
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapActionToProps)(App);
