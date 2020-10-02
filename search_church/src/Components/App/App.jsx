import React, { Component } from 'react';

import { getData } from '../../service';

import Map from '../../Components/Map/Map';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../App/App.scss';

class App extends Component {
  constructor() {
    super()

    this.state = {
      church: [],
      latitude: 40.730610,
      longitude: -73.935242,
    }
  }

  componentDidMount = async () => {
    const data = await getData();
    this.setState({ church: data });
    console.log(data);
  }

  render() {
    const { church, latitude, longitude } = this.state;

    return(
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 mt-5">
              Menu
            </div>
            <div className="col-12 col-lg-6 mt-5">
              <Map
                church={ church }
                latitude={ latitude }
                longitude={ longitude }
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;