import { Form, Link, MetaFunction, useActionData,redirect ,json } from '@remix-run/react';
import type { ActionFunction,  } from '@remix-run/node';
import axios from 'axios';

export const meta: MetaFunction = () => {
  return [
    { title: "REF HUB | SIGN UP", description: "Order Management for staff at work place" },
    { name: "description", content: "Welcome to REF HUB!" },

  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
 
  const userData = Object.fromEntries(formData.entries())

  console.log(userData)

  
  try {
    const response = await axios.post('http://localhost:8000/api/signup/', userData);

    if (response.status === 201) {
      return redirect('/'); // Redirect to login after successful registration
    }
  } catch (error:any) {
    const errorMsg = error.response?.data?.detail || 'An error occurred';
    return json({ error: errorMsg }, { status: error.response?.status || 500 });
  }


 
};

export default function Signup() {
 
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#3498db] to-[#2c3e50]">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#3498db]">REF HUB</h1>
          <p className="text-[#2c3e50] mt-2">Order Management System</p>
        </div>
        <Form method="post" className="space-y-6">
        {actionData?.error && (
            <div className="bg-[#e74c3c] text-white p-3 rounded-md text-sm">{actionData.error}</div>
          )}
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#2c3e50]">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent"
              
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2c3e50]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent"
              
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#2c3e50]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-transparent"
             
            />
          </div>
         
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db] transition duration-150 ease-in-out"
            >
              Register
            </button>
          </div>
          <div className='text-center '>
            Already have an account? <Link className='text-[#3498db]' to="/" >
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}