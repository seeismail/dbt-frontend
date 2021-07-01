import React, { Suspense } from 'react';

import './template/css/bootstrap.min.css';
import './template/css/style.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
