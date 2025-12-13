// import { formatShortDate } from '../utils/formatDate';

// export default function EventCard({ event }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
//       <div className="p-6 flex-1 flex flex-col">
//         <div className="flex justify-between mb-4">
//           <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
//             {event.source}
//           </span>
//           <span className="text-sm text-gray-500">{event.category}</span>
//         </div>

//         <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
//           {event.title}
//         </h3>

//         <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
//           {event.description || 'No description available.'}
//         </p>

//         <div className="space-y-2 mt-auto">
//           <p className="text-sm text-gray-700">📅 {formatShortDate(event.startDate)}</p>
//           <p className="text-sm text-gray-700">📍 {event.location}</p>
//         </div>

//         <a
//           href={event.url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-6 block text-center bg-primary text-white font-bold py-3 rounded-lg hover:bg-indigo-600 transition"
//         >
//           View Event →
//         </a>
//       </div>
//     </div>
//   );
// }

import { formatDate, formatRelativeDate } from '../utils/formatDate';
import { LinkIcon } from '@heroicons/react/24/outline';

const EventCard = ({ event }) => (
  <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl border border-white/50 hover:border-indigo-200/50 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
    <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-indigo-50 group-hover:to-purple-50 transition-all duration-500">
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      )}
    </div>
    
    <div className="space-y-4">
      <div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 mb-4">
          {formatRelativeDate(event.date)}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
          {event.title}
        </h3>
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.city || event.location}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="font-semibold text-gray-900">{formatDate(event.date)}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs capitalize">{event.status}</span>
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-xs font-medium text-indigo-800 rounded-lg">
            {event.source}
          </span>
        </div>
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <span>View Tickets</span>
          <LinkIcon className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </div>
);

export default EventCard;
