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
    }
  }

  componentDidMount = async () => {
    const data = await getData();
    this.setState({ church: data });
  }

  render() {
    const { church } = this.state;

    return(
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              Menu
            </div>
            <div className="col-12 col-lg-6">
              <Map church={ church } />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;