import React, { Component } from 'react';

import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import { MAP_KEY, MAP_ZOOM_SCALE, MODE } from '../../constants';

import 'mapbox-gl/dist/mapbox-gl.css';
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
        zoom: 11.5,
      }
    };
  }

  componentDidUpdate = (prevProps) => {
    if ( prevProps.latitude !== this.props.latitude
      && prevProps.longitude !== this.props.longitude) {

      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: this.props.latitude,
          longitude: this.props.longitude,
        }
      })
    }
  }

  setChangeViewport = (viewport) => {
    this.setState({viewport});
    this.props.handleZoom(viewport.zoom);
  }

  render() {
    const { churches, searchChurch, mode } = this.props;

    const markers = (mode === MODE.DETAILED) ? churches.map((church) => (
      <div
        key={church.id}
        className="wrapper"
        id={church.id}
        onClick={(event) => searchChurch(event.currentTarget.id)}
      >
        <Marker
          className="marker"
          key={church.id}
          latitude={Number(church.latitude)}
          longitude={Number(church.longitude)}
        />
      </div>
    )) : (
      <div style={{ "--marker-size": `${MAP_ZOOM_SCALE.MIDDLE * this.state.viewport.zoom}px` }}>
        <Marker
          className="marker_big"
          latitude={Number(this.props.latitude)}
          longitude={Number(this.props.longitude)}
        >
          <span style={{ fontSize: `${MAP_ZOOM_SCALE.LOW * this.state.viewport.zoom}px` }} >
            {churches.length}
          </span>
        </Marker>
      </div>
    )

    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setChangeViewport(viewport)}
        mapboxApiAccessToken={MAP_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        className="main-map"
      >
        { markers }
      </ReactMapGL>
    );
  }
}

export default Map;
