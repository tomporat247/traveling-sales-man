import React, {useState} from 'react';
import './App.css';
import MyMap from './map/MyMap'
import SideNav from "./side-nav/SideNav";
import {LatLng} from "./types/lat-lng";
import {evolve, getBestRoute, getGeneration, initAlgorithm} from "./algorithm/algorithm";

const App = () => {
    const [points, setPoints] = useState<LatLng[]>([]);
    const [bestRoute, setBestRoute] = useState<LatLng[]>([]);
    const [populationSize, setPopulationSize] = useState(20);
    const [mutationRate, setMutationRate] = useState(0.02);

    const startAlgorithm = () => {
        initAlgorithm({populationSize, mutationRate}, points);
        evolve();
        setBestRoute(getBestRoute());
    };

    return (
        <div className='appContainer'>
            <div className='map'>
                <MyMap
                    points={points}
                    route={bestRoute}
                    onPointAdded={point => setPoints([...points, point])}
                    onPointRemoved={pointToRemove => setPoints(
                        points.filter(point => point[0] !== pointToRemove[0] || point[1] !== pointToRemove[1]))}
                />
            </div>
            <div className='side-nav'>
                <SideNav points={points} populationSize={populationSize}
                         onPopulationSizeChange={setPopulationSize} mutationRate={mutationRate}
                         onMutationRateChange={setMutationRate} onStart={startAlgorithm} onStop={console.log}
                generation={getGeneration()}/>
            </div>
        </div>
    )
};

export default App;
