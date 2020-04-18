import React from 'react';
import {LatLng} from "../types/lat-lng";
import {Map, TileLayer, Marker, Polyline} from 'react-leaflet';

const MyMap = (props: {
    points: LatLng[],
    lines: LatLng[][],
    onPointAdded: (point: LatLng) => any,
    onPointRemoved: (point: LatLng) => any
}) =>
    <Map center={[37.360699, -96.769850]} zoom={5} style={{width: '100%', height: '100vh'}}
         onClick={(e: any) => props.onPointAdded([e.latlng.lat, e.latlng.lng])}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.points.map(point => <Marker key={point[0].toString() + point[1].toString()} position={point}
                                           onClick={(e: any) => props.onPointRemoved([e.latlng.lat, e.latlng.lng])}/>)}
        {props.lines.map(line => <Polyline positions={line} />)}
    </Map>;

export default MyMap;

