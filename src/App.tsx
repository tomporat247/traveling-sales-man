import React from 'react';
import './App.css';
import Map from './map/Map'
import SideNav from "./side-nav/SideNav";

const App = () => (
    <div className='appContainer'>
        <div className='map'>
            <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{height: `100%`}}/>}
                containerElement={<div style={{height: `100vh`}}/>}
                mapElement={<div style={{height: `100%`}}/>}
            />
        </div>
        <div className='side-nav'>
            <SideNav/>
        </div>
    </div>
);

export default App;
