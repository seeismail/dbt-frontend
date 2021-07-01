/* eslint-disable react/prop-types */
import Modal from 'react-modal';

import React from 'react';

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

function WaitersModal({
  toggle,
  isModalOpen,
  handleSubmit,
  handleChange,
  values,
  errors,
}) {
  return (
    <Modal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={toggle}
      style={customStyles}
      // contentLabel="Example Modal"
    >
      <h2>Add Waiter</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group my-4">
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Name"
            value={values.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group my-4">
          <input
            id="contact"
            type="text"
            className="form-control"
            placeholder="Contact"
            aria-label="Contact"
            value={values.contact}
            onChange={handleChange}
          />
        </div>

        <div className="input-group my-4">
          <input
            id="salary"
            type="text"
            className="form-control"
            placeholder="Salary"
            aria-label="Salary"
            value={values.salary}
            onChange={handleChange}
          />
        </div>

        {Object.values(errors).map((err) => (
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
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default WaitersModal;
