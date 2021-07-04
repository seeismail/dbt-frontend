import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import DataGrid from '../../components/DataGrid';
import { addMeal as mealsEntity } from '../../constants/entities';
import { fetchMeals } from '../../constants/server';

function AddMeals({ addedMeals }) {
  const { addToast } = useToasts();

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
    addedMeals.set((prev) => [...new Set([...prev, meal])]);
  };

  return (
    <div>
      <div className="input-group my-3">
        <input
          className="form-control"
          type="text"
          placeholder="Search Meals"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <DataGrid
        columns={mealsEntity.columns}
        rows={data?.rows}
        pages={data?.pages ?? 1}
        page={{ value: page, set: setPage }}
        limit={{ value: limit, set: setLimit }}
        _custom={({ meal }) => {
          const isAdded = addedMeals.value.includes(
            (elem) => elem.meal_id === meal.meal_id
          );
          return (
            <button
              type="button"
              className={classNames('btn btn-sm', {
                'btn-success': !isAdded,
                'btn-warning': isAdded,
              })}
              onClick={() => handleAdd(meal)}
            >
              {isAdded ? 'Added' : '+'}
            </button>
          );
        }}
      />
    </div>
  );
}

export default AddMeals;
