import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MAP_KEY, mapViewport } from '../../constants';
 
const Map = (props) => {
  debugger;
  return (
    <React.Fragment>
      <ReactMapGL
        {...mapViewport}
        mapboxApiAccessToken={MAP_KEY}
        mapStyle="mapbox://styles/mapbox/light-v10"
      >
        {(props || []).map((item) => (
            <Marker
              latitude={item.latitude}
              longitude={item.longitude}
            />
        ))}
      </ReactMapGL>
    </React.Fragment>
  );
}

export default Map;
