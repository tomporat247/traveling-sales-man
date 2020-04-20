import React from 'react';
import {LatLng} from "../types/lat-lng";
import {Map, TileLayer, Marker, Polyline, Tooltip} from 'react-leaflet';

const MyMap = (props: {
    points: LatLng[],
    onPointAdded: (point: LatLng) => any,
    onPointRemoved: (point: LatLng) => any
    route?: LatLng[],
    bestRouteEver?: LatLng[],
}) =>
    <Map center={[37.360699, -96.769850]} zoom={5} style={{width: '100%', height: '100vh'}}
         onClick={(e: any) => props.onPointAdded([e.latlng.lat, e.latlng.lng])}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.points.map((point: LatLng, index: number) =>
            <Marker key={point[0].toString() + point[1].toString()} position={point}
                    onClick={(e: any) => props.onPointRemoved([e.latlng.lat, e.latlng.lng])}>
                {index === 0 && <Tooltip direction='right' offset={[-8, -2]} opacity={1} permanent>Start</Tooltip>}
            </Marker>)}
        {props.route && <Polyline positions={props.route}/>}
        {props.bestRouteEver && <Polyline color='red' positions={props.bestRouteEver}/>}
    </Map>;

export default MyMap;

