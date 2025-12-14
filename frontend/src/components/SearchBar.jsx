import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search events..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl bg-white shadow-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg placeholder-gray-400"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-6 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-r-2xl shadow-lg transition-all duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
