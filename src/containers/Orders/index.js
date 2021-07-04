/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import '../../table_tamplate/css/main.css';
import '../../table_tamplate/css/util.css';
import AddMeals from './AddMeals';
import CurrentOrder from './CurrentOrder';

function Orders() {
  const [addedMeals, setAddedMeals] = useState([]);
  return (
    <div className="container-padding">
      <div className="d-flex" style={{ gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <h2 className="font-weight-bold">Add Meals</h2>
          <AddMeals addedMeals={{ value: addedMeals, set: setAddedMeals }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="font-weight-bold">Current Order</h2>
          <CurrentOrder
            addedMeals={{ value: addedMeals, set: setAddedMeals }}
          />
        </div>
      </div>
    </div>
  );
}

export default Orders;
