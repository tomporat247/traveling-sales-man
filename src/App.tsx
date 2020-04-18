import React from 'react';
import './App.css';
import Map from './map/Map'

const App = () => (
    <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{height: `100%`}}/>}
        containerElement={<div style={{height: `100vh`}}/>}
        mapElement={<div style={{height: `100%`}}/>}
    />
);

export default App;
