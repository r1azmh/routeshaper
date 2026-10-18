'use client';

import {Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import {humanizeDateTime} from './functions';

export function SolutionRoutingTable(props) {
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <TableHead>
                    <TableHeadCell>VEHICLE Name</TableHeadCell>
                    <TableHeadCell>TYPE</TableHeadCell>
                    <TableHeadCell>JOB Name</TableHeadCell>
                    <TableHeadCell>LOCATION</TableHeadCell>
                    <TableHeadCell>ARRIVAL(Time)</TableHeadCell>
                    <TableHeadCell>DEPARTURE(Time)</TableHeadCell>
                    <TableHeadCell>LOAD</TableHeadCell>
                    <TableHeadCell>DISTANCE (KM)</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        props?.tours?.map((tour, index) => <Tour key={index} tour={tour} colorIndex={index}/>)
                    }
                </TableBody>
            </Table>
        </div>
    );
}

const COLOR = ["#ffffff", "#edf2f4"]

function Tour(props) {
    const randomColor = COLOR[props?.colorIndex % 2]
    return (
        props?.tour?.stops?.map((stop) => stop?.activities?.map((act) => <TableRow
                style={{backgroundColor: randomColor}} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium dark:text-white">
                    {props?.tour?.vehicleId}
                </TableCell>
                <TableCell>{act?.type}</TableCell>
                <TableCell>{act?.jobId}</TableCell>
                <TableCell>{stop?.location?.lat?.toFixed(2)}</TableCell>
                <TableCell>{humanizeDateTime(act?.time?.start ?? stop?.time?.arrival)}</TableCell>
                <TableCell>{humanizeDateTime(act?.time?.end ?? stop?.time?.departure)}</TableCell>
                <TableCell>{stop?.load?.[0]}</TableCell>
                <TableCell>{(stop?.distance / 1000)?.toFixed(2)}</TableCell>
            </TableRow>)
        )
    )
}
