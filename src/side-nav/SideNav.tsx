import React from "react";
import './SideNav.css'
import {LatLng} from "../types/lat-lng";

const SideNav = (props: {points: LatLng[]}) => (
    <div>
        <p>points: {JSON.stringify(props.points)}</p>
    </div>
);

export default SideNav;
