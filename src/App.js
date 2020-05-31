import React from 'react';
import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { StaticMap } from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVyY3VyciIsImEiOiJjazZobWR5Z20xYnhxM2tudm9wZHp5c2F5In0.no8NkOtrrEu_SgwFdKr41Q';

// Initial viewport settings
const initialViewState = {
  longitude: 4.47917,
  latitude: 51.9225,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [{ sourcePosition: [4.47917, 51.9225], targetPosition: [4.67361, 51.81] }];

const App = () => {
  const layers = [
    new LineLayer({ id: 'line-layer', data })
  ];

  return (
    <DeckGL initialViewState={initialViewState} layers={layers}>
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
}

export default App;
