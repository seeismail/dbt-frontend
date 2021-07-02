import React, { useState } from 'react';
import axios from 'axios';
import Statistics from './statistics';

const api = axios.create({
  baseURL: 'http://192.168.112.1:8000',
});

function Dashboard() {
  const [waiters, setWaiters] = useState([]);

  api
    .get('/waiters', { params: { limit: 2, page: 0 } })
    .then(function (result) {
      console.log({ result });
      setWaiters(result);
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
