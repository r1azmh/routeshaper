import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete, MdEditNote } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import DefaultPagination from "../../components/DefaultPagination";
import DeleteModal from "../../components/DeleteModal";
import { apiRoutes } from "../../components/constants";
import useDataFetch from "../../hooks/useDataFetch";
import { deleteWork } from "../../managers/workManager";
import WorkModalForm from "./components/WorkModalForm";

export default function Work() {
    const limit = 10
    const [offset, setOffset] = useState(0)
    const {data, refetch} = useDataFetch(apiRoutes.getWork({limit: limit, offset: offset}))

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleEdit = (id, name) => () => {
        setModalData({id, name})
        setOpenModal(true)
    }
    const handleDelete = (id, name) => async () => {
        setModalData({id, name})
        setOpenDeleteModal(true)
        setOpenModal(false)
        //
    }
    const handleDeleteWork = () => (setOpenDeleteModal) => async () => {
        await deleteWork(modalData?.id)
        refetch()
        setModalData(null)
        setOpenDeleteModal(false)
    }


    useEffect(() => {
        refetch()
    }, [openModal])
    return (
        <div className="overflow-x-auto min-h-screen">
            <div className="h-[90vh]">

                <div className="p-2 w-full flex justify-between items-center">
                    <Button onClick={() => refetch()} size="xs"
                            className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                        <RiRefreshLine/> <span className="">Refresh</span></Button>
                    <Button onClick={handleOpenModal} size="xs" color="green" className=" flex gap-x-2 items-center">
                        <IoIosAddCircleOutline/> <span
                        className="">Add New</span></Button>
                </div>

                <Table striped>
                    <TableHead>
                        <TableHeadCell>ID</TableHeadCell>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Total Job</TableHeadCell>
                        <TableHeadCell>Total Vehicles</TableHeadCell>
                        <TableHeadCell>
                            <span className="">Actions</span>
                        </TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {
                            data?.results?.map((work) => <MakeTableRow
                                key={work?.id}
                                tJob={work?.total_jobs}
                                tVehicle={work?.total_vehicles}
                                name={work?.name}
                                id={work?.id}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />)
                        }
                    </TableBody>
                </Table>

            </div>
            <DefaultPagination setOffset={setOffset} limit={limit} total={data?.count}/>
            <WorkModalForm setModalData={setModalData} openModal={openModal} setOpenModal={setOpenModal}
                           modalData={modalData}/>
            <DeleteModal openModal={openDeleteModal} id={modalData?.id} handleDelete={handleDeleteWork}
                         setOpenModal={setOpenDeleteModal}/>

        </div>
    );
}

function MakeTableRow({name, tJob, tVehicle, id, handleEdit, handleDelete}) {
    return (
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {id}
        </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {name}
            </TableCell>
            <TableCell>{tJob}</TableCell>
            <TableCell>{tVehicle}</TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(id, name)} size='xs' className="flex justify-center items-center">
                        <span><MdEditNote className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Edit</span></Button>
                    <Button onClick={handleDelete(id, name)} size='xs' color="failure"
                            className="flex justify-center items-center"> <MdDelete className="mr-2 h-5 w-5"/> <span
                        className='pl-2'>Delete</span></Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

