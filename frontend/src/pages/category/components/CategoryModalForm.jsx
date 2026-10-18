import { useForm } from 'react-hook-form';
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import React from 'react';
import { createCategory, updateCategory } from '@/managers/categorieManager.jsx';


function CategoryModalForm({ openModal, setOpenModal, modalData, setModalData }) {
  const methods = useForm({
    defaultValues: {
      name: modalData?.name,
      penalty: modalData?.penalty,
    },
  });
  const onSubmit = async (data) => {
    if (modalData?.id) {
      await updateCategory(modalData.id, data);
    } else {
      await createCategory(data);
    }
    methods.reset()
    setOpenModal(null);
    setOpenModal(false);
  };

  React.useEffect(() => {
    methods.reset({ name: modalData?.name, penalty: modalData?.penalty });
  }, [methods.reset, modalData]);
  return (<><Modal show={openModal} onClose={() => {
    setModalData(null);
    setOpenModal(false);
  }}>
    <ModalHeader>{modalData ? `Edit ${modalData?.name}` : 'Add New Category'}</ModalHeader>
    <ModalBody>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="">
          <label htmlFor="name-input"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category
            Name</label>
          <input type="text"
                 id="name-input" {...methods.register('name')}
                 aria-describedby="helper-text-explanation"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Category" required />
        </div>
        {methods.formState.errors.name?.type === 'maxLength' &&
          <span className="text-red-600">Name cannot exceed 20 characters.</span>}
        {methods.formState.errors.name?.type === 'required' &&
          <span className="text-red-600">This field is required</span>}
        <div className="">
          <label htmlFor="penalty-input"
                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penalty Per Hour</label>
          <input type="number"
                 step="any"
                 id="penalty-input" {...methods.register('penalty')}
                 aria-describedby="helper-text-explanation"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="10.00" required />
        </div>
        <Button className="mt-4" type="submit">Submit</Button>
      </form>
    </ModalBody>
  </Modal>
  </>);
}

export default CategoryModalForm;