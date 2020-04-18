import React, {useState} from 'react';
import './App.css';
import MyMap from './map/MyMap'
import SideNav from "./side-nav/SideNav";
import {LatLng} from "./types/lat-lng";

const App = () => {
    const [points, setPoints] = useState<LatLng[]>([]);
    return (
        <div className='appContainer'>
            <div className='map'>
                <MyMap
                    points={points}
                    lines={[]}
                    onPointAdded={point => setPoints([...points, point])}
                    onPointRemoved={pointToRemove => setPoints(
                        points.filter(point => point[0] !== pointToRemove[0] || point[1] !== pointToRemove[1]))}
                />
            </div>
            <div className='side-nav'>
                <SideNav points={points}/>
            </div>
        </div>
    )
};

export default App;
