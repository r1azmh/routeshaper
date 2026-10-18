import {
    Button,
    Label,
    Modal, ModalBody, ModalHeader,
    Pagination,
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    TextInput
} from 'flowbite-react';
import {IoIosAddCircleOutline} from "react-icons/io";
import {RiRefreshLine} from "react-icons/ri";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import DeleteModal from "./DeleteModal";
import {MdDelete, MdEditNote, MdWorkOutline} from "react-icons/md";
import {FaCaravan} from "react-icons/fa";
import {createWork, deleteWork, getWorks} from "../managers/workManager";

export default function Work() {
    const [works, setWorks] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [selectedData, setSelectedData] = useState();

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleEdit = (id, name) => () => {
        setModalData({id: id, name: name})
        setOpenModal(true)
    }
    const handleAddJob = (id) => () => {
    }
    const handleAddVehicle = (id) => () => {
    }
    const handleDelete = (id, name) => async () => {
        setSelectedData({id, name})
        setOpenDeleteModal(true)
        //
    }
    const handleDeleteWork = () => (setOpenDeleteModal) => async () => {
        setOpenDeleteModal(false)
        await deleteWork(selectedData?.id)
        setSelectedData(undefined)
    }


    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getWorks()
            setWorks(response)
        }

        fetchMyAPI()
    }, [selectedData, openModal])
    return (
        <div className="overflow-x-auto min-h-screen flex flex-col justify-between">
            <div>

                <div className="p-2 w-full flex justify-between items-center">
                    <Button onClick={() => setSelectedData(Math.random())} size="xs"
                            className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                        <RiRefreshLine/> <span className="">Refresh</span></Button>
                    <Button onClick={handleOpenModal} size="xs" color="green" className=" flex gap-x-2 items-center">
                        <IoIosAddCircleOutline/> <span
                        className="">Add New</span></Button>
                </div>

                <Table striped>
                    <TableHead>
                        <TableHeadCell>Name</TableHeadCell>
                        <TableHeadCell>Total Job</TableHeadCell>
                        <TableHeadCell>Total Vehicles</TableHeadCell>
                        <TableHeadCell>
                            <span className="">Actions</span>
                        </TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                        {
                            works?.map((work) => <MakeTableRow
                                key={work?.id}
                                tJob={work?.total_jobs}
                                tVehicle={work?.total_vehicles}
                                name={work?.name}
                                id={work?.id}
                                handleAddVehicle={handleAddVehicle}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                handleAddJob={handleAddJob}
                            />)
                        }
                    </TableBody>
                </Table>

            </div>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                    layout="pagination"
                    currentPage={12}
                    totalPages={1000}
                    onPageChange={() => {
                    }}
                    previousLabel="Go back"
                    nextLabel="Go forward"
                    showIcons
                />
            </div>
            <ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteWork}
                         setOpenModal={setOpenDeleteModal}/>

        </div>
    );
}

function MakeTableRow({name, tJob, tVehicle, id, handleEdit, handleAddJob, handleAddVehicle, handleDelete}) {
    return (
        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {name}
            </TableCell>
            <TableCell>{tJob}</TableCell>
            <TableCell>{tVehicle}</TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(id, name)} size='xs' className="flex justify-center items-center">
                        <span><MdEditNote className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Edit</span></Button>
                    <Button onClick={handleAddJob(id)} size='xs' color="blue"
                            className="flex justify-center items-center"> <MdWorkOutline className="mr-2 h-5 w-5"/>
                        <span className='pl-2'>Add Job</span></Button>
                    <Button onClick={handleAddVehicle(id)} size='xs' color="blue"
                            className="flex justify-center items-center"> <FaCaravan className="mr-2 h-5 w-5"/> <span
                        className='pl-2'>Add Vehicle</span></Button>
                    <Button onClick={handleDelete(id, name)} size='xs' color="failure"
                            className="flex justify-center items-center"> <MdDelete className="mr-2 h-5 w-5"/> <span
                        className='pl-2'>Delete</span></Button>
                </div>
            </TableCell>
        </TableRow>
    )
}


function ModalComponent({openModal, setOpenModal, modalData}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        await createWork(data)
        setOpenModal(false)
    }
    return (
        <><Modal show={openModal} onClose={() => setOpenModal(false)}>
            <ModalHeader>Add New Work</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Work Name"/>
                    </div>
                    <TextInput defaultValue={modalData && modalData?.name} {...register('name', {
                        required: true,
                        maxLength: 20
                    })} id="name" type="text" placeholder="New Work" required/>
                    {errors.name?.type === 'maxLength' &&
                        <span className='text-red-600'>Name cannot exceed 20 characters.</span>}
                    {errors.name?.type === 'required' && <span className='text-red-600'>This field is required</span>}

                    <Button className="mt-4" type="submit">Submit</Button>
                </form>
            </ModalBody>
        </Modal>
        </>
    );
}
