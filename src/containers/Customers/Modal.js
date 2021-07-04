/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import Modal from 'react-modal';

import React from 'react';
import { useQuery } from 'react-query';
import { fetchWaiters } from '../../constants/server';

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

function CustomersModal({ toggle, isModalOpen, formik, isSaving, isEditing }) {
  console.log({ values: formik.values });
  const waiters = useQuery('waiters', () => fetchWaiters(1, 100, ''));

  return (
    <Modal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={toggle}
      style={customStyles}
      // contentLabel="Example Modal"
    >
      <h2>Add Customer</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-group my-4">
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>

        <div className="input-group my-4">
          <input
            id="phone"
            type="text"
            className="form-control"
            placeholder="Phone"
            aria-label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
        </div>

        <div className="input-group my-4">
          <input
            id="address"
            type="text"
            className="form-control"
            placeholder="Address"
            aria-label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
        </div>

        {!isEditing && (
          <div className="input-group my-4 ml-2 d-flex flex-col align-items-start justify-content-start">
            <label htmlFor="waiter_id">Waiter</label>
            <div>
              <select
                className="form-select py-2"
                onChange={(waiter) => {
                  const value = JSON.parse(waiter.target.value);
                  formik.setFieldValue('waiter_id', value.id);
                }}
              >
                {waiters?.data?.rows?.map((row) => (
                  <option
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
          </div>
        )}

        {Object.values(formik.errors).map((err) => (
          <p className="text-danger">{err}</p>
        ))}

        <div className="d-flex justify-content-end mt-3">
          <div className="btn-group" role="group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggle}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CustomersModal;
