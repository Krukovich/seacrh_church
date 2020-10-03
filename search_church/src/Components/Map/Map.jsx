import React, { Component } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAP_KEY } from '../../constants';

import './Map.scss';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 500,
        height: 500,
        latitude: props.latitude,
        longitude: props.longitude,
        transitionInterpolator: new FlyToInterpolator({speed: 1.2}),
        transitionDuration: 'auto',
        zoom: 10,
      }
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude: nextProps.latitude,
        longitude: nextProps.longitude,
      }
    })
  } 

  render() {
    const { churches, searchChurch } = this.props;

    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAP_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {churches.map((church) => (
          <div
            key={church.id}
            className="wrapper"
            id={church.id}
            onClick={(event) => searchChurch(event.currentTarget.id)}
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
