import axios from 'axios';
import dayjs from 'dayjs';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchWaiters = (page, limit, query) =>
  api
    .get('/waiters', {
      params: { limit, page, q: query },
    })
    .then((result) =>
      // debugger;
      ({
        ...result.data,
        rows: result.data.rows.map((row) => {
          const parsedDate = dayjs(row.hire_date).format('DD MMM YYYY');
          return { ...row, hire_date: parsedDate };
        }),
      })
    );

export const fetchChefs = (page, limit, query) =>
  api
    .get('/cheffs', {
      params: { limit, page, q: query },
    })
    .then((result) => {
      // debugger;
      const v = '';
      return {
        ...result.data,
        rows: result.data.rows.map((row) => {
          const parsedDate = dayjs(row.hire_date).format('DD MMM YYYY');
          return { ...row, hire_date: parsedDate };
        }),
      };
    });

export const fetchMeals = (page, limit, query) =>
  api
    .get('/meals', {
      params: { limit, page, q: query },
    })
    .then((result) => {
      // debugger;
      const v = '';
      return result.data;
    });
