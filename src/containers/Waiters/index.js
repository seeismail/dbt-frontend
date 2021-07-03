/* eslint-disable no-use-before-define */
import React, { Suspense, useEffect, useState } from 'react';
import '../../table_tamplate/css/main.css';
import '../../table_tamplate/css/util.css';

import { useFormik } from 'formik';
import dayjs from 'dayjs';

import { useToasts } from 'react-toast-notifications';
import { useQuery, useQueryClient } from 'react-query';
import DataGrid from '../../components/DataGrid';
import { waiters as waitersEntity } from '../../constants/entities';
import { waiterSchema } from '../../constants/schema';
import WaitersModal from './WaitersModal';
import { api } from '../../constants/server';

const fetchWaiters = (page, limit, query) =>
  api
    .get('/waiters', {
      params: { limit, page, q: query },
    })
    .then((result) =>
      result.data.map((row) => {
        const parsedDate = dayjs(row.hire_date).format('DD MMM YYYY');
        return { ...row, hire_date: parsedDate };
      })
    );

function Waiters() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editWaiterId, setEditWaiterId] = useState(null);
  const { addToast } = useToasts();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const queryClient = useQueryClient();

  const [query, setQuery] = useState('');

  const { data, isLoading: isLoadingQuery, isError, error } = useQuery(
    ['waiters', page, limit, query],
    () => fetchWaiters(page, limit, query)
  );

  const handleSubmit = async (values, form) => {
    setIsLoading(true);
    try {
      const parsedDate = dayjs(values.hire_date).format('YYYY-MM-DD');
      const waiter = { ...values, hire_date: parsedDate };

      if (editWaiterId) await api.patch(`/waiters/${editWaiterId}`, waiter);
      else await api.post('/waiters', waiter);

      await queryClient.invalidateQueries();

      if (editWaiterId) setEditWaiterId(null);

      form.resetForm();
      toggleModal();

      addToast('Waiter dispatched succesfully', { appearance: 'success' });
    } catch (err) {
      addToast(err.message, { appearance: 'error' });
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      salary: '',
      hire_date: new Date(),
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validate(values) {
      const errors = {};
      Object.entries(values).forEach((elem) => {
        const [key, value] = elem;
        const validation = waiterSchema[key]?.validate(value);
        if (validation?.error)
          errors[key] = validation.error.details[0].message;
      });
      return errors;
    },
    // eslint-disable-next-line no-use-before-define
    onSubmit: handleSubmit,
  });

  const toggleModal = () => {
    if (!isLoading) {
      if (isModalOpen) formik.resetForm();
      setIsModalOpen((prev) => !prev);
    }
  };

  const handleEditWaiter = (selectedWaiter) => {
    const {
      name,
      phone,
      salary,
      hire_date: date,
      waiter_id: id,
    } = selectedWaiter;

    // update the form values in modal
    formik.setFieldValue('name', name);
    formik.setFieldValue('phone', phone);
    formik.setFieldValue('salary', salary);
    formik.setFieldValue('hire_date', dayjs(date, 'DD MMM YYYY').toDate());

    // understand that save will trigger PATCH req
    setEditWaiterId(id);

    // open the modal
    toggleModal();
  };

  const handleDeleteWaiter = async (id) => {
    await api.delete(`/waiters/${id}`);
    await await queryClient.invalidateQueries();
    addToast('Waiter deleted successfully', { appearance: 'success' });
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
        <input
          placeholder="Search"
          className="pl-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <p className="text-center">{isLoadingQuery && 'Loading...'}</p>
      <DataGrid
        columns={waitersEntity.columns}
        rows={data}
        page={{ value: page, set: setPage }}
        limit={{ value: limit, set: setLimit }}
        _manage={{ edit: handleEditWaiter, delete: handleDeleteWaiter }}
      />

      <WaitersModal
        toggle={toggleModal}
        isModalOpen={isModalOpen}
        isSaving={isLoading}
        formik={{
          handleChange: formik.handleChange,
          handleSubmit: formik.handleSubmit,
          values: formik.values,
          setFieldValue: formik.setFieldValue,
          errors: formik.errors,
        }}
        errors={formik.errors}
      />
    </div>
  );
}

export default Waiters;
