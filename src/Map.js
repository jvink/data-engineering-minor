import React, { useState } from 'react';
import MapGL, { CustomLayer } from '@urbica/react-map-gl';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ArcLayer, PolygonLayer } from '@deck.gl/layers';

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

  const myDeckLayer = new MapboxLayer({
    id: 'deckgl-arc',
    type: ArcLayer,
    data: [
      { source: [4, 52], target: [3, 50] }
    ],
    getSourcePosition: (d) => d.source,
    getTargetPosition: (d) => d.target,
    getSourceColor: [255, 208, 0],
    getTargetColor: [0, 128, 255],
    getWidth: 12
  });
  const otherDeckLayer = new MapboxLayer({
    id: 'buildings',
    type: PolygonLayer,
    data: buildings,
    extruded: true,
    wireframe: false,
    opacity: 1,
    getPolygon: f => f.polygon,
    getElevation: f => f.height,
    getFillColor: '#ede4ad',
    material,
  });

  return (
    <MapGL
      style={{ width: '100%', height: '100vh' }}
      mapStyle='mapbox://styles/mapbox/light-v9'
      accessToken='pk.eyJ1IjoianVyY3VyciIsImEiOiJjazZobWR5Z20xYnhxM2tudm9wZHp5c2F5In0.no8NkOtrrEu_SgwFdKr41Q'
      onViewportChange={setViewport}
      {...viewport}
    >
      <CustomLayer layer={myDeckLayer} />
      <CustomLayer layer={otherDeckLayer} />
    </MapGL>
  );
}

export default Map;
