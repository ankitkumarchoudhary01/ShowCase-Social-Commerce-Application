import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className=" w-70 h-90 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-500">{product.brand}</p>
          <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
