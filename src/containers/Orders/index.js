/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
import { useFormik } from 'formik';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import GridSimple from '../../components/GridSimple';
import {
  api,
  fetchChefs,
  fetchCustomers,
  fetchWaiters,
} from '../../constants/server';
import '../../table_tamplate/css/main.css';
import '../../table_tamplate/css/util.css';
import AddMeals from './AddMeals';
import { OrdersContext, useContextValue } from './ctx';
import CurrentOrder from './CurrentOrder';

const getDefaultOptionByKey = ({ data, key, id }) => {
  if (!data) return;

  const option = data.find((c) => c[key] === id);

  if (!option) return;

  const defaultValue = {
    name: option.name,
    id: option[key],
  };

  return JSON.stringify(defaultValue);
};

function Orders() {
  const [addedMeals, setAddedMeals] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToasts();

  const waiters = useQuery('waiters', () => fetchWaiters(1, 100, ''));
  const customers = useQuery('chefs', () => fetchCustomers(1, 100, ''));

  const formik = useFormik({
    initialValues: { waiter_id: '', cust_id: '' },
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    validate: (values) => {},
    onSubmit: (values, form) => {},
  });

  const handleIncrement = (mealId) => {
    const index = addedMeals.findIndex((m) => m.meal_id === mealId);
    const updatedMeals = addedMeals;
    let updatedMeal = updatedMeals[index];

    updatedMeal = {
      ...updatedMeal,
      quantity: updatedMeal.quantity + 1,
    };

    updatedMeals[index] = updatedMeal;

    setAddedMeals([...updatedMeals]);
  };

  const handleDecrement = (mealId) => {
    const index = addedMeals.findIndex((m) => m.meal_id === mealId);
    const updatedMeals = addedMeals;
    let updatedMeal = updatedMeals[index];

    if (updatedMeal.quantity <= 1) return;

    updatedMeal = {
      ...updatedMeal,
      quantity: updatedMeal.quantity - 1,
    };

    updatedMeals[index] = updatedMeal;

    setAddedMeals([...updatedMeals]);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const duplicatedMeals = [];

    addedMeals.forEach((m) => {
      const meal = { ...m };
      delete meal.quantity;
      for (let i = 0; i < m.quantity; i++) {
        duplicatedMeals.push(meal);
      }
    });

    try {
      await api.post('/orders', {
        meals: duplicatedMeals,
        cust_id: formik.values.cust_id || customers.data?.rows?.[0]?.cust_id,
        waiter_id:
          formik.values.waiter_id || waiters.data?.rows?.[0]?.waiter_id,
      });
      setAddedMeals([]);
      addToast('Order dispatched succesfully', { appearance: 'success' });
    } catch (err) {
      const error = err?.response?.data?.message ?? err.message;
      addToast(error, { appearance: 'error' });
    }

    setIsSaving(false);
  };

  return (
    // <OrdersContext.Provider value={value}>
    <div className='container-padding'>
      <div className='d-flex' style={{ gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <h2 className='font-weight-bold'>Add Meals</h2>
          <AddMeals addedMeals={addedMeals} setAddedMeals={setAddedMeals} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className='font-weight-bold'>Current Order</h2>

          <div className='d-flex flex-col mb-3' style={{ gap: '6px' }}>
            <h6>Waiter</h6>
            <select
              className='form-select py-2'
              defaultValue={getDefaultOptionByKey({
                data: waiters.data?.rows,
                key: 'waiter_id',
                id: formik.values.waiter_id,
              })}
              onChange={(event) => {
                event.preventDefault();
                const value = JSON.parse(event.target.value);
                formik.setFieldValue('waiter_id', value.id);
              }}
            >
              {waiters?.data?.rows?.map((row) => (
                <option
                  selected={waiters.data.rows.includes(
                    (r) => r.waiter_id === row.waiter_id
                  )}
                  value={JSON.stringify({
                    name: row.name,
                    id: row.waiter_id,
                  })}
                >
                  {row.name}
                </option>
              ))}
            </select>
          </div>
          <div className='d-flex flex-col mb-4' style={{ gap: '6px' }}>
            <h6>Customer</h6>
            <select
              className='form-select py-2'
              defaultValue={getDefaultOptionByKey({
                data: customers.data?.rows,
                key: 'cust_id',
                id: formik.values.cust_id,
              })}
              onChange={(event) => {
                event.preventDefault();
                const value = JSON.parse(event.target.value);
                formik.setFieldValue('cust_id', value.id);
              }}
            >
              {customers?.data?.rows?.map((row) => (
                <option
                  selected={customers.data.rows.includes(
                    (r) => r.cust_id === row.cust_id
                  )}
                  value={JSON.stringify({
                    name: row.name,
                    id: row.cust_id,
                  })}
                >
                  {row.name} - {row.phone}
                </option>
              ))}
            </select>
          </div>

          <GridSimple>
            <thead>
              <tr>
                <th>Meal ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {addedMeals?.map((r) => (
                <tr key={r.meal_id}>
                  <td className='text-center'>{r.meal_id}</td>
                  <td className='text-center'>{r.meal_name}</td>
                  <td className='text-center'>{r.price}</td>
                  <td className='text-center'>{r.quantity}</td>
                  <td className='text-center'>
                    <div className='btn-group'>
                      <button
                        type='button'
                        className='btn btn-sm btn-danger'
                        onClick={() => handleDecrement(r.meal_id)}
                      >
                        -
                      </button>
                      <button
                        type='button'
                        className='btn btn-sm btn-success'
                        onClick={() => handleIncrement(r.meal_id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </GridSimple>
          <button
            className='btn btn-primary btn-block mt-3'
            type='button'
            onClick={handleSave}
          >
            Save Order
          </button>
        </div>
      </div>
    </div>
    // </OrdersContext.Provider>
  );
}

export default Orders;
