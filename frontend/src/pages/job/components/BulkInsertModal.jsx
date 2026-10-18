import { Button, FileInput, Label, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FormProvider, useForm } from 'react-hook-form';
import React from 'react';
import SearchWork from './SearchWork';
import { createBulkJob } from '../../../managers/jobManage';


export default function BulkInsertModal({ openModal, setOpenModal, refetch }) {
  return (
    <><Modal size="xl" show={openModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>Add Jobs</ModalHeader>
      <ModalBody>
        <BulkInsertJobForm refetch={refetch} setOpenModal={setOpenModal} />
      </ModalBody>
    </Modal>
    </>
  );
}

function BulkInsertJobForm({ setOpenModal, refetch }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const job = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": window.CSRF_TOKEN, // 👈 CSRF token for Django
      },
      withCredentials: true, // send cookies with requests
    }
    job.append('work_id', data?.work?.value);
    job.append('file', data?.file[0]);
    await createBulkJob(job, config).then(setOpenModal(false));
    await refetch();
  };
  return (
    <FormProvider {...{ register, control }}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="work" value="Work">Work</Label>
          </div>
          <SearchWork />
        </div>
        <div id="fileUpload" className="">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Upload file">Upload file</Label>
          </div>
          <FileInput {...register('file')} id="file"
                     helperText="Upload CSV file" />
        </div>
        <Button type="submit" size="xs" color="blue" className=" flex gap-x-2 items-center">
                    <span
                      className="">Submit</span></Button>
      </form>
    </FormProvider>
  );

}
