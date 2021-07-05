/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchChefs } from '../../constants/server';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const getDefaultChef = (chefs, id) => {
  if (!chefs) return;

  const chef = chefs.find((c) => c.cheff_id === id);

  if (!chef) return;

  const defaultValue = {
    name: chef.name,
    id: chef.cheff_id,
  };

  return JSON.stringify(defaultValue);
};

function WaitersModal({ toggle, isModalOpen, formik, isSaving }) {
  const chefs = useQuery('chefs', () => fetchChefs(1, 100, ''));

  useEffect(() => {
    if (isModalOpen)
      if (formik.values.cheff_id === '')
        formik.setFieldValue('cheff_id', chefs.data.rows[0].cheff_id);
  }, [isModalOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={toggle}
      style={customStyles}
      // contentLabel="Example Modal"
    >
      <h2>Add Meal</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='input-group my-4'>
          <input
            id='meal_name'
            type='text'
            className='form-control'
            placeholder='Name'
            aria-label='Name'
            value={formik.values.meal_name}
            onChange={formik.handleChange}
          />
        </div>

        <div className='input-group my-4'>
          <input
            id='price'
            type='text'
            className='form-control'
            placeholder='Price'
            aria-label='Price'
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>

        <div className='input-group my-4 ml-2 d-flex flex-col align-items-start justify-content-start'>
          <label htmlFor='waiter_id'>Chef</label>
          <div>
            <select
              className='form-select py-2'
              defaultValue={getDefaultChef(
                chefs.data?.rows,
                formik.values.cheff_id
              )}
              onChange={(event) => {
                event.preventDefault();
                const value = JSON.parse(event.target.value);
                formik.setFieldValue('cheff_id', value.id);
              }}
            >
              {chefs?.data?.rows?.map((row) => (
                <option
                  selected={chefs.data.rows.includes(
                    (r) => r.cheff_id === row.cheff_id
                  )}
                  value={JSON.stringify({
                    name: row.name,
                    id: row.cheff_id,
                  })}
                >
                  {row.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {Object.values(formik.errors).map((err) => (
          <p className='text-danger'>{err}</p>
        ))}

        <div className='d-flex justify-content-end mt-3'>
          <div className='btn-group' role='group'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={toggle}
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-success'>
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default WaitersModal;
