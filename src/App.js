import React, { Suspense } from 'react';

import './template/css/bootstrap.min.css';
import './template/css/style.css';
import 'react-datepicker/dist/react-datepicker.css';

import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './routes/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <ToastProvider autoDismiss placement="bottom-right">
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </ToastProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
