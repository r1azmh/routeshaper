import L from "leaflet";

import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {createControlComponent} from "@react-leaflet/core";

const markerHtmlStyles = (color) => `
  background-color: ${color};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;


const markerIcon = (style) => L.divIcon({
    className: "my-custom-pin",
    iconAnchor: [0, 24],
    labelAnchor: [-6, 0],
    popupAnchor: [0, -36],
    html: `<span style="${style}" />`
});


const createRoutingMachineLayer = (props) => {
    console.log(props.positions)
    return L.Routing.control({
        waypoints: props?.positions?.map(([lat, lng]) => L.latLng(lat, lng)) || [],
        lineOptions: {
            styles: [{color: props.color || "#0004ff", weight: 4}]
        },
        show: true,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: 'smart',
        showAlternatives: false,
        createMarker: function (i, wp) {
            const markerStyle = markerHtmlStyles(props.color || '#583470');
            const icon = markerIcon(markerStyle);
            return L.marker(wp.latLng, {icon})
                .bindPopup(`vehicle ${props.vehicleId} <br> Lat : ${wp.latLng.lat} <br> Lng : ${wp.latLng.lng}`)
        }
    });
};


const RoutingMachine = createControlComponent(createRoutingMachineLayer);
export default RoutingMachine