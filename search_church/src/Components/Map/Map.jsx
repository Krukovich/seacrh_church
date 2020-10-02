import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAP_KEY } from '../../constants';
import { showChurchInfo } from '../../service';

import './Map.scss';

class Map extends Component {
  constructor(props) {
    super();
    this.state = {
      viewport: {
        width: 500,
        height: 500,
        latitude: props.latitude,
        longitude: props.longitude,
        zoom: 10
      }
  };
 
 }
  render() {
    const { church } = this.props;

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={MAP_KEY}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onViewportChange={(viewport) => this.setState({viewport})}
      >
        {church.map((church) => (
          <div
            key={church.id}
            className="wrapper"
            id={church.id}
            onClick={(event) => showChurchInfo(church, event.currentTarget.id)}
          >
            <Marker
              className="mapboxgl-marker"
              key={church.id}
              latitude={Number(church.latitude)}
              longitude={Number(church.longitude)}
          />
          </div>
        ))}
      </ReactMapGL>
    );
  }
}

export default Map;
