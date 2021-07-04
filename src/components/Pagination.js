/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classnames from 'classnames';

function Pagination({ limit, page, pages }) {
  const isFirstPage = page.value === 1;
  const isLastPage = page.value === pages;

  const renderPagination = () => {
    const pagination = [];

    for (let i = 0; i < pages; i++) {
      pagination.push(i + 1);
    }

    return pagination.map((i) => (
      <li
        className={classnames('page-item', { active: i === page.value })}
        onClick={() => page.set(i)}
      >
        <a className="page-link">{i}</a>
      </li>
    ));
  };

  return (
    <nav className="container-table100 mt-4">
      <ul className="pagination">
        <li
          className={classnames('page-item ', {
            disabled: isFirstPage,
          })}
          onClick={() => {
            if (!isFirstPage) page.set((prev) => prev - 1);
          }}
        >
          <a className="page-link">Previous</a>
        </li>
        {renderPagination()}
        <li
          className={classnames('page-item ', {
            disabled: isLastPage,
          })}
          onClick={() => {
            if (!isLastPage) page.set((prev) => prev + 1);
          }}
        >
          <a className="page-link">Next</a>
        </li>
      </ul>
      <select
        className="form-select ml-4 px-2"
        onChange={(opt) => {
          limit.set(opt.target.value);
          page.set(1);
        }}
      >
        <option value="5" selected>
          5
        </option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
    </nav>
  );
}

export default Pagination;
