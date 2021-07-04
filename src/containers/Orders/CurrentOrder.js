import React from 'react';
import DataGrid from '../../components/DataGrid';
import { currentOrder as mealsEntity } from '../../constants/entities';

function CurrentOrder({ addedMeals: { value, set } }) {
  const handleIncrement = (mealId) => {
    // debugger;
    console.log('handleIncrement()');

    const index = value.findIndex((m) => m.meal_id === mealId);
    const updatedMeals = value;
    let updatedMeal = updatedMeals[index];

    updatedMeal = {
      ...updatedMeal,
      quantity: updatedMeal.quantity + 1,
    };

    updatedMeals[index] = updatedMeal;

    set(updatedMeals);
    console.log('handleIncrement()');
  };
  const handleDecrement = (meal) => {};

  console.log({ value });

  return (
    <DataGrid
      columns={mealsEntity.columns}
      rows={value}
      pages={1}
      page={{ value: 1, set() {} }}
      limit={{ value: 100, set() {} }}
      _manage={{ increment: handleIncrement, decrement: handleDecrement }}
    />
  );
}

export default CurrentOrder;
