import React, {useState, useMemo} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import tileLayer from './tileLayer';
import {colorPalette} from './constants';
import RoutingMachine from './RouteMachine';

const tColor = (color) => `ms-3 text-sm font-medium text-[${color}] dark:text-gray-300`
const ResultMap = ({tours}) => {
    const [map, setMap] = useState(null);
    const [selectedTours, setSelectedTours] = useState([]);

    const handleCheckboxChange = (vehicleId) => {
        setSelectedTours((prevSelectedTours) =>
            prevSelectedTours.includes(vehicleId)
                ? prevSelectedTours.filter((id) => id !== vehicleId)
                : [...prevSelectedTours, vehicleId]
        );
    };

    const center = useMemo(() => {
        let point = [];
        tours?.some((tour) => {
            if (tour?.stops?.length > 0) {
                point = [tour.stops[0]?.location?.lat, tour.stops[0]?.location?.lng];
                return true;
            }
            return false;
        });
        return point;
    }, [tours]);

    const points = useMemo(() => {
        return tours?.map((tour) => ({
            stops: tour.stops?.map((stop) => [stop.location?.lat, stop.location?.lng]),
            vehicleId: tour.vehicleId,
        })) || [];
    }, [tours]);

    return (
        <div className="flex flex-col" style={{width: '100%', height: '100%'}}>

            <h3 className="my-2 mt-4">Select Vehicles</h3>
            <div className="grid grid-cols-3">
                {points.map((pt, index) => (
                    <div key={pt.vehicleId}>

                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                checked={selectedTours.includes(pt.vehicleId)}
                                onChange={() => handleCheckboxChange(pt.vehicleId)}
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                            />
                            <div
                                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                                style={{
                                    backgroundColor: selectedTours.includes(pt.vehicleId)
                                        ? colorPalette[(index + 1) % 5]
                                        : 'gray',
                                }} // Dynamically setting the background color
                            ></div>
                            <span
                                className="ms-3 text-sm font-medium"
                                style={{color: colorPalette[(index + 1) % 5]}} // Dynamically setting text color
                            >
    Vehicle {pt.vehicleId}
  </span>
                        </label>
                    </div>
                ))}
            </div>

            {/* Map container */}
            <div style={{width: '100%', height: '100%'}}>
                <MapContainer
                    whenCreated={setMap}
                    style={{width: '100%', height: '90%'}}
                    center={center}
                    zoom={13}
                    scrollWheelZoom={true}
                >
                    <TileLayer {...tileLayer} />
                    {points.map(
                        (pt, index) =>
                            selectedTours.includes(pt.vehicleId) && (
                                <RoutingMachine
                                    key={pt.vehicleId}
                                    color={colorPalette[(index + 1) % 5]}
                                    vehicleId={pt.vehicleId}
                                    positions={pt.stops}
                                    map={map}
                                />
                            )
                    )}
                </MapContainer>
            </div>
        </div>
    );
};

export default ResultMap;