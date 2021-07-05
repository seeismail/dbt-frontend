/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

function GridSimple({ children, pagination }) {
  return (
    <>
      <div className='limiter'>
        <div className='container-table100'>
          <div className='wrap-table100'>
            <div className='table100'>
              <table>{children}</table>
            </div>
            {pagination}
          </div>
        </div>
      </div>
    </>
  );
}

export default GridSimple;
