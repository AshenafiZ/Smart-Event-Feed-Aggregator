import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { cn } from '../../utils/cn';

const EventList = ({ events, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <EmptyState message="Failed to load events" />;
  
  // Filter out null/undefined events and ensure they have eventId (UNCHANGED)
  const validEvents = (events || []).filter(event => 
    event && event.eventId
  );

  if (validEvents.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4",
      "gap-6 lg:gap-8"
    )}>
      {validEvents.map(event => (
        <EventCard key={event.eventId} event={event} />
      ))}
    </div>
  );
};

export default EventList;
