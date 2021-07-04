/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import Pagination from './Pagination';

function DataGrid({
  columns,
  rows,
  _manage,
  page,
  pages,
  limit,
  _custom: CustomRenderer,
}) {
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
                                  {c.client == 'Add' ? (
                                    CustomRenderer ? (
                                      <CustomRenderer meal={r} />
                                    ) : null
                                  ) : c.client == 'Handle' ? (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          _manage.decrement(r.meal_id)
                                        }
                                      >
                                        -
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() =>
                                          _manage.increment(r.meal_id)
                                        }
                                      >
                                        +
                                      </button>
                                    </>
                                  ) : c.client == 'Qty' ? (
                                    r.quantity
                                  ) : (
                                    <>
                                      <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={() => _manage.edit(r)}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() =>
                                          _manage.delete(r[columns[0].server])
                                        }
                                      >
                                        Del
                                      </button>
                                    </>
                                  )}
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
            <Pagination limit={limit} page={page} pages={pages} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DataGrid;
