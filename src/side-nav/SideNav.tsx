import React, {useState} from "react";
import './SideNav.css'
import {LatLng} from "../types/lat-lng";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import AlgoParameters from "./algo-parameters/AlgoParameters";
import {Generation} from "../algorithm/types/generation";

const SideNav = (props: {
    points: LatLng[],
    generation: Generation,
    populationSize: number,
    onPopulationSizeChange: (size: number) => any,
    mutationRate: number,
    onMutationRateChange: (rate: number) => any,
    onStart: () => any,
    onStop: () => any
}) => {
    const [isRunning, setIsRunning] = useState(false);

    const start = () => {
        setIsRunning(true);
        props.onStart();
    };

    const stop = () => {
        setIsRunning(false);
        props.onStop();
    };


    return (
        <div id='side-nav-container'>
            <div>
                Point amount: {props.points.length}
                <div className='divider'>
                    <Divider/>
                </div>
                <AlgoParameters disabled={isRunning} populationSize={props.populationSize}
                                onPopulationSizeChange={props.onPopulationSizeChange} mutationRate={props.mutationRate}
                                onMutationRateChange={props.onMutationRateChange}/>
            </div>
            <div className='divider'>
                <Divider/>
            </div>
            <div>
                {props.generation && <div>Generation: {props.generation.count}</div>}
                {props.generation&& <div>Calculation time: {props.generation.executionTimeInMS}</div>}
            </div>
            <div className='divider'>
                <Divider/>
            </div>
            <div>
                <Button className='action-button' variant="contained" color="primary"
                        disabled={isRunning} onClick={start}>
                    Start
                </Button>
                <Button className='action-button' variant="contained" color="secondary"
                        disabled={!isRunning} onClick={stop}>
                    Stop
                </Button>
            </div>
        </div>
    );
};

export default SideNav;
