import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';
import { MAP_KEY, MAP_ZOOM_SCALE, MODE } from '../../constants';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.scss';

const mapStateToProps = ({ appSettings }) => {
  return {
    churches: appSettings.churches,
    latitude: appSettings.latitude,
    longitude: appSettings.longitude,
    mode: appSettings.mode,
  }
}

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
        zoom: 11,
      }
    };
  }

  componentDidUpdate = (prevProps) => {
    const { latitude, longitude } = this.props;
    const { viewport } = this.state;

    if ( prevProps.latitude !== latitude || prevProps.longitude !== longitude) { 

      this.setState({
        viewport: {
          ...viewport,
          latitude: latitude,
          longitude: longitude,
        }
      })
    }
  }

  setChangeViewport = (viewport) => {
    const { handleZoom } = this.props;

    this.setState({viewport});
    handleZoom(viewport.zoom);
  }

  render() {
    const {
      churches,
      searchChurch,
      mode,
      latitude,
      longitude,
    } = this.props;

    const { viewport } = this.state;

    const markers = (mode === MODE.DETAILED) ? churches.map((church) => (
      <div
        key={ church.id }
        className="wrapper"
        id={ church.id }
        onClick={ (event) => searchChurch(event.currentTarget.id) }
      >
        <Marker
          className="marker"
          key={ church.id }
          latitude={ Number(church.latitude) }
          longitude={ Number(church.longitude) }
        />
      </div>
    )) : (
      <div style={{ "--marker-size": `${MAP_ZOOM_SCALE.MIDDLE * viewport.zoom}px` }}>
        <Marker
          className="marker_big"
          latitude={ Number(latitude) }
          longitude={ Number(longitude) }
        >
          <span style={{ fontSize: `${MAP_ZOOM_SCALE.LOW * viewport.zoom}px` }} >
            {churches.length}
          </span>
        </Marker>
      </div>
    )

    return (
      <ReactMapGL
        { ...viewport }
        onViewportChange={ (viewport) => this.setChangeViewport(viewport) }
        mapboxApiAccessToken={ MAP_KEY }
        mapStyle="mapbox://styles/mapbox/streets-v11"
        className="main-map"
      >
        { markers }
      </ReactMapGL>
    );
  }
}

export default connect(mapStateToProps)(Map);
