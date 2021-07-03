import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Statistics from './statistics';

function Dashboard() {
  const [waiters, setWaiters] = useState([]);

  return (
    <div>
      <Statistics />
    </div>
  );
}

export default Dashboard;
