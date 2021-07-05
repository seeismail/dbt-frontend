import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useOrdersContext } from './ctx';
import GridSimple from '../../components/GridSimple';
import { fetchMeals } from '../../constants/server';

function AddMeals({ addedMeals, setAddedMeals }) {
  const { addToast } = useToasts();
  // const { addedMeals } = useOrdersContext();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [query, setQuery] = useState('');

  const { data, isError, error } = useQuery(
    ['meals', page, limit, query],
    () => fetchMeals(1, 100, query),
    { retry: false }
  );

  useEffect(() => {
    if (isError) addToast(error.message, { appearance: 'error' });
  }, [isError]);

  const handleAdd = (meal) => {
    meal.quantity = 1;
    setAddedMeals((prev) => [...new Set([...prev, meal])]);
  };

  return (
    <div>
      <div className='input-group my-3'>
        <input
          className='form-control'
          type='text'
          placeholder='Search Meals'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <GridSimple>
        <thead>
          <tr>
            <th>Meal ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {data?.rows?.map((r) => {
            const isAdded = addedMeals.includes(
              (elem) => elem.meal_id == r.meal_id
            );

            return (
              <tr key={r.meal_id}>
                <td className='text-center'>{r.meal_id}</td>
                <td className='text-center'>{r.meal_name}</td>
                <td className='text-center'>{r.price}</td>
                <td className='text-center'>
                  <button
                    type='button'
                    className={classNames('btn btn-sm', {
                      'btn-success': !isAdded,
                      'btn-warning': isAdded,
                    })}
                    onClick={() => handleAdd(r)}
                  >
                    {isAdded ? 'Added' : '+'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </GridSimple>
      {/* <DataGrid
        columns={mealsEntity.columns}
        rows={data?.rows}
        pages={data?.pages ?? 1}
        page={{ value: page, set: setPage }}
        limit={{ value: limit, set: setLimit }}
      /> */}
    </div>
  );
}

export default AddMeals;
