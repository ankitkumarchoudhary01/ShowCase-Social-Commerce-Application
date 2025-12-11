import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  if (!cartItems || cartItems.length === 0) {
  return (
    <PageWrapper>
    <div className="w-screen h-144 flex items-center justify-center bg-gradient-to-r from-white via-green-100 to-white p-2">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-xl text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">🛒 Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven’t added anything yet.</p>
        <Link
          to="/shop"
        >
          <div className="inline-block bg-pink-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-pink-700 transition">Continue Shopping</div>
        </Link>
      </div>
    </div>
    </PageWrapper>
  );
}


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <PageWrapper>
    <div className="min-h-screen p-8 pt-1 bg-pink-200">
      <div className='p-6 h-full max-w-4xl mx-auto bg-white shadow-md mt-10 rounded'>
      <h2 className="text-4xl font-bold text-gray-800 mb-8">🛍️ Your Cart</h2>

      <div className="space-y-6 ">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-between rounded-xl shadow-md p-4 bg-pink-50"
          >
            <div className="flex items-center gap-4 w-full md:w-1/2">
              <img
                src={item.image} // fallback image
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm">Price: ₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center mt-4 md:mt-0 gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-200 rounded-l text-xl hover:bg-gray-300"
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="px-4 font-semibold text-gray-400">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded-r text-xl hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="text-right mt-4 md:mt-0 md:text-left">
              <p className="text-gray-800 font-medium">Subtotal: ₹{item.price * item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <p className="text-2xl font-bold text-gray-800">Total: ₹{total}</p>
        <Link
          to="/checkout"
          className="inline-block mt-4 bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Proceed to Checkout
        </Link>
      </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Cart;
