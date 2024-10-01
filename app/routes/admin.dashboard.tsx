import { useState } from 'react';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { json, LoaderFunction, ActionFunction } from '@remix-run/node';
import { FaFileDownload, FaFilter } from 'react-icons/fa';

type Order = {
  id: number;
  staffName: string;
  orderDate: string;
  items: string;
  totalAmount: number;
  status: 'Pending' | 'Processed' | 'Completed';
};

export const loader: LoaderFunction = async () => {
  // TODO: Replace this with actual data fetching logic
  const orders: Order[] = [
    { id: 1, staffName: 'John Doe', orderDate: '2023-05-01', items: 'Item 1, Item 2', totalAmount: 150, status: 'Pending' },
    { id: 2, staffName: 'Jane Smith', orderDate: '2023-05-02', items: 'Item 3', totalAmount: 75, status: 'Processed' },
    { id: 3, staffName: 'Bob Johnson', orderDate: '2023-05-03', items: 'Item 1, Item 4', totalAmount: 200, status: 'Completed' },
  ];
  return json({ orders });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('action');
  const orderId = formData.get('orderId');
  const newStatus = formData.get('newStatus');

  if (action === 'updateStatus') {
    // TODO: Implement status update logic
    console.log(`Updating status for order ${orderId} to ${newStatus}`);
  } else if (action === 'generateReport') {
    // TODO: Implement report generation logic
    console.log('Generating report for all orders');
  }

  return null;
};

export default function AdminDashboard() {
  const { orders } = useLoaderData<{ orders: Order[] }>();
  const [filterDate, setFilterDate] = useState('');
  const [filterStaff, setFilterStaff] = useState('');
  const submit = useSubmit();

  const filteredOrders = orders.filter(order => 
    (filterDate ? order.orderDate === filterDate : true) &&
    (filterStaff ? order.staffName.toLowerCase().includes(filterStaff.toLowerCase()) : true)
  );

  const handleStatusChange = (orderId: number, newStatus: Order['status']) => {
    submit({ action: 'updateStatus', orderId: orderId.toString(), newStatus }, { method: 'post' });
  };

  const generateReport = () => {
    submit({ action: 'generateReport' }, { method: 'post' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={generateReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <FaFileDownload className="inline-block mr-2" />
            Generate Report
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Filters</h2>
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Date
              </label>
              <input
                type="date"
                id="filterDate"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-50 bg-gray-300"
              />
            </div>
            <div>
              <label htmlFor="filterStaff" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Staff Name
              </label>
              <input
                type="text"
                id="filterStaff"
                value={filterStaff}
                onChange={(e) => setFilterStaff(e.target.value)}
                placeholder="Enter staff name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-300"
              />
            </div>
          </Form>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.staffName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Processed' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processed">Processed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-white mt-4 rounded-lg shadow-md">
            No orders found matching the current filters.
          </div>
        )}
      </div>
    </div>
  );
}