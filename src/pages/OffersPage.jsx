// src/pages/OffersPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferCard from '../components/OfferCard';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/PageWrapper';

function OffersPage() {
  const { searchQuery } = useSearch();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("offers fetched");

  // Fetch data from backend
  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/offers");

      // If backend returns { posts: [...] }
      const newOffers = res.data.posts || res.data;

      if (Array.isArray(newOffers)) {
        setOffers(newOffers);
      } else {
        console.error("API did not return an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

const filteredOffers = searchQuery.trim() === ""
  ? offers
  : offers.filter((offer) =>
      offer.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.type?.toLowerCase().includes(searchQuery.toLowerCase())
    );


  return (
    <PageWrapper>
      <div className="min-h-screen h-auto w-auto bg-pink-200 p-6">
        <h2 className="text-5xl font-bold text-center mb-6 text-pink-600">
          Offers Vault
        </h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading offers...</div>
        ) : filteredOffers.length === 0 ? (
          <div className="min-h-screen w-screen text-center py-20 text-xl font-semibold text-gray-600">
            🔍 No Vouchers found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <OfferCard key={offer._id} offer={offer} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default OffersPage;
