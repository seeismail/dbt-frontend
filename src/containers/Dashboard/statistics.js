import dayjs from 'dayjs';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { api } from '../../constants/server';

const StatisticCard = ({ title, children }) => (
  <div className='col-xl-3 col-lg-6'>
    <div className='card card-stats mb-4 mb-xl-0'>
      <div className='card-body'>
        <div className='row'>
          <div className='col'>
            <h5 className='card-title text-uppercase text-muted mb-0'>
              {title}
            </h5>
            <span className='h2 font-weight-bold mb-0'>{children}</span>
          </div>
        </div>
        {/* <p className='mt-3 mb-0 text-muted text-sm'></p> */}
      </div>
    </div>
  </div>
);

const today = dayjs(new Date()).format('DD MMM YYYY');

function Statistics() {
  const ordersCount = useQuery('ordersCount', () =>
    api.get('/orders/count').then((res) => res.data)
  );
  const customersCount = useQuery('customersCount', () =>
    api.get('/customers/count').then((res) => res.data)
  );
  const history = useHistory();
  return (
    <div className='mb-3'>
      <div className='row'>
        <StatisticCard title='New Customer'>
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => history.push('/contacts/customers')}
          >
            Create
          </button>
        </StatisticCard>
        <StatisticCard title='Sales'>
          {ordersCount.data?.count ?? '...'}
        </StatisticCard>
        <StatisticCard title='Customers Served'>
          {customersCount.data?.count ?? '...'}
        </StatisticCard>
        <StatisticCard title='Date & Time'>{today}</StatisticCard>
      </div>
    </div>
  );
}

export default Statistics;
