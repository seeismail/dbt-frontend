/* eslint-disable react/prop-types */
import React from 'react';

function DataGrid({ columns, rows }) {
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
                  {rows.length ? (
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
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
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
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
        <select className="form-select ml-4 px-2">
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
