import { CalendarX2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const EmptyState = ({ message = "No events found", action }) => (
  <div className="text-center py-24 px-8 col-span-full">
    <div className="mx-auto w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-4 border-emerald-500/20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl backdrop-blur-sm">
      <CalendarX2 className="w-16 h-16 text-emerald-400 drop-shadow-lg" />
    </div>
    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight drop-shadow-md">
      {message}
    </h3>
    <p className="text-xl md:text-2xl text-white/60 mb-8 max-w-lg mx-auto leading-relaxed drop-shadow-sm">
      Try adjusting your search or filters to discover more events near you.
    </p>
    {action}
  </div>
);

export default EmptyState;
