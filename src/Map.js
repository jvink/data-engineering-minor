import React, { useState } from 'react';
import MapGL, { CustomLayer } from '@urbica/react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { PolygonLayer } from '@deck.gl/layers';

import buildings from './buildings.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.917156,
    longitude: 4.483860,
    zoom: 12
  });
  const material = {
    ambient: 0.1,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [60, 64, 70]
  };

  const otherDeckLayer = new MapboxLayer({
    id: 'buildings',
    type: PolygonLayer,
    data: buildings,
    extruded: true,
    pickable: true,
    wireframe: false,
    opacity: 1,
    getPolygon: f => f.polygon,
    getElevation: f => f.height,
    getFillColor: [255, 0, 0],
    material,
    onHover: (e) => {
      console.log(e)
    }
  });

  return (
    <>
      <MapGL
        style={{ width: '100%', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/light-v9'
        accessToken='pk.eyJ1IjoianVyY3VyciIsImEiOiJjazZobWR5Z20xYnhxM2tudm9wZHp5c2F5In0.no8NkOtrrEu_SgwFdKr41Q'
        onViewportChange={setViewport}
        {...viewport}
      >
        <CustomLayer layer={otherDeckLayer} />
      </MapGL>
    </>
  );
}

export default Map;
