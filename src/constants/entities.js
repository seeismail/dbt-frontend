export const waiters = {
  key: 'waiters',
  columns: [
    { server: 'waiter_id', client: 'Waiter ID' },
    { server: 'name', client: 'Name' },
    { server: 'phone', client: 'Contact' },
    { server: 'salary', client: 'Salary' },
    { server: 'hire_date', client: 'Hiring Date' },
    { client: 'Manage' },
  ],
};
export const chefs = {
  key: 'chefs',
  columns: [
    { server: 'cheff_id', client: 'Chef ID' },
    { server: 'name', client: 'Name' },
    { server: 'salary', client: 'Salary' },
    { server: 'hire_date', client: 'Hiring Date' },
    { client: 'Manage' },
  ],
};
export const customers = {
  key: 'customers',
  columns: [
    { server: 'cust_id', client: 'Customer ID' },
    { server: 'name', client: 'Name' },
    { server: 'phone', client: 'Phone' },
    { server: 'address', client: 'Address' },
    { server: 'waiter_id', client: 'Waiter' },
    { client: 'Manage' },
  ],
};
export const meals = {
  key: 'meals',
  columns: [
    { server: 'mId', client: 'Meal ID' },
    { server: 'name', client: 'Name' },
    { server: 'price', client: 'Price' },
  ],
};
export const orders = {
  key: 'orders',
  columns: [
    { server: 'oId', client: 'Order ID' },
    { server: 'quantity', client: 'Quantity' },
    { server: 'status', client: 'Status' },
    { server: 'time', client: 'Time' },
  ],
};
