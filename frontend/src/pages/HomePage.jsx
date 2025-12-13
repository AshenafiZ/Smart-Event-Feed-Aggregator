// import { useState } from 'react';
// import SearchBar from '../components/SearchBar';
// import FilterPanel from '../components/FilterPanel';
// import EventList from '../components/EventList';
// import { useEvents } from '../hooks/useEvents';

// export default function HomePage() {
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('All Categories');
//   const { loading, error, events } = useEvents({ search, category });

//   return (
//     <div className="space-y-12">
//       <div className="text-center">
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
//           Tech Events Dashboard
//         </h1>
//         <p className="text-xl text-gray-600">
//           Find hackathons, conferences, meetups & webinars
//         </p>
//       </div>

//       <div className="max-w-4xl mx-auto space-y-6">
//         <SearchBar value={search} onChange={setSearch} />
//         <FilterPanel category={category} onChange={setCategory} />
//       </div>

//       <EventList events={events} loading={loading} error={error}/>
//     </div>
//   );
// }





// import { useEffect, useState } from 'react';
// import { useEvents } from '../hooks/useEvents';
// import SearchBar from '../components/SearchBar';
// import FilterPanel from '../components/FilterPanel';
// import EventList from '../components/EventList';

// const HomePage = () => {
//   const [search, setSearch] = useState('');
//   const [source, setSource] = useState('');
//   const { events, stats, loading, refetch, totalCount } = useEvents(search, source);

//   const handleSearch = (query) => {
//     setSearch(query);
//     refetch({ search: query, source });
//   };

//   const handleSourceChange = (newSource) => {
//     setSource(newSource);
//     refetch({ search, source: newSource });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
        // {/* Header */}
        // <div className="text-center mb-20">
        //   <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
        //     EventFlow
        //   </h1>
        //   <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        //     Discover amazing tech meetups, hackathons, webinars, and conferences near you.
        //   </p>
        // </div>

        // {/* Search */}
        // <SearchBar onSearch={handleSearch} />

//         {/* Filters */}
//         <FilterPanel
//           source={source}
//           onSourceChange={handleSourceChange}
//           totalCount={totalCount}
//           stats={stats}
//         />

//         {/* Events */}
//         <div className="mt-20">
//           <EventList events={events} loading={loading} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import EventList from '../components/EventList';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Fully Responsive */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 leading-tight">
            EventFlow
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
            Discover amazing tech meetups, hackathons, webinars, and conferences near you.
          </p>
        </div>

        {/* Search - Mobile Full Width */}
        <div className="w-full mb-6 sm:mb-8 md:mb-12 max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filters - Responsive Grid */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <FilterPanel
            category={category}
            source={source}
            onCategoryChange={handleCategoryChange}
            onSourceChange={handleSourceChange}
            totalCount={totalCount}
            stats={stats}
          />
        </div>

        {/* Events Grid - Perfect Responsive */}
        <div className="space-y-6 sm:space-y-8">
          <EventList events={events} loading={loading} />
          
          {/* Load More / No Results - Mobile Optimized */}
          {events.length === 0 && !loading && (
            <div className="text-center py-16 px-4 sm:px-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3">No events found</h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                Try adjusting your search or filters to discover more events.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
