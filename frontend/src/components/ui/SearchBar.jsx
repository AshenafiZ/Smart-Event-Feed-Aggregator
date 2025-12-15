import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const SearchBar = ({ onSearch, placeholder = "Search events..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
      <div className="relative">
        <Search className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none h-5 w-5 text-emerald-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full pl-12 pr-12 py-5 border border-white/20 rounded-3xl bg-black/30 backdrop-blur-xl shadow-xl",
            "focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 focus:outline-none",
            "transition-all duration-300 text-lg placeholder:text-white/50 text-white",
            "hover:border-white/30 hover:shadow-emerald-500/20"
          )}
        />
        {query && (
          <X 
            className="absolute inset-y-0 right-12 flex items-center px-3 text-white/60 hover:text-white cursor-pointer transition-colors h-5 w-5"
            onClick={handleClear}
          />
        )}
        <button
          type="submit"
          className={cn(
            "absolute inset-y-0 right-0 px-8 flex items-center bg-gradient-to-r from-emerald-500 to-teal-500",
            "hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-r-3xl shadow-xl",
            "hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
