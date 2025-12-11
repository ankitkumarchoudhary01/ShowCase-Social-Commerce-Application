import React, { useState } from 'react';

function OfferCard({ offer }) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  
  return (
    <div className="relative w-full flex flex-col justify-between max-w-3xl mx-auto bg-white border-2 border-purple-300 hover:border-purple-600 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">

      {/* Show More/Hide Button */}
      <button
        onClick={toggleDetails}
        className="h-8 absolute top-2 right-4 text-sm text-black z-10 flex items-center justify-center "
      >
        {showDetails ? '▲' : '▼'}
      </button>


      {/* Top section: Image + Main Info */}
      <div className="flex p-4 pb-5 bg-gradient-to-br from-white to-pink-50">
        {/* Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={offer.image}
            alt={offer.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="ml-4 flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-pink-700">{offer.title}</h2>
          <p className="text-sm text-gray-700 mt-1">{offer.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-pink-100 text-pink-800 font-mono text-sm px-3 py-1 rounded-full">
              {offer.code}
            </span>
            <button
              onClick={handleCopy}
              className="text-sm bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Slide-in Panel */}
      <div
        className={`absolute bottom-0 left-0 w-full px-4 py-3 bg-white/95 backdrop-blur-md border-t border-pink-200 transform transition-transform duration-500 ease-in-out ${
          showDetails ? 'translate-y-0' : 'translate-y-30'
        }`}
      >
        <div className="grid grid-cols-2 text-sm text-gray-700 gap-y-1">
          <p><span className="font-medium">Min Cart:</span> ₹{offer.minCartValue}</p>
          <p><span className="font-medium">Category:</span> {offer.category}</p>
          <p><span className="font-medium">Expires:</span> {offer.validity}</p>
          <div className="col-span-2">
            <details>
              <summary className="text-pink-600 cursor-pointer hover:underline">Terms & Conditions</summary>
              <p className="text-xs text-gray-600 mt-1">{offer.conditions}</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;
