/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import '../../table_tamplate/css/main.css';
import '../../table_tamplate/css/util.css';

import { useFormik } from 'formik';
import dayjs from 'dayjs';

import { useToasts } from 'react-toast-notifications';
import { useQuery, useQueryClient } from 'react-query';
import DataGrid from '../../components/DataGrid';
import { chefs as chefsEntity } from '../../constants/entities';
import { mealSchema } from '../../constants/schema';
import Modal from './Modal';
import { api } from '../../constants/server';

const fetchRows = (page, limit, query) =>
  api
    .get('/meals', {
      params: { limit, page, q: query },
    })
    .then((result) => {
      // debugger;
      const v = '';
      return {
        ...result.data,
        rows: result.data.rows.map((row) => {
          const parsedDate = dayjs(row.hire_date).format('DD MMM YYYY');
          return { ...row, hire_date: parsedDate };
        }),
      };
    });

function Meal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const { addToast } = useToasts();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const queryClient = useQueryClient();

  const [query, setQuery] = useState('');

  const { data, isLoading: isLoadingQuery, isError, error } = useQuery(
    ['meals', page, limit, query],
    () => fetchRows(page, limit, query),
    { retry: false }
  );

  const handleSubmit = async (values, form) => {
    setIsLoading(true);
    try {
      const parsedDate = dayjs(values.hire_date).format('YYYY-MM-DD');
      const chef = { ...values, hire_date: parsedDate };

      if (editId) await api.patch(`/meals/${editId}`, chef);
      else await api.post('/meals', chef);

      await queryClient.invalidateQueries();

      if (editId) setEditId(null);

      form.resetForm();
      toggleModal();

      addToast('Meal dispatched succesfully', { appearance: 'success' });
    } catch (err) {
      addToast(err.message, { appearance: 'error' });
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      cheff_id: '',
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
    validate(values) {
      const errors = {};
      Object.entries(values).forEach((elem) => {
        const [key, value] = elem;
        const validation = mealSchema[key]?.validate(value);
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

  const handleEdit = (selectedMeal) => {
    const { name, price, meal_id: id } = selectedMeal;

    // update the form values in modal
    formik.setFieldValue('name', name);
    formik.setFieldValue('price', price);

    // understand that save will trigger PATCH req
    setEditId(id);

    // open the modal
    toggleModal();
  };

  const handleDelete = async (id) => {
    await api.delete(`/meals/${id}`);
    await await queryClient.invalidateQueries();
    addToast('Meal deleted successfully', { appearance: 'success' });
  };

  useEffect(() => {
    if (isError) addToast(error.message, { appearance: 'error' });
  }, [isError]);

  return (
    <div className="container-padding">
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary mb-2"
          onClick={toggleModal}
        >
          Add Meal
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
        columns={chefsEntity.columns}
        rows={data?.rows}
        pages={data?.pages ?? 1}
        page={{ value: page, set: setPage }}
        limit={{ value: limit, set: setLimit }}
        _manage={{ edit: handleEdit, delete: handleDelete }}
      />

      <Modal
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
      />
    </div>
  );
}

export default Meal;
