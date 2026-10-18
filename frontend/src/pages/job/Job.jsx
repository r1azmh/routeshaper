import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from "flowbite-react";
import React, {useEffect, useState} from "react";
import {IoIosAddCircleOutline} from "react-icons/io";
import {RiRefreshLine} from "react-icons/ri";
import DeleteModal from "../../components/DeleteModal";
import "leaflet/dist/leaflet.css";
import {deleteJob} from "../../managers/jobManage";
import JobModal from "./components/JobModal";
import BulkInsertModal from "./components/BulkInsertModal";
import DefaultPagination from "../../components/DefaultPagination";
import useDataFetch from "../../hooks/useDataFetch";
import {apiRoutes} from "../../components/constants";
import {MdDelete, MdEditNote} from "react-icons/md";


export default function Job() {
    const limit = 10
    const [offset, setOffset] = useState(0)
    const {data, refetch} = useDataFetch(apiRoutes.getJobs({limit: limit, offset: offset}))
    const [openModal, setOpenModal] = useState(false);
    const [openBulkModal, setOpenBulkModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [selectedData, setSelectedData] = useState();
    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleOpenBulkModal = () => {
        setOpenBulkModal(true)
    }
    const handleEdit = (job) => () => {
        setModalData(job)
        setOpenModal(true)
    }
    const handleAddJob = (id, name) => () => {
    }
    const handleAddVehicle = (id) => () => {
    }
    const handleDelete = (id, name) => () => {
        setSelectedData({id, name})
        setOpenDeleteModal(true)

    }
    const handleDeleteJob = (id) => (setOpenDeleteModal) => async () => {
        await deleteJob(id).then(() => {
            setOpenDeleteModal(false)
        })
    }

    useEffect(() => {
        refetch()
    }, [selectedData, openModal, openDeleteModal])
    return (
        <div className="overflow-x-auto max-h-screen">
            <div className="p-2 w-full flex justify-between items-center">
                <Button onClick={() => setSelectedData({})} size="xs"
                        className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                    <RiRefreshLine/> <span className="">Refresh</span></Button>
                <div className="flex justify-end items-center gap-x-2">
                    <Button onClick={handleOpenModal} size="xs" color="green" className=" flex gap-x-2 items-center">
                        <IoIosAddCircleOutline/> <span
                        className="">Add New</span></Button>
                    <Button onClick={handleOpenBulkModal} size="xs" color="blue" className=" flex gap-x-2 items-center">
                        <IoIosAddCircleOutline/> <span
                        className="">Bulk Create</span></Button>
                </div>
            </div>
            <Table striped className="">
                <TableHead>
                    <TableHeadCell>No.</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Latitude</TableHeadCell>
                    <TableHeadCell>Longitude</TableHeadCell>
                    <TableHeadCell>
                        <span className="">Actions</span>
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {
                        data?.results?.map((job, index) => <JobTableRow
                            key={job?.id}
                            job={job}
                            index={offset + index + 1}
                            handleAddVehicle={handleAddVehicle}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleAddJob={handleAddJob}
                        />)
                    }
                </TableBody>
            </Table>
            <DefaultPagination setOffset={setOffset} limit={limit} total={data?.count}/>
            <JobModal openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}
                      setModalData={setModalData}/>
            <BulkInsertModal refetch={refetch} openModal={openBulkModal} setOpenModal={setOpenBulkModal}/>
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteJob}
                         setOpenModal={setOpenDeleteModal}/>
        </div>
    );
}

function JobTableRow({job, index, handleEdit, handleDelete}) {
    return (
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index}
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {job?.name ?? job?.multi?.name + "(multi-job)"}
            </TableCell>
            <TableCell>{job?.lat}</TableCell>
            <TableCell>{job?.lng}</TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(job)} size='xs'><span><MdEditNote className="mr-2 h-5 w-5"/> </span>
                        <span className='pl-2'>Edit</span></Button>
                    <Button onClick={handleDelete(job.id, job?.name ?? job?.multi?.name + "(multi-job)")} size='xs'
                            color="failure"><span><MdDelete className="mr-2 h-5 w-5"/> </span> <span
                        className='pl-2'>Delete</span></Button>
                </div>
            </TableCell>
        </TableRow>
    )
}
