import classNames from 'classnames';
import React from 'react';
import DataGrid from '../../components/DataGrid';
import GridSimple from '../../components/GridSimple';
import { currentOrder as mealsEntity } from '../../constants/entities';
import { useOrdersContext } from './ctx';

function CurrentOrder() {
  const { addedMeals } = useOrdersContext();

  // return (
  // <GridSimple>
  //   <thead>
  //     <tr>
  //       <th>Meal ID</th>
  //       <th>Name</th>
  //       <th>Price</th>
  //       <th>Qty</th>
  //       <th>Manage</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     {addedMeals?.value?.map((r) => (
  //       <tr key={r.meal_id}>
  //         <td className='text-center'>{r.meal_id}</td>
  //         <td className='text-center'>{r.meal_name}</td>
  //         <td className='text-center'>{r.price}</td>
  //         <td className='text-center'>{r.quantity}</td>
  //         <td className='text-center'>
  //           <div className='btn-group'>
  //             <button
  //               type='button'
  //               className='btn btn-sm btn-danger'
  //               onClick={() => handleDecrement(r.meal_id)}
  //             >
  //               -
  //             </button>
  //             <button
  //               type='button'
  //               className='btn btn-sm btn-success'
  //               onClick={() => handleIncrement(r.meal_id)}
  //             >
  //               +
  //             </button>
  //           </div>
  //         </td>
  //       </tr>
  //     ))}
  //   </tbody>
  // </GridSimple>
  // <DataGrid
  //   columns={mealsEntity.columns}
  //   rows={addedMeals.value}
  //   pages={1}
  //   page={{ value: 1, set() {} }}
  //   limit={{ value: 100, set() {} }}
  //   _manage={{ increment: handleIncrement, decrement: handleDecrement }}
  // />
  // );
}

export default CurrentOrder;
