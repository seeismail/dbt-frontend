/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';

function DataGrid({ columns, rows, _manage, page, limit }) {
  const isFirstPage = page.value === 0;
  console.log({ isFirstPage });
  return (
    <>
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100">
              <table>
                <thead>
                  <tr className="table100-head">
                    {columns.map((c, currentIndex) => (
                      <th
                        key={`data-grid-th-${currentIndex}`}
                        className={`column${currentIndex + 1}`}
                      >
                        {c.client}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows?.length ? (
                    rows.map((r, currentIndex) => (
                      <tr key={`data-grid-tr-${currentIndex}`}>
                        {columns.map((c) => {
                          const cellFromServer = r[c.server];
                          return (
                            <td className="text-center">
                              {c.server ? (
                                cellFromServer
                              ) : (
                                <div className="btn-group" role="group">
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm"
                                    onClick={function () {
                                      console.log({ r });
                                      return _manage.edit(r);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={function () {
                                      return _manage.delete(r.waiter_id);
                                    }}
                                  >
                                    Del
                                  </button>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  ) : (
                    <p className="m-2 text-center">No data found</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <nav className="container-table100">
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
          <li className="page-item page-link">1</li>
          <li className="page-item page-link">2</li>
          <li className="page-item page-link">3</li>
          <li
            className="page-item page-link"
            onClick={() => page.set((prev) => prev + 1)}
          >
            Next
          </li>
        </ul>
        <select
          className="form-select ml-4 px-2"
          onChange={(opt) => limit.set(opt.target.value)}
        >
          <option value="5" selected>
            5
          </option>
          <option value="10">10</option>
          <option value="25">25</option>
        </select>
      </nav>
    </>
  );
}

export default DataGrid;
