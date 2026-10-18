import {useForm} from "react-hook-form";
import {
    Button,
    Card,
    Label,
    Modal, ModalBody, ModalHeader,
    Select,
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeadCell, TableRow,
    TextInput
} from "flowbite-react";
import React, {useMemo, useState} from "react";
import {IoIosAddCircleOutline} from "react-icons/io";
import {CiCircleMinus} from "react-icons/ci";
import {RiRefreshLine} from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import marker from "./marker.svg"
import {OpenStreetMapProvider} from "leaflet-geosearch";
import SearchComponent from "./SearchComponent";

const customTheme = {
    minusButton: "group bg-red-300 text-red-600  m-3 hover:bg-red-600 hover:text-white flex items-stretch rounded-full text-xl text-red-500 items-center justify-center text-center font-medium absolute top-0 right-5",
    addButton: "bg-green-300 hover:bg-green-600 text-green-600 hover:text-white p-2 rounded"
};


export default function Job() {
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
    const handleDelete = (id, name) => () => {
        setSelectedData({id, name})
        setOpenDeleteModal(true)
    }
    const handleDeleteWork = () => (setOpenDeleteModal) => () => {
        setOpenDeleteModal(false)
    }
    return (
        <div className="overflow-x-auto min-h-screen">
            <div className="p-2 w-full flex justify-between items-center">
                <Button size="xs" className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                    <RiRefreshLine/> <span className="">Refresh</span></Button>
                <Button onClick={handleOpenModal} size="xs" color="green" className=" flex gap-x-2 items-center">
                    <IoIosAddCircleOutline/> <span
                    className="">Add New</span></Button>
            </div>
            <Table striped>
                <TableHead>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Latitude</TableHeadCell>
                    <TableHeadCell>Longitude</TableHeadCell>
                    <TableHeadCell>
                        <span className="">Actions</span>
                    </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                    <MakeTableRow
                        tJob={12}
                        tVehicle={13}
                        name={'apple'}
                        id={1}
                        handleAddVehicle={handleAddVehicle}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleAddJob={handleAddJob}
                    />
                </TableBody>
            </Table>

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
                    <Button onClick={handleEdit(id, name)} size='xs'>Edit</Button>
                    <Button onClick={handleAddJob(id)} size='xs' color="blue">Add Job</Button>
                    <Button onClick={handleAddVehicle(id)} size='xs' color="blue">Add Vehicle</Button>
                    <Button onClick={handleDelete(id, name)} size='xs' color="failure">Delete</Button>
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
    const onSubmit = (data) => {
        console.log(data)
        setOpenModal(false)
    }
    return (
        <><Modal size='5xl' show={openModal} onClose={() => setOpenModal(false)}>
            <ModalHeader>Add New Job</ModalHeader>
            <ModalBody>
                <JobForm/>
            </ModalBody>
        </Modal>
        </>
    );
}

function JobForm() {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: {errors},
    } = useForm()

    const onSubmit = (data) => console.log(data)
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-x-2">
            <div className='col-span-1'>
                <JobDefinition register={register} watch={watch} getValues={getValues} setValue={setValue}/>
                <button type="submit">submit</button>
            </div>
            <div className="col-span-2">
                <Jobs errors={errors} register={register} watch={watch} getValues={getValues} setValue={setValue}/>
            </div>

        </form>
    )

}

function JobDefinition({register, watch, getValues, setValue}) {
    return (
        <>
            <Card className="max-w-sm">
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Job Name"/>
                        </div>
                        <TextInput {...register("name", {required: true})} id="name" type="text"
                                   placeholder="pickup job-1" required/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="type" value="Job Type"/>
                        </div>
                        <Select {...register("job_type", {required: true})} id="type" required>
                            <option value='pp'>Pick-up</option>
                            <option value='dd'>Delivery</option>
                            <option value='mm'>Multi</option>
                        </Select>
                    </div>
                </div>
            </Card>
        </>
    )
}

function Jobs({register, watch, getValues, setValue, errors}) {
    const newJob = {lng: '', lat: '', startTime: '', endTime: ''}
    const isMulti = useMemo(() => {
        return getValues('job_type') === 'mm';
    }, [watch('job_type')])

    const MultiField = useMemo(() => {
        return getValues('jobs')

    }, [watch('jobs')])

    const handleAddJob = () => {
        const jobs = getValues('jobs')
        setValue('jobs', [...jobs, newJob])
    }
    const handleRemove = (index) => () => {
        if (index !== 0) {
            const jobs = getValues('jobs')
            jobs.splice(index, 1)
            setValue('jobs', jobs)
        }
    }

    useMemo(() => {
        setValue('jobs', [newJob])
    }, [watch('job_type')])
    return (
        <>
            {MultiField?.map((element, index) => <JobCard register={register} key={index} index={index}
                                                          handleRemove={handleRemove}
                                                          setValue={setValue}
                                                          isMulti={isMulti}/>)}
            {
                isMulti && <div className="flex justify-center items-center my-4">
                    <button className={customTheme.addButton} onClick={handleAddJob}>
                        <IoIosAddCircleOutline className="h-6 w-6"/>
                    </button>
                </div>
            }
        </>
    )
}


function JobCard({register, getValues, setValue, isMulti, handleRemove, index}) {
    const setLatLang = (value)=>{
        // console.log(value)
        setValue(`jobs.${index}.lat`, value?.Latitude)
        setValue(`jobs.${index}.lng`, value?.Longitude)
    }
    return (
        <>
            <Card className="relative mb-4">
                {
                    isMulti &&
                    <button className={customTheme.minusButton} onClick={handleRemove(index)}
                    >
                        <CiCircleMinus/>
                    </button>
                }
                {/*<SimpleMap />*/}
                <form className="flex flex-col gap-4">
                    {
                        isMulti && <div>
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Job Type"/>
                            </div>
                            <Select {...register(`jobs.${index}.select_job`)} id="type" required>
                                <option value='pp'>Pick-up</option>
                                <option value='dd'>Delivery</option>
                            </Select>
                        </div>
                    }
                    <div>
                        <div>
                            <SearchComponent setValue={setLatLang}/>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    )
}
