import { useState } from "react";
import { Form, redirect, json, useLoaderData } from "@remix-run/react";

import { getSession } from "~/services/session.server";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  
  if (!user) {
    return redirect("/");
  }

  return json({ user });
};

type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const TRANSPORTATION_FEE = 10; // Fixed transportation fee

export default function OrderEntry() {

    const { user} = useLoaderData<typeof loader>();

    console.log(user)

  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    id: 0,
    name: "",
    price: 0,
    quantity: 1,
  });
  const [showPreview, setShowPreview] = useState(false);

  const addItem = () => {
    if (newItem.name && newItem.price > 0) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ id: 0, name: "", price: 0, quantity: 1 });
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return (
      items.reduce((total, item) => total + item.price * item.quantity, 0) +
      TRANSPORTATION_FEE
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f6fa] to-[#e0e6ed] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="font-bold py-4 text-2xl">Welcome, {user as string}</h2>
          <h1 className="text-3xl font-bold text-[#2c3e50] mb-6">New Order</h1>
          <Form className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="itemName"
                  className="block text-sm font-medium text-[#2c3e50]"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  name="itemName"
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3498db] focus:border-[#3498db] bg-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-[#2c3e50]"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3498db] focus:border-[#3498db] bg-white"
                />
              </div>
              <div className="sm:col-span-1">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-[#2c3e50]"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#3498db] focus:border-[#3498db] bg-white"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2ecc71] hover:bg-[#27ae60] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2ecc71] transition duration-150 ease-in-out"
              >
                + Add Item
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="inline-flex items-center px-4 py-2 border border-[#3498db] text-sm font-medium rounded-md shadow-sm text-[#3498db] bg-white hover:bg-[#3498db] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db] transition duration-150 ease-in-out"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
            </div>
          </Form>

          {showPreview && items.length > 0 && (
            <div className="mt-8 bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-medium text-[#2c3e50] mb-4">
                Order Preview
              </h2>
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="py-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#2c3e50]">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[#e74c3c] hover:text-[#c0392b] focus:outline-none transition duration-150 ease-in-out"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-[#2c3e50]">Transportation Fee:</p>
                <p className="text-sm font-medium text-[#2c3e50]">
                  ${TRANSPORTATION_FEE.toFixed(2)}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-medium text-[#2c3e50]">
                  Total Amount:
                </p>
                <p className="text-lg font-bold text-[#2c3e50]">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3498db] hover:bg-[#2980b9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3498db] transition duration-150 ease-in-out"
                >
                  Submit Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
