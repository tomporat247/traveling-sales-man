import React, {useState} from 'react';
import './App.css';
import MyMap from './map/MyMap'
import SideNav from "./side-nav/SideNav";
import {LatLng} from "./types/lat-lng";
import {evolve, getBestRoute, getGeneration, initAlgorithm} from "./algorithm/algorithm";
import {BestRoute} from "./algorithm/types/best-route";
import {useInterval} from "./utils/use-interval";
import {Generation} from "./algorithm/types/generation";

const App = () => {
    const [points, setPoints] = useState<LatLng[]>([]);
    const [bestRoute, setBestRoute] = useState<BestRoute>();
    const [bestRouteEver, setBestRouteEver] = useState<BestRoute>();
    const [populationSize, setPopulationSize] = useState(200);
    const [mutationRate, setMutationRate] = useState(0.02);
    const [isRunning, setIsRunning] = useState(false);
    const [generation, setGeneration] = useState<Generation>();
    const [totalCombinations, setTotalCombinations] = useState(0);

    const updatePoints = (points: LatLng[]) => {
        setPoints(points);
        setTotalCombinations(Array.from(Array(points.length).keys()).reduce((acc: number, curr: number) => acc * (curr + 1), 1));
    };

    const runNextGeneration = () => {
        evolve();
        setGeneration(getGeneration());
        const best: BestRoute = getBestRoute();
        setBestRoute(best);
        setBestRouteEver((bestEver: BestRoute | undefined) =>
            !bestEver || best.totalDistance < bestEver.totalDistance ? best : bestEver)
    };

    useInterval(runNextGeneration, isRunning ? 1 : null);

    const startAlgorithm = () => {
        initAlgorithm({populationSize, mutationRate}, points);
        setBestRouteEver(undefined);
        runNextGeneration();
        setIsRunning(true);
    };

    const stopAlgorithm = () => {
        setBestRoute(undefined);
        setIsRunning(false);
    };

    return (
        <div className='appContainer'>
            <div className='map'>
                <MyMap
                    points={points}
                    route={bestRoute?.route}
                    bestRouteEver={bestRouteEver?.route}
                    onPointAdded={point => updatePoints([...points, point])}
                    onPointRemoved={pointToRemove => updatePoints(
                        points.filter(point => point[0] !== pointToRemove[0] || point[1] !== pointToRemove[1]))}
                />
            </div>
            <div className='side-nav'>
                <SideNav points={points} populationSize={populationSize} isRunning={isRunning}
                         totalCombinations={totalCombinations}
                         onPopulationSizeChange={setPopulationSize} mutationRate={mutationRate}
                         onMutationRateChange={setMutationRate} onStart={startAlgorithm} onStop={stopAlgorithm}
                         generation={generation}
                         bestRouteDistance={bestRoute?.totalDistance}
                         bestRouteEverDistance={bestRouteEver?.totalDistance}/>
            </div>
        </div>
    )
};

export default App;
