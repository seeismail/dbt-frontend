/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import Modal from 'react-modal';

import React from 'react';
import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { api } from '../../constants/server';

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

function WaitersModal({ toggle, isModalOpen, formik, isSaving }) {
  return (
    <Modal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={toggle}
      style={customStyles}
      // contentLabel="Example Modal"
    >
      <h2>Add Chef</h2>
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
            id="salary"
            type="text"
            className="form-control"
            placeholder="Salary"
            aria-label="Salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
          />
        </div>

        <div
          className="input-group my-4 d-flex flex-col align-items-start justify-content-start"
          style={{ padding: '12px', width: '100%' }}
        >
          <label htmlFor="hire_date">Hiring Date</label>
          <div className="form-control" style={{ width: '100%' }}>
            <DatePicker
              id="hire_date"
              selected={formik.values.hire_date}
              onChange={(date) => formik.setFieldValue('hire_date', date)}
            />
          </div>
        </div>

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

export default WaitersModal;
