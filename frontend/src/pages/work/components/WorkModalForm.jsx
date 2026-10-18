import {useForm} from "react-hook-form";
import {Button, Modal, ModalBody, ModalHeader} from "flowbite-react";
import React from "react";
import {createWork, updateJob} from "../../../managers/workManager";

function WorkModalForm({openModal, setOpenModal, modalData, setModalData}) {
    const methods = useForm({
        defaultValues: {
            name: modalData?.name
        }
    })
    const onSubmit = async (data) => {
        console.log(data)
        if(modalData?.id){
            await updateJob(modalData.id, data)
        }else {
            await createWork(data)
        }
        setModalData(null)
        setOpenModal(false)
        methods.reset()
    }

    React.useEffect(() => {
        methods.reset({name:modalData?.name})
    }, [methods.reset, modalData]);
    return (
        <><Modal show={openModal} onClose={() => {
            console.log("closing")
            setModalData(null)
            setOpenModal(false)
        }}>
            <ModalHeader>{modalData ? `Edit ${modalData?.name}` : "Add New Work"}</ModalHeader>
            <ModalBody>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="">
                        <label htmlFor="name-input"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work
                            Name</label>
                        <input type="text"
                               id="name-input" {...methods.register('name')}
                               aria-describedby="helper-text-explanation"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="New Work" required/>
                    </div>
                    {methods.formState.errors.name?.type === 'maxLength' &&
                        <span className='text-red-600'>Name cannot exceed 20 characters.</span>}
                    {methods.formState.errors.name?.type === 'required' && <span className='text-red-600'>This field is required</span>}

                    <Button className="mt-4" type="submit">Submit</Button>
                </form>
            </ModalBody>
        </Modal>
        </>
    );
}

export default WorkModalForm