import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import axios from 'axios';
import { useSearch } from "../context/SearchContext";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { searchQuery } = useSearch();
  const [activeTab, setActiveTab] = useState('orders');
  const [profilePic, setProfilePic] = useState('');
  const [showBodyStructure, setShowBodyStructure] = useState(false);
  const [bodyData, setBodyData] = useState({
    height: '',
    weight: '',
    waist: '',
    shoulder: '',
    chest: '',
    hip: '',
    footLength: '',
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { username: paramUsername } = useParams();
  const OriginalUser = "ankitchoudhary01"
  console.log('Searching Profile')
  // Choose: if searchQuery is present, use it; otherwise use route param
  const username = (searchQuery?.trim() || paramUsername ||"").toLowerCase();

  useEffect(() => {
    if (!username) {
      console.error('No username provided.');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}`);
        setUser(res.data);
        setProfilePic(res.data.profilePic || '');
        setBodyData(res.data.bodyData || {});
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]); // refetch if search changes

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-144 flex items-center justify-center">
          <p className="text-lg text-gray-600">Loading profile...</p>
        </div>
      </PageWrapper>
    );
  }

  if (!user) {
    return (
      <PageWrapper>
        <div className="min-h-144 flex items-center justify-center">
          <p className="text-lg text-gray-600">Please Login to view your profile.{" "}
            <a href="/login" className="text-pink-600 font-semibold hover:underline">
              Log in
            </a> </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className='min-h-screen h-auto w-auto bg-pink-200 p-6'>
        <div className="max-w-5xl mx-auto p-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white shadow-md p-6 pb-4 rounded-lg relative">
            <div className="relative">
              <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
              <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-full cursor-pointer text-xs">
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                📷
              </label>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  <p className="text-sm text-gray-600 mt-1">{user.bio}</p>
                  <p className="text-xs text-gray-400 mt-1">📍 {user.location} • Joined {user.joinDate}</p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-700">
                    <span>👥 {user.stats?.followers || 0} Followers</span>
                    <span>🔁 {user.stats?.following || 0} Following</span>
                    <span>📸 {user.stats?.posts || 0} Posts</span>
                  </div>
                </div>
                {OriginalUser === username ? (
                  <button className="bg-pink-600 text-white text-sm px-4 py-2 rounded hover:bg-pink-700">
                    Edit Profile
                  </button>
                ) : null}
              </div>

              {/* Social Media */}
              <div className="mt-2 flex gap-4 text-sm text-blue-500">
                {user.socials?.instagram && (
                  <a href={user.socials.instagram} target="_blank" rel="noopener noreferrer">📸 Instagram</a>
                )}
                {user.socials?.linkedin && (
                  <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a>
                )}
                {user.socials?.twitter && (
                  <a href={user.socials.twitter} target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
                )}
              </div>

              {/* Badges */}
              <div className="flex gap-2 mt-3">
                {user.badges?.map((badge, idx) => (
                  <span key={idx} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    🌟 {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Contents */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow min-h-full">
            {/* Tabs */}
            <div className="flex justify-around text-sm md:text-base mb-6">
              {['orders', 'wishlist', 'reviews', 'posts', 'vouchers'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`lg:px-4 px-1 py-2 rounded-md ${
                    activeTab === tab
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className='h-full text-center'>
            {/* Active Tab Content */}
            {activeTab === 'orders' && <p>Placed {user.stats?.orders || 0} orders.</p>}
            {activeTab === 'wishlist' && <p>Saved {user.stats.wishlist || 0} products.</p>}
            {activeTab === 'reviews' && <p>Wrote {user.stats.reviews || 0} reviews.</p>}
            {activeTab === 'posts' && <p>Shared {user.stats.posts || 0} experiences.</p>}
            {activeTab === 'vouchers' && <p>Saved {user.stats.vouchers || 0} vouchers.</p> || (
              <ul>
                {user.vouchers?.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            )}
          </div>
          </div>

          {/* Body Structure */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow relative">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Body Structure Details</h2>
              <button
                className={`text-sm text-red-500 transform transition-transform duration-300 ${
                  showBodyStructure ? 'rotate-180' : 'rotate-0'}`}
                onClick={() => setShowBodyStructure(!showBodyStructure)}>
                  {showBodyStructure ? '▲' : '▼'}
              </button>
            </div>

            {showBodyStructure && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(bodyData).map(([key, value]) => (
                    <div key={key}>
                      <div className="block text-s text-gray-600 capitalize pl-0 p-2">{key} : {value}</div>
                      
                    </div>
                  ))}
                </div>
                
              </>
            )}
          </div>

          {/* Settings */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Settings & Privacy</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>🔒 Privacy Options</li>
              <li>🏠 Manage Address</li>
              <li>💳 Payment Methods</li>
              <li>📲 Connected Accounts</li>
              <li>🔔 Notification Preferences</li>
              <li>🚪 Logout / Deactivate Account</li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default UserProfile;
