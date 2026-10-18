import {
  Button,
  Label,
  Modal,
  Table,
  TextInput,
  Select,
  TableRow,
  TableCell,
  TableHeadCell,
  TableHead, TableBody, ModalHeader, ModalBody
} from 'flowbite-react';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete, MdEditNote } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import DefaultPagination from '../../components/DefaultPagination';
import DeleteModal from "../../components/DeleteModal";
import { apiRoutes } from '../../components/constants';
import useDataFetch from '../../hooks/useDataFetch';
import { createVehicleProfile, deleteVehicleProfile, updateVehicleProfile } from "../../managers/profileManage";

const TRUCK_TYPES = [
  { value: 'rigid_3_5_7_5', label: 'Rigid (>3.5–7.5 t)' },
  { value: 'rigid_7_5_17',   label: 'Rigid (>7.5–17 t)' },
  { value: 'rigid_17_plus',  label: 'Rigid (>17 t)' },
  { value: 'artic_3_5_33',   label: 'Articulated (>3.5–33 t)' },
  { value: 'artic_33_plus',  label: 'Articulated (>33 t)' },
];

const TEMPERATURES = [
  { value: 'ambient',      label: 'Ambient' },
  { value: 'refrigerated', label: 'Refrigerated' },
];

export default function VehicleProfile() {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const {data, refetch} = useDataFetch(apiRoutes.getVehicleProfiles({limit, offset}));
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [selectedData, setSelectedData] = useState();

  const handleOpenModal = () => setOpenModal(true);
  const handleEdit = (data) => () => { setModalData(data); setOpenModal(true); };
  const handleDelete = (id, name) => async () => { setSelectedData({id, name}); setOpenDeleteModal(true); };
  const handleDeleteWork = () => (setOpenDeleteModal) => async () => {
    setOpenDeleteModal(false);
    await deleteVehicleProfile(selectedData?.id);
    setSelectedData(undefined);
    refetch();
  };

  useEffect(() => { refetch(); }, [openModal]);

  return (
    <div className="overflow-x-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="p-2 w-full flex justify-between items-center">
          <Button onClick={() => refetch()} size="xs" className='bg-white text-black hover:text-white flex gap-x-2 items-center'>
            <RiRefreshLine/> <span>Refresh</span>
          </Button>
          <Button onClick={handleOpenModal} size="xs" color="green" className="flex gap-x-2 items-center">
            <IoIosAddCircleOutline/> <span>Add New</span>
          </Button>
        </div>

        <Table striped>
          <TableHead>
            <TableHeadCell>Id</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Total Vehicles</TableHeadCell>
            <TableHeadCell>Fixed Cost</TableHeadCell>
            <TableHeadCell>Cost Per Meter</TableHeadCell>
            <TableHeadCell>Cost Per Second</TableHeadCell>
            <TableHeadCell>Truck Type</TableHeadCell>
            <TableHeadCell>Temperature</TableHeadCell>
            <TableHeadCell><span>Actions</span></TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data?.results?.map((profile) => (
              <MakeTableRow
                data={profile}
                key={profile?.id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <DefaultPagination setOffset={setOffset} limit={limit} total={data?.count}/>
      <ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} setModalData={setModalData}/>
      <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteWork} setOpenModal={setOpenDeleteModal}/>
    </div>
  );
}

function MakeTableRow({name, data, handleEdit, handleDelete}) {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {data?.id}
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {data?.name}
      </TableCell>
      <TableCell>{data?.total_vehicles}</TableCell>
      <TableCell>{data?.fixed_cost}</TableCell>
      <TableCell>{data?.distance}</TableCell>
      <TableCell>{data?.time}</TableCell>
      <TableCell>{data?.truck_type_display ?? data?.truck_type}</TableCell>
      <TableCell>{data?.temperature_display ?? data?.temperature}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleEdit(data)} size='xs' className="flex justify-center items-center">
            <span><MdEditNote className="mr-2 h-5 w-5"/></span><span className='pl-2'>Edit</span>
          </Button>
          <Button onClick={handleDelete(data?.id, data?.name)} size='xs' color="failure" className="flex justify-center items-center">
            <MdDelete className="mr-2 h-5 w-5"/><span className='pl-2'>Delete</span>
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function ModalComponent({openModal, setOpenModal, modalData, setModalData}) {
  const { register, reset, handleSubmit, formState: {errors} } = useForm({
    defaultValues:{
      name: modalData?.name,
      fixed_cost: modalData?.fixed_cost,
      distance: modalData?.distance,
      time: modalData?.time,
      truck_type: modalData?.truck_type ?? 'rigid_7_5_17',
      temperature: modalData?.temperature ?? 'ambient',
      max_capacity: modalData?.max_capacity ?? 1,
    }
  });

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      fixed_cost: Number(data.fixed_cost),
      distance: Number(data.distance),
      time: Number(data.time),
      max_capacity: Number(data.max_capacity),
    };

    if (modalData?.id){
      await updateVehicleProfile(modalData?.id, payload);
      setModalData(null);
    } else {
      await createVehicleProfile(payload);
    }
    setModalData(null)
    setOpenModal(false);
    reset()
  };

  React.useEffect(() => {
    reset({
      name: modalData?.name,
      fixed_cost: modalData?.fixed_cost,
      distance: modalData?.distance,
      time: modalData?.time,
      truck_type: modalData?.truck_type ?? 'rigid_7_5_17',
      temperature: modalData?.temperature ?? 'ambient',
      max_capacity: modalData?.max_capacity ?? 1, // FIXED
    });
  }, [reset, modalData]);

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>{modalData ? `${modalData?.name} Edit` : "Add New Profile"}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Profile Name">Profile Name</Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="New Vehicle Profile"
                {...register('name', { required: true, maxLength: 20 })}
                required
              />
              {errors.name?.type === 'maxLength' && (
                <span className='text-red-600'>Name cannot exceed 20 characters.</span>
              )}
              {errors.name?.type === 'required' && (
                <span className='text-red-600'>This field is required</span>
              )}
            </div>

            {/* 3-col grid */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {/* Fixed Cost */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fixed_cost" value="Fixed Cost">Fixed Cost</Label>
                </div>
                <TextInput
                  id="fixed_cost"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  placeholder="100"
                  {...register('fixed_cost', { required: true })}
                  required
                />
                {errors?.fixed_cost && <span className='text-red-600'>Fix this field</span>}
              </div>

              {/* Cost Per Meter */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="distance" value="Cost Per Meter">Cost Per Meter</Label>
                </div>
                <TextInput
                  id="distance"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  placeholder="200.0"
                  {...register('distance', { required: true })}
                  required
                />
                {errors?.distance && <span className='text-red-600'>Fix this field</span>}
              </div>

              {/* Cost Per Second */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="time" value="Cost Per Second">Cost Per Second</Label>
                </div>
                <TextInput
                  id="time"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  pattern="[0-9]*[.,]?[0-9]*"
                  placeholder="12.0"
                  {...register('time', { required: true })}
                  required
                />
                {errors?.time && <span className='text-red-600'>Fix this field</span>}
              </div>

              {/* Truck Type */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="truck_type" value="Truck Type">Truck Type</Label>
                </div>
                <Select id="truck_type" {...register('truck_type', { required: true })} required>
                  {TRUCK_TYPES.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
                {errors?.truck_type && <span className='text-red-600'>Fix this field</span>}
              </div>

              {/* Temperature */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="temperature" value="Temperature">Temperature</Label>
                </div>
                <Select id="temperature" {...register('temperature', { required: true })} required>
                  {TEMPERATURES.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Select>
                {errors?.temperature && <span className='text-red-600'>Fix this field</span>}
              </div>

              {/* Max Capacity */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="max_capacity" value="Max Capacity (Containers)">Max Capacity (Containers)</Label>
                </div>
                <TextInput
                  id="max_capacity"
                  type="number"
                  min="1"
                  placeholder="e.g., 20"
                  {...register('max_capacity', { required: true, min: 1 })}
                  required
                />
                {errors?.max_capacity && <span className='text-red-600'>Enter ≥ 1</span>}
              </div>
            </div>

            <Button className="mt-4" type="submit">Submit</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
