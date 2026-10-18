import {
    Accordion,
    Button,
    Card,
    Kbd,
    Modal, ModalBody, ModalHeader,
    Spinner,
    Table,
    TableBody,
    TableCell, TableHead, TableHeadCell,
    TableRow,
    Tooltip
} from "flowbite-react";
import React, {useEffect, useState} from 'react';
import {ImLocation} from "react-icons/im";
import {TbTruckLoading} from "react-icons/tb";
import useDataFetch from "../hooks/useDataFetch";
import {getSolution} from "../managers/dashboardManager";
import {getCsv, getEmissionCsv} from "../managers/statisticsManager";
import BarChartTruck from "./BarChartTruck";
import BarChartTruckDetails from "./BarChartTruckDetails";
import ResultMap from "./ResultMap";
import {SolutionRoutingTable} from "./SolutionRoutingTable";
import {apiRoutes} from "./constants";
import {getTimeDifferenceInHours, humanizeDateTime} from "./functions";
import DefaultPagination from "./DefaultPagination";
import {apiGet} from "../managers/apiManager";


const Statistics = () => {
    const limit = 4
    const [offset, setOffset] = useState(0)
    const {data, refetch} = useDataFetch(apiRoutes.getWork({limit: limit, offset: offset}))
    const {data: lastSolution, refetch: lastSolutionRefetch, isLoading} = useDataFetch(apiRoutes.getLastSolution)

    const [openModal, setOpenModal] = useState(false)
    const [emissionModal, setEmissionModal] = useState(false)
    const [modalData, setModalData] = useState()
    const [emissionData, setEmission] = useState()
    const downloadCsv = async (data) => {
        if (data?.id) {
            await getCsv(data.id)
        }
    }
    const downloadEmissionCsv = async (data) => {
        if (data?.id) {
            await getEmissionCsv(data.id)
        }
    }

    const emissionReportModal = async (data) => {
        if (modalData?.id) {
            const _data = await apiGet(apiRoutes.getEmissionCsv(data.id))
            setEmission(_data.data)
            setOpenModal(false)
            setEmissionModal(true)
        }
    }
    useEffect(() => {
        if (lastSolution?.id) {
            setModalData(lastSolution)
        }
    }, [lastSolution])
    return (<>
        <ModalComponent openModal={openModal} setOpenModal={setOpenModal} jobs={modalData?.jobs}/>
        <EmissionModalComponent openModal={emissionModal} setOpenModal={setEmissionModal} data={emissionData}/>
        <div className="text-xl font-bold leading-none m-4 block">Work</div>
        <div className="grid grid-cols-4 gap-4 mt-4">

            {data?.results?.map((work) => <WorkCard key={work?.id} work={work} setModalData={setModalData}/>)}
        </div>
        <DefaultPagination setOffset={setOffset} limit={limit} total={data?.count}/>
        <div className="px-2.5">
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold leading-none p-4 inline-block">Last Generated Solution for <span
                    className="text-rose-600">{modalData?.work?.name} </span></span>
                {modalData && <div className="flex justify-end items-center gap-x-1">
                    <Button onClick={() => downloadCsv(modalData)} size="xs" color="light">Export Route
                        Planning</Button>
                    <Button onClick={() => downloadEmissionCsv(modalData)} size="xs" color="light">Export Emission
                        Estimation </Button>
                    <Button onClick={() => setOpenModal(true)} size="xs" color="blue">Check Freshness
                        Penalty</Button>
                    <Button onClick={() => emissionReportModal(modalData)} size="xs" color="blue">Emission
                        Estimation</Button>

                </div>}
            </div>

            {modalData ? <div>
                <div className="my-4">
                    <SolutionRoutingTable tours={modalData?.solution?.tours}/>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    <SolutionStatistics solution={modalData?.solution?.statistic}/>
                </div>
                <div className="text-xl font-bold text-rose-600 py-2">Solution Diagram</div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <BarChartTruck data={modalData?.solution}/>
                    </div>
                    <div>
                        <BarChartTruckDetails data={modalData?.solution}/>
                    </div>
                </div>
                <div className="h-screen">
                    {modalData?.solution?.tours?.length > 0 && <ResultMap tours={modalData?.solution?.tours}/>}
                </div>
            </div> : isLoading ?
                <div className="flex justify-center items-center"><Spinner aria-label="Default status example"/>
                </div> :
                <span className="text-xl font-bold leading-none text-rose-600 m-4">No solution available</span>}
        </div>
    </>);
};


export default Statistics;

const WorkCard = ({work, setModalData}) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = async () => {
        setIsLoading(true)
        const data = await getSolution(work?.id)
        setModalData(data)
        setIsLoading(false)
    }

    return (<Card className="max-w-sm">
        <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{work?.name}</h5>
        </div>
        <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Total Jobs</p>
                        </div>
                        <div
                            className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{work?.total_jobs}</div>
                    </div>
                </li>
                <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Total
                                Vehicle</p>
                        </div>
                        <div
                            className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {work?.total_vehicles}
                        </div>
                    </div>
                </li>
                <li className="pb-0 pt-3 sm:pt-4">
                    <Button disabled={!work?.total_jobs || !work?.total_vehicles} color="blue" onClick={handleClick}
                            isProcessing={isLoading}>Get Solution</Button>
                </li>
            </ul>
        </div>
    </Card>);
}


function ModalComponent({openModal, setOpenModal, jobs}) {
    const reducedFP = React.useMemo(() => {
        if (!Array.isArray(jobs)) {
            return {}
        }
        const stat = jobs?.reduce(
            (accumulator, currentValue) => {
                return {
                    totalP: (parseFloat(currentValue?.category?.penalty) || 0) + (accumulator?.totalP || 0),
                    totalFP: (parseFloat(currentValue?.f_penalty) || 0) + (accumulator?.totalFP || 0),
                    totalH: (parseFloat(getTimeDifferenceInHours(currentValue?.arrival_time, currentValue?.start_at)) || 0) + (accumulator?.totalH || 0)
                };
            },
            {totalFP: 0, totalP: 0, totalH: 0}
        );
        return stat
    }, [jobs])
    return (<Modal size={'7xl'} show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="text-rose-600">Freshness Penalty</ModalHeader>
        <ModalBody>
            <Table striped>
                <TableHead>
                    <TableHeadCell>Job Name</TableHeadCell>
                    <TableHeadCell>Category Name</TableHeadCell>
                    <TableHeadCell>Penalty per Hour</TableHeadCell>
                    <TableHeadCell>Start Time</TableHeadCell>
                    <TableHeadCell>Arrival Time</TableHeadCell>
                    <TableHeadCell>Total Time(Hour)</TableHeadCell>
                    <TableHeadCell>Freshness Penalty</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {jobs && Array.isArray(jobs) && jobs?.map((job, index) => <TableRow key={index}
                                                                                         className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {job?.name}
                        </TableCell>
                        <TableCell>{job?.category?.name}</TableCell>
                        <TableCell>{job?.category?.penalty?.toFixed(2)}</TableCell>
                        <TableCell>{humanizeDateTime(job?.start_at)}</TableCell>
                        <TableCell>{humanizeDateTime(job?.arrival_time)}</TableCell>
                        <TableCell>{getTimeDifferenceInHours(job?.arrival_time, job?.start_at)}</TableCell>
                        <TableCell>{job?.f_penalty?.toFixed(2)}</TableCell>
                    </TableRow>)}

                    <TableRow
                        className="bg-white border-t-black text-black font-bold">
                        <TableCell className="whitespace-nowrap font-bold text-black">
                            Total
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>{reducedFP?.totalH?.toFixed(2)}</TableCell>
                        <TableCell>{reducedFP?.totalFP?.toFixed(2)}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </ModalBody>
    </Modal>);
}


function EmissionModalComponent({openModal, setOpenModal, data}) {
    console.log(data);

    return (
        <Modal size={'7xl'} show={openModal} onClose={() => setOpenModal(false)}>
            <ModalHeader className="text-rose-600">Emission Estimation</ModalHeader>
            <ModalBody>
                <Table striped>
                    <TableHead>
                        <TableHeadCell>Vehicle Name</TableHeadCell>
                        <TableHeadCell>Job Name</TableHeadCell>
                        <TableHeadCell>Load</TableHeadCell>
                        <TableHeadCell>Distance (km)</TableHeadCell>
                        <TableHeadCell>Emission (kg)</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {data && Array.isArray(data?.records) && data?.records?.map((job, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                >
                                    {Object.entries(job)
                                        .map(([k, v], idx) => (
                                            <TableCell key={idx}>
                                                {(k === 'Distance' || k === 'Emission (kg)')
                                                    ? parseFloat(v).toFixed(2)
                                                    : v}
                                            </TableCell>
                                        ))}
                                </TableRow>
                            );
                        })}

                        <TableRow className="bg-white border-t-black text-black font-bold">
                            <TableCell className="whitespace-nowrap font-bold text-black">
                                Total
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>{data?.total_emission_kg?.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </ModalBody>
        </Modal>
    );
}


function SolutionStatistics({solution}) {
    const flattenObject = (obj, parentKey = "") => {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = parentKey ? `${key}` : key;
            if (typeof obj[key] === "object" && obj[key] !== null) {
                return {...acc, ...flattenObject(obj[key], newKey)};
            } else {
                return {...acc, [newKey]: obj[key]};
            }
        }, {});
    };

    const getFormattedValue = (key, value) => {
        const timeKeys = ['duration', 'driving', 'serving', 'waiting', 'commuting', 'parking'];
        const distanceKey = 'distance';

        if (key.toLowerCase() === distanceKey) {
            return {
                key: 'DISTANCE (KM)',
                value: (value / 1000).toFixed(2)
            };
        } else if (timeKeys.includes(key.toLowerCase())) {
            return {
                key: `${key.toUpperCase()} (HOUR)`,
                value: (value / 3600).toFixed(2)
            };
        } else {
            return {
                key: key.toUpperCase(),
                value: value && Number.isInteger(value) ? value : value?.toFixed(2)
            };
        }
    };

    return (
        <div>
            <p className="text-xl font-bold text-rose-600 py-2">Solution Statistics</p>
            <Table striped>
                <TableBody className="divide-y">
                    {solution && Object.entries(flattenObject(solution))?.map(([key, value], index) => {
                        const formatted = getFormattedValue(key, value);
                        return (
                            <TableRow key={index}
                                       className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {formatted.key}
                                </TableCell>
                                <TableCell>
                                    {formatted.value}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}


const customTheme = {
    "root": {
        "base": "divide-y divide-gray-200  dark:divide-gray-700", "flush": {
            "off": "rounded-lg border", "on": "border-b"
        }
    }, "content": {
        "base": "py-5 px-5 "
    }, "title": {
        "arrow": {
            "base": "h-6 w-6 shrink-0", "open": {
                "off": "", "on": "rotate-180"
            }
        },
        "base": "flex w-full items-center justify-between py-5 px-5 text-left font-medium text-gray-500 dark:text-gray-400",
        "flush": {
            "off": "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
            "on": "bg-transparent dark:bg-transparent"
        },
        "heading": "",
        "open": {
            "off": "", "on": "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white"
        }
    }
}

const DetailsSolution = ({data}) => {
    return (<Flowbite theme={{theme: customTheme}}>
        <Accordion>
            <Accordion.Panel>
                <Accordion.Title>Jobs</Accordion.Title>
                <Accordion.Content>
                    <div className="flex flex-wrap justify-start gap-2">
                        {data?.jobs && Array.isArray(data?.jobs) && data?.jobs?.map((job) => <Tooltip
                            content={<ToolTipDiv data={job}/>}>
                            <Kbd>{job?.name}</Kbd>
                        </Tooltip>)}

                    </div>
                </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
                <Accordion.Title>Vehicles</Accordion.Title>
                <Accordion.Content>
                    <div className="flex flex-wrap justify-between gap-2">
                        {data?.vehicles?.map((vehicle) => <Tooltip content={<ToolTipDiv data={vehicle}/>}>
                            <Kbd>{vehicle?.name}</Kbd>
                        </Tooltip>)}
                    </div>
                </Accordion.Content>
            </Accordion.Panel>

        </Accordion>
    </Flowbite>)
}


const ToolTipDiv = ({data}) => {
    return <div
        className="">
        <ul className="font-normal text-white">
            <li className="flex space-x-2 justify-start items-center hover:shadow"><TbTruckLoading
                className="text-rose-600"/><span>{data?.capacity ?? data?.demand}</span></li>
            <li className="flex space-x-2 justify-start items-center hover:shadow">
                <ImLocation className="text-rose-600"/>tart
                <div className="flex flex-col">
                    <span>{data?.lat}</span>
                    <span>{data?.lng}</span>
                </div>
            </li>
        </ul>
    </div>
}
