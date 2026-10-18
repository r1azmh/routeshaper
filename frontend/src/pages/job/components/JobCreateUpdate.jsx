import { Card, Label, Select, TextInput } from 'flowbite-react';
import SearchWork from './SearchWork';
import React, { useMemo } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiCircleMinus } from 'react-icons/ci';
import { BiTargetLock } from 'react-icons/bi';
import SearchComponent from '../../../components/SearchComponent';
import { useFormContext } from 'react-hook-form';

export function JobDefinition() {
  const { register } = useFormContext();
  return (
    <>
      <Card className="max-w-sm">
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Job Name">Job Name</Label>
            </div>
            <TextInput {...register('name', { required: true })} id="name" type="text"
                       placeholder="pickup job-1" required />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="type" value="Job Type">Job Type</Label>
            </div>
            <Select {...register('job_type', { required: true })} id="type" required>
              <option value="pp">Pick-up</option>
              <option value="dd">Delivery</option>
              <option value="mm">Multi</option>
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="type" value="Work">Work</Label>
            </div>
            <SearchWork />
          </div>
        </div>
      </Card>
    </>
  );
}

const customTheme = {
  minusButton: 'group bg-red-300 text-red-600  m-3 hover:bg-red-600 hover:text-white flex items-stretch rounded-full text-xl text-red-500 items-center justify-center text-center font-medium absolute top-0 right-5',
  addButton: 'bg-green-300 hover:bg-green-600 text-green-600 hover:text-white p-2 rounded',
};

export function Jobs() {
  const { watch, getValues, setValue } = useFormContext();
  const newJob = { lng: null, lat: null, start_at: null, duration: null, demand: null, end_at: null };
  const isMulti = useMemo(() => {
    return getValues('job_type') === 'mm';
  }, [watch('job_type')]);

  const MultiField = useMemo(() => {
    return getValues('jobs');

  }, [watch('jobs')]);

  const handleAddJob = () => {
    const jobs = getValues('jobs');
    setValue('jobs', [...jobs, newJob]);
  };
  const handleRemove = (index) => () => {
    if (index !== 0) {
      const jobs = getValues('jobs');
      jobs.splice(index, 1);
      setValue('jobs', jobs);
    }
  };
  return (
    <>
      {MultiField?.map((element, index) => <JobCard
        key={index} index={index}
        handleRemove={handleRemove}
        isMulti={isMulti} />)}
      {
        isMulti && <div className="flex justify-center items-center my-4">
          <button className={customTheme.addButton} onClick={handleAddJob}>
            <IoIosAddCircleOutline className="h-6 w-6" />
          </button>
        </div>
      }
    </>
  );
}


function JobCard({ isMulti, handleRemove, index }) {
  const { lng: lg = 21.593328797360254, lat: lt = 63.10508032122929, setValue, getValues, register } = useFormContext();
  const setLatLang = (value) => {
    setValue(`jobs.${index}.lat`, value?.Latitude);
    setValue(`jobs.${index}.lng`, value?.Longitude);
  };
  const lat = useMemo(() => {
    const lat = getValues(`jobs.${index}.lat`);
    return parseFloat(lat)?.toFixed(4) ?? '';
  }, [getValues(`jobs.${index}.lat`)]);
  const lng = useMemo(() => {
    const lat = getValues(`jobs.${index}.lng`);
    return parseFloat(lat)?.toFixed(4) ?? '';
  }, [getValues(`jobs.${index}.lng`)]);
  return (
    <>
      <Card className="relative mb-4">
        {
          isMulti &&
          <button className={customTheme.minusButton} onClick={handleRemove(index)}
          >
            <CiCircleMinus />
          </button>
        }
        <div className="flex flex-col gap-4">
          {
            isMulti && <div>
              <div className="mb-2 block">
                <Label htmlFor="type" value="Job Type">Job Type</Label>
              </div>
              <Select {...register(`jobs.${index}.job_type`)} id="type" required>
                <option value="pp">Pick-up</option>
                <option value="dd">Delivery</option>
              </Select>
            </div>
          }
          <div className="flex justify-between items-center gap-x-6">

            <div className="w-full">
              <label htmlFor={`duration-input-${index}`}
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert
                Duration:</label>
              <input pattern="^\d+$" type="number"
                     id={`duration-input-${index}`} {...register(`jobs.${index}.duration`)}
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="100" required />
            </div>
            <div className="w-full">
              <label htmlFor={`demand-input-${index}`}
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert
                Demand:</label>
              <input pattern="^\d+$" type="number" id={`demand-input-${index}`} {...register(`jobs.${index}.demand`)}
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="5" required />
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-6">

            <div className="w-full">
              <label htmlFor={`start-input-${index}`}
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                Time:</label>
              <input step="1" type="datetime-local"
                     id={`start-input-${index}`} {...register(`jobs.${index}.start_at`)}
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="100" />
            </div>
            <div className="w-full">
              <label htmlFor={`end-input-${index}`}
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                Time:</label>
              <input pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}" step="1"
                     type="datetime-local" id={`end-input-${index}`} {...register(`jobs.${index}.end_at`)}
                     aria-describedby="helper-text-explanation"
                     className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="5" />
            </div>
          </div>
          <div>
            <div className="flex justify-between">
                            <span className="inline-flex  justify-center items-center "><BiTargetLock
                              className="text-rose-600" />Longitude:{!isNaN(lng) && lng}</span>
              <span className="inline-flex justify-center items-center"><BiTargetLock
                className="text-green-400" />Latitude:{!isNaN(lat) && lat}</span>
            </div>
            <div>
              <SearchComponent setValue={setLatLang} position={{ lat: lt, lng: lg }} />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
