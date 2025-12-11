import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { formData, cartItems, totalAmount } = location.state || {};

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Customer Details</h3>
        <p><strong>Name:</strong> {formData?.name}</p>
        <p><strong>Email:</strong> {formData?.email}</p>
        <p><strong>Phone:</strong> {formData?.phone}</p>
        <p><strong>Address:</strong> {formData?.address}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Delivery & Payment</h3>
        <p><strong>Delivery Method:</strong> {formData?.deliveryMethod === 'standard' ? 'Standard (3-5 days)' : 'Express (1-2 days)'}</p>
        <p><strong>Payment Method:</strong> {formData?.paymentMethod?.toUpperCase()}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Order Items</h3>
        {cartItems?.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name} (x{item.quantity})</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="font-bold text-lg flex justify-between pt-4">
          <span>Total:</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="text-center mt-6 text-green-700 text-xl font-semibold">
        🎉 Thank you for your order, {formData?.name}!
        <div className="py-5">
          <Link
            to="/shop"
            className="text-center inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
