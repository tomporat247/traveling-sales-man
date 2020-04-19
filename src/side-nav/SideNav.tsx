import React, {useState} from "react";
import './SideNav.css'
import {LatLng} from "../types/lat-lng";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import AlgoParameters from "./algo-parameters/AlgoParameters";

const SideNav = (props: { points: LatLng[] }) => {
    const [populationSize, setPopulationSize] = useState(20);
    const [mutationRate, setMutationRate] = useState(0.02);
    const [isRunning, setIsRunning] = useState(false);
    return (
        <div id='side-nav-container'>
            <div>
                Point amount: {props.points.length}
                <div className='divider'>
                    <Divider/>
                </div>
                <AlgoParameters populationSize={populationSize} onPopulationSizeChange={setPopulationSize}
                                mutationRate={mutationRate} onMutationRateChange={setMutationRate}/>
                <div className='divider'>
                    <Divider/>
                </div>
            </div>
            <div>
                <Button className='action-button' variant="contained" color="primary" disabled={isRunning}
                        onClick={() => setIsRunning(true)}>
                    Start
                </Button>
                <Button className='action-button' variant="contained" color="secondary" disabled={!isRunning}
                        onClick={() => setIsRunning(false)}>
                    Stop
                </Button>
            </div>
        </div>
    );
};

export default SideNav;
