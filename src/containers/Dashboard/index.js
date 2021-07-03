import React, { useState } from 'react';
import axios from 'axios';
import Statistics from './statistics';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

function Dashboard() {
  const [waiters, setWaiters] = useState([]);

  api
    .get('/waiters', { params: { limit: 2, page: 0 } })
    .then(function (result) {
      setWaiters(result);
      console.log({ waiters });
    })
    .catch(function (error) {
      console.log({ error });
    });

  return (
    <div>
      <Statistics />
    </div>
  );
}

export default Dashboard;
