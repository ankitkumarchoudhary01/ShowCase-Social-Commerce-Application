import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className=" p-8">
      <div className="max-w-5xl bg-white"><h1 className="text-2xl font-bold mb-4">My Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping</Link></p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>₹{item.price}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-16 mt-1 border p-1"
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  />
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:underline">
                Remove
              </button>
            </div>
          ))}
          <div className="text-right font-semibold text-xl">
            Total: ₹{total}
          </div>
          <Link to="/checkout" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Proceed to Checkout
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default CartPage;
