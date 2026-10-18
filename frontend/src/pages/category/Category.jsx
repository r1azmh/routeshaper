import {Button, Table, TableCell, TableBody, TableHead, TableHeadCell, TableRow} from 'flowbite-react';
import {IoIosAddCircleOutline} from "react-icons/io";
import {RiRefreshLine} from "react-icons/ri";
import React, {useEffect, useState} from "react";
import DeleteModal from "../../components/DeleteModal";
import {MdDelete, MdEditNote} from "react-icons/md";
import useDataFetch from "../../hooks/useDataFetch";
import {apiRoutes} from "../../components/constants";
import DefaultPagination from "../../components/DefaultPagination";
import CategoryModalForm from "./components/CategoryModalForm";
import {deleteCategory} from "../../managers/categorieManager";

export default function Category() {
    const limit = 10
    const [offset, setOffset] = useState(0)
    const {data, refetch} = useDataFetch(apiRoutes.getCategories({limit: limit, offset: offset}))

    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleEdit = (cate) => () => {
        setModalData(cate)
        setOpenModal(true)
    }
    const handleDelete = (id, name) => async () => {
        setModalData({id, name})
        setOpenDeleteModal(true)
        setOpenModal(false)
    }
    const handleDeleteCategory = () => (setOpenDeleteModal) => async () => {
        await deleteCategory(modalData?.id)
        refetch()
        setModalData(null)
        setOpenDeleteModal(false)
    }


    useEffect(() => {
        refetch()
    }, [openModal])
    return (<div className="overflow-x-auto min-h-screen">
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
                    <TableHeadCell>
                        <span className="">Actions</span>
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    {data?.results?.map((category) => <MakeTableRow
                        key={category?.id}
                        data={category}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />)}
                </TableBody>
            </Table>

        </div>
        <DefaultPagination setOffset={setOffset} limit={limit} total={data?.count}/>
        <CategoryModalForm setModalData={setModalData} openModal={openModal} setOpenModal={setOpenModal}
                           modalData={modalData}/>
        <DeleteModal openModal={openDeleteModal} id={modalData?.id} handleDelete={handleDeleteCategory}
                     setOpenModal={setOpenDeleteModal}/>

    </div>);
}

function MakeTableRow({data, handleEdit, handleDelete}) {
    return (<TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {data?.id}
        </TableCell>
        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {data?.name}
        </TableCell>
        <TableCell>{data?.total_jobs}</TableCell>
        <TableCell>
            <div className="flex flex-wrap gap-2">
                <Button onClick={handleEdit(data)} size='xs' className="flex justify-center items-center">
                    <span><MdEditNote className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Edit</span></Button>
                <Button onClick={handleDelete(data?.id, data?.name)} size='xs' color="failure"
                        className="flex justify-center items-center"> <MdDelete className="mr-2 h-5 w-5"/> <span
                    className='pl-2'>Delete</span></Button>
            </div>
        </TableCell>
    </TableRow>)
}

