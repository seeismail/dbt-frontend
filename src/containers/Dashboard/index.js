import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import Statistics from './statistics';

import DataGrid from '../../components/DataGrid';
import { orders } from '../../constants/entities';
import { api, fetchCustomers, fetchWaiters } from '../../constants/server';

export const fetchRows = (page, limit) =>
  api
    .get('/orders', {
      params: { limit, page },
    })
    .then((result) =>
      // debugger;
      ({
        ...result.data,
        rows: result.data.rows.map((row) => {
          const parsedDate = dayjs(row.order_date).format('DD MMM YYYY');
          return { ...row, order_date: parsedDate };
        }),
      })
    );

function Dashboard() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data } = useQuery(
    ['meals', page, limit],
    () => fetchRows(page, limit),
    { retry: false }
  );

  return (
    <div>
      <Statistics />
      <DataGrid
        columns={orders.columns}
        rows={data?.rows}
        pages={data?.pages ?? 1}
        page={{ value: page, set: setPage }}
        limit={{ value: limit, set: setLimit }}
      />
    </div>
  );
}

export default Dashboard;
