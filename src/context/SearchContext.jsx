import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const location = useLocation();
  const [searchHistory, setSearchHistory] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Load stored search value when route changes
  useEffect(() => {
    const savedQuery = searchHistory[location.pathname] || '';
    setSearchQuery(savedQuery);
  }, [location.pathname]);

  // Update history when search changes
  useEffect(() => {
    setSearchHistory((prev) => ({
      ...prev,
      [location.pathname]: searchQuery,
    }));
  }, [searchQuery, location.pathname]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
