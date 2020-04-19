import React, {useState} from 'react';
import './App.css';
import MyMap from './map/MyMap'
import SideNav from "./side-nav/SideNav";
import {LatLng} from "./types/lat-lng";
import {evolve, getBestRoute, getGeneration, initAlgorithm} from "./algorithm/algorithm";
import {BestRoute} from "./algorithm/types/best-route";

const App = () => {
    const [points, setPoints] = useState<LatLng[]>([]);
    const [bestRoute, setBestRoute] = useState<BestRoute>();
    const [bestRouteEver, setBestRouteEver] = useState<BestRoute>();
    const [populationSize, setPopulationSize] = useState(20);
    const [mutationRate, setMutationRate] = useState(0.02);
    const [intervalId, setIntervalId] = useState();
    const [isRunning, setIsRunning] = useState(false);

    const startAlgorithm = () => {
        initAlgorithm({populationSize, mutationRate}, points);
        setBestRouteEver(undefined);
        setIsRunning(true);
        setIntervalId(setInterval(() => {
            evolve();
            const best: BestRoute = getBestRoute();
            setBestRoute(best);
            setBestRouteEver((bestEver: BestRoute | undefined) => !bestEver || best.totalDistance < bestEver.totalDistance ? best : bestEver)
        }, 400));
    };

    const stopAlgorithm = () => {
        setBestRoute(undefined);
        setIsRunning(false);
        clearInterval(intervalId);
    };

    return (
        <div className='appContainer'>
            <div className='map'>
                <MyMap
                    points={points}
                    route={bestRoute?.route}
                    bestRouteEver={bestRouteEver?.route}
                    onPointAdded={point => setPoints([...points, point])}
                    onPointRemoved={pointToRemove => setPoints(
                        points.filter(point => point[0] !== pointToRemove[0] || point[1] !== pointToRemove[1]))}
                />
            </div>
            <div className='side-nav'>
                <SideNav points={points} populationSize={populationSize} isRunning={isRunning}
                         onPopulationSizeChange={setPopulationSize} mutationRate={mutationRate}
                         onMutationRateChange={setMutationRate} onStart={startAlgorithm} onStop={stopAlgorithm}
                         generation={getGeneration()}
                         bestRouteDistance={bestRoute?.totalDistance}
                         bestRouteEverDistance={bestRouteEver?.totalDistance}/>
            </div>
        </div>
    )
};

export default App;
