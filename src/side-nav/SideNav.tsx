import React from "react";
import './SideNav.css'
import {LatLng} from "../types/lat-lng";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import AlgoParameters from "./algo-parameters/AlgoParameters";
import {Generation} from "../algorithm/types/generation";
import {numberWithCommas} from "../utils/general-utils";

const SideNav = (props: {
    points: LatLng[],
    isRunning: boolean,
    totalCombinations: number,
    generation?: Generation,
    bestRouteDistance?: number,
    bestRouteEverDistance?: number,
    populationSize: number,
    onPopulationSizeChange: (size: number) => any,
    mutationRate: number,
    onMutationRateChange: (rate: number) => any,
    onStart: () => any,
    onStop: () => any
}) => {

    const start = () => props.onStart();

    const stop = () => props.onStop();


    return (
        <div id='side-nav-container'>
            <div>
                <p>Point amount: {props.points.length}</p>
                <p>Combinations: {numberWithCommas(props.totalCombinations)} ({props.totalCombinations.toString().length})</p>
                <div className='divider'>
                    <Divider/>
                </div>
                <AlgoParameters disabled={props.isRunning} populationSize={props.populationSize}
                                onPopulationSizeChange={props.onPopulationSizeChange} mutationRate={props.mutationRate}
                                onMutationRateChange={props.onMutationRateChange}/>
            </div>
            <div className='divider'>
                <Divider/>
            </div>
            <div>
                {props.generation && <p>Generation: {props.generation.count}</p>}
                {props.generation && <p>Calculation time: {props.generation.executionTime}</p>}
                {props.bestRouteEverDistance && <p>Best ever: {props.bestRouteEverDistance}</p>}
                {props.bestRouteDistance && <p>Current best: {props.bestRouteDistance}</p>}
            </div>
            <div className='divider'>
                <Divider/>
            </div>
            <div>
                <Button className='action-button' variant="contained" color="primary"
                        disabled={props.isRunning || props.points.length === 0} onClick={start}>
                    Start
                </Button>
                <Button className='action-button' variant="contained" color="secondary"
                        disabled={!props.isRunning} onClick={stop}>
                    Stop
                </Button>
            </div>
        </div>
    );
};

export default SideNav;
