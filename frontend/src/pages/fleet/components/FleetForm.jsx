import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'flowbite-react';
import React from 'react';
import FleetFormDefinition from './FleetFormDefinition';
import FleetDefinition from './FleetDefinition';
import { createMultiVehicle, updateVehicle } from '@/managers/fleetManager.jsx';


const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function FleetForm({ setOpenModal, data: fleet }) {
  const methods = useForm({
    defaultValues: {
      work: { value: fleet?.work_id, label: fleet?.work?.name },
      vehicles: [
        {
          name: fleet?.name,
          lat: fleet?.lat,
          lng: fleet?.lng,
          capacity: fleet?.capacity,
          start_at: fleet?.start_at ? formatDate(new Date(fleet.start_at)) : '',
          end_at: fleet?.end_at ? formatDate(new Date(fleet.end_at)) : '',
          profile: { value: fleet?.profile?.id, label: fleet?.profile?.name },
        },
      ],
    },
  });
  const onSubmit = async (data) => {
    const vehicles = [];
    for (let vehicle of data?.vehicles) {
      let v_data = {};
      v_data.name = vehicle?.name;
      v_data.lat = vehicle?.lat;
      v_data.lng = vehicle?.lng;
      v_data.start_at = new Date(vehicle.start_at).toISOString();
      v_data.end_at = new Date(vehicle.end_at).toISOString();
      v_data.capacity = vehicle?.capacity;
      v_data.profile_id = vehicle?.profile?.value;
      v_data.work_id = data?.work?.value;
      vehicles.push(v_data);
    }
    if (fleet?.id) {
      for (let vehicle of vehicles) {
        await updateVehicle(fleet?.id, vehicle);
      }
      setOpenModal(false);
      return;
    }

    await createMultiVehicle(vehicles).then((e) => setOpenModal(false));
    methods.reset();


  };
  return (
    <FormProvider {...methods} lat={fleet?.lat} lng={fleet?.lng}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-x-2">
        <div className="col-span-1">
          <FleetDefinition />
          <Button size="xs" className="mt-4" type="submit">Submit</Button>
        </div>
        <div className="col-span-2">
          <FleetFormDefinition isEdit={!!fleet} />
        </div>
      </form>
    </FormProvider>
  );

}

export default FleetForm;

