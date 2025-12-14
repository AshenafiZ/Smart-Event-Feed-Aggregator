import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EVENTS, GET_STATS } from '../graphql/queries';

export const useEvents = (search = '', category = '', source = '', limit = 20) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);
  
  // Convert empty strings to undefined (not null) for GraphQL
  // undefined means the parameter is not provided, which is what we want for "All Categories"
  const queryVariables = useMemo(() => {
    const vars = {
      limit: Number(limit)
    };
    
    // Only include non-empty values
    if (debouncedSearch && debouncedSearch.trim()) {
      vars.search = debouncedSearch.trim();
    }
    if (category && category.trim()) {
      vars.category = category.trim();
    }
    if (source && source.trim()) {
      vars.source = source.trim();
    }
    
    console.log('🔍 Query Variables:', vars); // DEBUG
    return vars;
  }, [debouncedSearch, category, source, limit]);
  
  const eventsQuery = useQuery(GET_EVENTS, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network', 
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all', 
  });

  const statsQuery = useQuery(GET_STATS, {
    fetchPolicy: 'cache-and-network',
  });

  // Debug logging
  useEffect(() => {
    console.log('📊 Events Query State:', {
      loading: eventsQuery.loading,
      error: eventsQuery.error,
      data: eventsQuery.data,
      eventsCount: eventsQuery.data?.events?.length || 0,
      variables: queryVariables
    });
  }, [eventsQuery.loading, eventsQuery.data, eventsQuery.error, queryVariables]);

  // Filter out null/undefined events and ensure they have required fields
  const events = useMemo(() => {
    const rawEvents = eventsQuery.data?.events || [];
    return rawEvents.filter(event => 
      event && 
      event.eventId && 
      event.title
    );
  }, [eventsQuery.data]);

  return {
    events: events,
    stats: statsQuery.data?.stats,
    loading: eventsQuery.loading || statsQuery.loading,
    error: eventsQuery.error || statsQuery.error,
    refetch: async () => {
      const results = await Promise.all([
        eventsQuery.refetch(queryVariables),
        statsQuery.refetch()
      ]);
      return results;
    },
    totalCount: statsQuery.data?.stats?.total || 0,
  };
};
