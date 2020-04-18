import React from 'react';
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props: { locations?: any[], lines?: any[] }) =>
    <GoogleMap
        defaultZoom={6}
        defaultCenter={{lat: 37.360699, lng: -96.769850}}
    >
    </GoogleMap>
));

export default Map;
