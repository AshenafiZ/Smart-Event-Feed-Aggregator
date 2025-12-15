import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../utils/cn';
import SearchBar from '../components/ui/SearchBar';
import FilterPanel from '../components/ui/FilterPanel';
import EventList from '../components/ui/EventList';
import Footer from '../components/ui/Footer';
import { useEvents } from '../hooks/useEvents';

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');

  const { events, stats, loading, refetch, totalCount } = useEvents(search, category, source);

  useEffect(() => {
    refetch({ search: '', category: '', source: '' });
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    refetch({ search: query, category, source });
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    refetch({ search, category: newCategory, source });
  };

  const handleSourceChange = (newSource) => {
    setSource(newSource);
    refetch({ search, category, source: newSource });
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-slate-900 via-black to-emerald-900",
      "py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    )}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight">
            EventFlow
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/70 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
            Discover amazing tech meetups, hackathons, webinars, and conferences near you.
          </p>

          {/* Refresh Button */}
          <button
            onClick={() => refetch({ search, category, source })}
            disabled={loading}
            className={cn(
              "mt-8 sm:mt-12 inline-flex items-center gap-3 px-8 py-4",
              "bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white font-semibold",
              "hover:bg-white/20 hover:border-white/40 hover:shadow-2xl transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
            )}
          >
            <RefreshCw className={cn("h-5 w-5", loading && "animate-spin")} />
            {loading ? 'Refreshing...' : 'Refresh Events'}
          </button>
        </div>

        {/* Search */}
        <div className="w-full mb-12 lg:mb-16 max-w-5xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filters */}
        <div className="mb-12 lg:mb-20">
          <FilterPanel
            category={category}
            source={source}
            onCategoryChange={handleCategoryChange}
            onSourceChange={handleSourceChange}
            totalCount={totalCount}
            stats={stats}
          />
        </div>

        {/* Events Grid */}
        <div className="space-y-8 lg:space-y-12">
          <EventList events={events} loading={loading} />

          {events.length === 0 && !loading && (
            <div className="text-center py-20 px-4 sm:px-6">
              <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl border-2 border-emerald-500/30 flex items-center justify-center mb-8 shadow-xl mx-auto">
                <RefreshCw className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-lg">
                No events found
              </h3>
              <p className="text-lg sm:text-xl text-white/60 max-w-lg mx-auto leading-relaxed">
                Try adjusting your search or filters to discover more events.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer
        totalCount={totalCount}
        stats={stats}
        loading={loading}
        onRefresh={() => refetch({ search, category, source })}
      />
    </div>
  );
};

export default HomePage;
