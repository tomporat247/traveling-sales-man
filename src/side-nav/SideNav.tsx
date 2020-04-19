import React, {useState} from "react";
import './SideNav.css'
import {LatLng} from "../types/lat-lng";
import Divider from "@material-ui/core/Divider";
import Button from '@material-ui/core/Button';
import AlgoParameters from "./algo-parameters/AlgoParameters";
import {AlgoParams} from "../types/algo-params";

const SideNav = (props: { points: LatLng[], onAlgoParamsChange: (params: AlgoParams) => any, onStart: () => any, onStop: () => any }) => {
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
                <AlgoParameters disabled={isRunning} onAlgoParamsChange={props.onAlgoParamsChange}/>
                <div className='divider'>
                    <Divider/>
                </div>
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
