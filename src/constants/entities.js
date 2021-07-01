export const waiters = {
  key: 'waiters',
  columns: [
    { server: 'waiterId', client: 'Waiter ID' },
    { server: 'name', client: 'Name' },
    { server: 'contact', client: 'Contact' },
    { server: 'salary', client: 'Salary' },
    { server: 'hire_Date', client: 'Hiring Date' },
    { client: 'Manage' },
  ],
};
export const chefs = {
  key: 'chefs',
  columns: [
    { server: 'chefId', client: 'Cheff ID' },
    { server: 'name', client: 'Name' },
    { server: 'salary', client: 'Salary' },
    { server: 'hire_Date', client: 'Hiring Date' },
  ],
};
export const customers = {
  key: 'customers',
  columns: [
    { server: 'cId', client: 'Customer ID' },
    { server: 'name', client: 'Name' },
    { server: 'phone', client: 'Phone' },
    { server: 'address', client: 'Address' },
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
