import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryMethod: 'standard',
    paymentMethod: 'cod',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const { name, email, phone, address } = formData;

    if (!name || !email || !phone || !address) {
      alert('⚠️ Please fill all the details before placing the order.');
      return;
    }

    setOrderPlaced(true);
    clearCart(); // ✅ Clear the cart after placing order
  };

  return (
    <PageWrapper>
    <div className="p-6 w-screen h-full min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6 border-b pb-3">
          {orderPlaced ? 'Invoice & Order Summary' : 'Checkout'}
        </h2>

        {cartItems.length === 0 && !orderPlaced ? (
          <div className="text-center text-gray-600">
            <p>Your cart is currently empty.</p>
            <Link to="/shop" className="text-blue-600 underline mt-2 inline-block">
              Go back to shop
            </Link>
          </div>
        ) : orderPlaced ? (
          // === INVOICE DISPLAY ===
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Customer Details</h3>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Address:</strong> {formData.address}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Delivery & Payment</h3>
              <p><strong>Delivery Method:</strong> {formData.deliveryMethod === 'standard' ? 'Standard (3-5 days)' : 'Express (1-2 days)'}</p>
              <p><strong>Payment Method:</strong> {formData.paymentMethod.toUpperCase()}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Order Items</h3>
              {cartItems.map((item) => (
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
              🎉 Thank you for your order, {formData.name}!
              <div className="py-5">
                <Link
                  to="/shop"
                  className="text-center inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  <div className='text-white'>Continue Shopping</div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // === CHECKOUT FORM ===
          <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Shipping Address"
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Delivery Method</h3>
                <select
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="standard">Standard (3-5 Days)</option>
                  <option value="express">Express (1-2 Days)</option>
                </select>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
              </div>
            </div>

            {/* Right Side - Cart Summary */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div>₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-6 pt-4 text-lg font-bold flex justify-between">
                <span>Total:</span>
                <span>₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Checkout;
