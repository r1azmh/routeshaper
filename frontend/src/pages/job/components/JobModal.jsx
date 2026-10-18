import {Button, Modal, ModalBody, ModalHeader} from "flowbite-react";
import {FormProvider, useForm} from "react-hook-form";
import {createJob, createMultiJob, updateJob} from "../../../managers/jobManage";
import React from "react";
import {JobDefinition, Jobs} from "./JobCreateUpdate";

export default function JobModal({openModal, setOpenModal, setModalData, modalData}) {
    const modalTitle = modalData ? modalData?.name?.concat(" edit") : "Add New Job"

    const handleClose = () => {
        setModalData(null)
        setOpenModal(false)
    }
    return (
        <><Modal size='5xl' show={openModal} onClose={handleClose}>
            <ModalHeader>{modalTitle}</ModalHeader>
            <ModalBody>
                <JobForm setOpenModal={setOpenModal} data={modalData}/>
            </ModalBody>
        </Modal>
        </>
    );
}
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};


function JobForm({setOpenModal, data}) {
    console.log('data job', data)
    const methods = useForm({
        defaultValues: {
            work: {value: data?.work_id, label: data?.work?.name},
            name: data?.name ?? '',
            job_type: data?.job_type,
            jobs: [{
                lat: data?.lat,
                lng: data?.lng,
                demand: data?.demand,
                duration: data?.duration,
                start_at: data?.start_at ? formatDate(new Date(data.start_at)) : "",
                end_at: data?.end_at ? formatDate(new Date(data.end_at)) : "",
            }]
        }
    })

    const onSubmit = async (formData) => {
        if (formData?.job_type !== 'mm') {
            const work = formData?.work
            const job = formData?.jobs?.[0]
            job.name = formData?.name;
            job.work_id = work?.value;
            job.job_type = formData?.job_type;
            job.start_at = new Date(job.start_at).toISOString()
            job.end_at = new Date(job.end_at).toISOString()
            console.log("job", job)
            if(data){
                await updateJob(data?.id, job).then(setOpenModal(false))
            }else{
                await createJob(job).then(setOpenModal(false))
            }
        }
        if (formData?.job_type === 'mm') {
            const jobs = []
            for (let job of formData?.jobs) {
                job.work_id = formData?.work?.value
                jobs.push(job)
            }
            formData.work_id = formData?.work?.value
            formData.jobs = jobs
            await createMultiJob(formData).then(setOpenModal(false))
        }
        methods.reset()

    }
    return (
        <FormProvider {...methods} lat={data?.lat} lng={data?.lng}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-x-2">
                <div className='col-span-1'>
                    <JobDefinition/>
                    <Button size="xs" className="mt-4" type="submit">Submit</Button>
                </div>
                <div className="col-span-2">
                    <Jobs/>
                </div>
            </form>
        </FormProvider>
    )

}
