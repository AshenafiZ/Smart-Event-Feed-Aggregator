// import { useQuery } from '@apollo/client/react';  
// import { GET_EVENTS } from '../graphql/queries';

// export const useEvents = ({ search = '', category = '' }) => {
//   const { loading, error, data } = useQuery(GET_EVENTS, {
//     variables: {
//       search: search.trim() || null,
//       category: category === 'All Categories' ? null : category,
//     },
//   });

//   const events = data?.events || [];

//   const filtered = events
//     .filter(event => {
//       if (!search.trim()) return true;
//       const term = search.toLowerCase();
//       return (
//         event.title.toLowerCase().includes(term) ||
//         event.description?.toLowerCase().includes(term)
//       );
//     })
//     .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

//   return { loading, error, events: filtered };
// };





// import { useQuery } from '@apollo/client';
// import { GET_EVENTS, GET_STATS } from '../graphql/queries';

// export const useEvents = (search = '', source = '', limit = 20) => {
//   const eventsQuery = useQuery(GET_EVENTS, {
//     variables: { search, source, limit: Number(limit) },
//     fetchPolicy: 'cache-and-network',  // ✅ Better caching
//   });

//   const statsQuery = useQuery(GET_STATS, {
//     fetchPolicy: 'cache-and-network',
//   });

//   return {
//     events: eventsQuery.data?.events || [],
//     stats: statsQuery.data?.stats,
//     loading: eventsQuery.loading || statsQuery.loading,
//     error: eventsQuery.error || statsQuery.error,
//     refetch: () => Promise.all([
//       eventsQuery.refetch(), 
//       statsQuery.refetch()
//     ]),
//     totalCount: statsQuery.data?.stats?.total || 0,
//   };
// };
import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS, GET_STATS } from '../graphql/queries';

export const useEvents = (search = '', category = '', source = '', limit = 20) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);
  const eventsQuery = useQuery(GET_EVENTS, {
    variables: { search: debouncedSearch, category, source, limit: Number(limit) },
    fetchPolicy: 'cache-and-network',
  });

  const statsQuery = useQuery(GET_STATS);

  return {
    events: eventsQuery.data?.events || [],
    stats: statsQuery.data?.stats,
    loading: eventsQuery.loading || statsQuery.loading,
    error: eventsQuery.error || statsQuery.error,
    refetch: () => Promise.all([eventsQuery.refetch(), statsQuery.refetch()]),
    totalCount: statsQuery.data?.stats?.total || 0,
  };
};
