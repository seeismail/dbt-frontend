import React, { Suspense, useState } from 'react';
import '../../table_tamplate/css/main.css';
import '../../table_tamplate/css/util.css';

import { useFormik } from 'formik';
import DataGrid from '../../components/DataGrid';
import { waiters } from '../../constants/entities';
import { waiterSchema } from '../../constants/schema';
import WaitersModal from './WaitersModal';

function Waiters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingWaiter, setIsSavingWaiter] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      salary: '',
    },
    validate(values) {
      const errors = {};
      Object.entries(values).forEach((elem) => {
        const [key, value] = elem;
        const validation = waiterSchema[key].validate(value);
        if (validation.error) errors[key] = validation.error.details[0].message;
      });
      return errors;
    },
    onSubmit(values, form) {
      console.log('form submitted successfully', values);
    },
  });

  const toggleModal = () => {
    if (!isSavingWaiter) {
      if (isModalOpen) formik.resetForm();
      setIsModalOpen((prev) => !prev);
    }
  };

  return (
    <div className="container-padding">
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={toggleModal}
        >
          Add Waiter
        </button>
        <input placeholder="Search" className="pl-2" />
      </div>
      <DataGrid columns={waiters.columns} rows={[]} />
      <WaitersModal
        toggle={toggleModal}
        isModalOpen={isModalOpen}
        handleChange={formik.handleChange}
        handleSubmit={formik.handleSubmit}
        values={formik.values}
        errors={formik.errors}
      />
    </div>
  );
}

export default Waiters;
