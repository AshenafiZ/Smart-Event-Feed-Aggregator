// import EventCard from './EventCard';
// import LoadingSpinner from './LoadingSpinner';
// import EmptyState from './EmptyState';

// export default function EventList({ events, loading, error }) {
//   // Force show debug info always
//   return (
//     <div className="p-8 bg-red-50 border border-red-300 rounded-lg">
//       <h2 className="text-2xl font-bold text-red-800 mb-4">Debug Info (remove later)</h2>
//       <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
//         Loading: {String(loading)} {'\n'}
//         Error: {error ? error.message : 'None'} {'\n'}
//         Events count: {events.length} {'\n'}
//         {error && `Full error: ${JSON.stringify(error, null, 2)}`}
//       </pre>

//       {loading && events.length === 0 && <LoadingSpinner />}

//       {error && (
//         <div className="mt-8 text-center">
//           <div className="text-6xl mb-4">⚠️</div>
//           <h3 className="text-3xl font-bold text-red-600 mb-4">Connection Failed</h3>
//           <p className="text-lg text-gray-700 max-w-md mx-auto">
//             Cannot reach the backend server.<br />
//             Make sure your Node.js backend is running on <strong>http://localhost:5000</strong>
//           </p>
//           <p className="mt-4 text-sm text-gray-500">
//             Error details: {error.message}
//           </p>
//         </div>
//       )}

//       {!error && events.length === 0 && <EmptyState />}

//       {!error && events.length > 0 && (
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {events.map(event => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import EventCard from './EventCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const EventList = ({ events, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <EmptyState message="Failed to load events" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {events.map(event => <EventCard key={event.eventId} event={event} />)}
    </div>
  );
};

export default EventList;
