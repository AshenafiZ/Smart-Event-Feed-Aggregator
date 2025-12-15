import { formatDate, formatRelativeDate } from '../../utils/formatDate';
import { MapPinIcon, ExternalLinkIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const EventCard = ({ event }) => (
  <a
    href={event.url}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl border border-white/20 hover:border-emerald-400/50",
      "transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:bg-white/10"
    )}
  >
    {/* Image */}
    <div className={cn(
      "aspect-video rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
      "group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-all duration-500"
    )}>
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <MapPinIcon className="w-16 h-16 text-white/40" />
        </div>
      )}
    </div>
    
    {/* Content */}
    <div className="space-y-4">
      <div>
        <span className={cn(
          "inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide",
          "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 mb-4"
        )}>
          {formatRelativeDate(event.date)}
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-emerald-300 transition-colors line-clamp-2 mb-2">
          {event.title}
        </h3>
        <div className="flex items-center text-sm text-white/70 space-x-2">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span>{event.city || event.location}</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-white/20">
        <div className="flex items-center space-x-4 text-sm text-white/60">
          <span className="font-semibold text-emerald-400">{formatDate(event.date)}</span>
          <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs capitalize border border-white/20">
            {event.status}
          </span>
          <span className={cn(
            "px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-xs font-semibold rounded-lg border border-emerald-500/30",
            "text-emerald-300"
          )}>
            {event.source}
          </span>
        </div>
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group/link flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500",
            "hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl",
            "transition-all duration-300 transform hover:-translate-y-1"
          )}
        >
          <span>View Tickets</span>
          <ExternalLinkIcon className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  </a>
);

export default EventCard;
