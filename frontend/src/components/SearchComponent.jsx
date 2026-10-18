import React, {useEffect} from 'react';
import {MapContainer, TileLayer, useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import markerUrl from "./marker.svg"

const iconLocation = new L.Icon({
    iconUrl: markerUrl, iconRetinaUrl: markerUrl, iconSize: new L.Point(30, 50), className: 'marker'
});

const CustomMarker = ({setValue, position}) => {
    const map = useMap();
    const marker = L.marker(position, {
        icon: iconLocation, draggable: false, autoPan: false,
    });

    marker.on('dragend', function (e) {
        updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
    });


    const onClick = React.useCallback((e) => {
        marker.setLatLng(e.latlng);
        updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);

    }, []);

    map.on('click', onClick);

    function updateLatLng(lat, lng) {
        setValue({Latitude: lat, Longitude: lng});

    }

    useEffect(() => {
        marker.addTo(map)
        const searchControl = new GeoSearchControl({
            style: 'bar', provider: new OpenStreetMapProvider(), showMarker: false, // Let the custom marker handle it
        });

        map.addControl(searchControl);
        return () => map.removeControl(searchControl)
    }, []);

    return null;
};

const SearchComponent = ({setValue, position}) => {
    const mapPos = position?.lat && position?.lng ? [position?.lat, position?.lng] : [63.10508032122929, 21.593328797360254]
    return (<MapContainer
            center={mapPos}
            zoom={12}
            style={{height: '300px', width: '100%'}}
        >
            <TileLayer
                url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
            />
            <CustomMarker setValue={setValue} position={mapPos}/>
        </MapContainer>);
};

export default SearchComponent;
