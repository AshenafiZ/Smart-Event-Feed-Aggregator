import { RefreshCw, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';

const Footer = ({ 
  totalCount = 0, 
  loading = false, 
  onRefresh, 
  stats = {} 
}) => (
  <footer className="mt-24 pt-16 pb-12 border-t border-white/10 bg-black/20 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      {/* Stats Row */}
      <div className="mb-8">
        <p className="text-2xl sm:text-3xl md:text-4xl font-black text-emerald-400 mb-4">
          {totalCount.toLocaleString()} Events Found
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60 mb-6">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Live from Eventbrite + Ticketmaster
          </span>
          <span>• Updated {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Sources Stats */}
      {stats?.bySource && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto">
          {stats.bySource.slice(0, 4).map((s) => (
            <div key={s._id} className="group p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <p className="text-2xl font-black text-white">{s.count}</p>
              <p className="text-xs uppercase text-emerald-300 font-semibold mt-1 tracking-wide">
                {s._id}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={onRefresh}
        disabled={loading}
        className={cn(
          "inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-500",
          "hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-lg rounded-3xl shadow-2xl",
          "hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 transform",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        )}
      >
        <RefreshCw className={cn("h-5 w-5", loading && "animate-spin")} />
        {loading ? 'Refreshing...' : 'Load Fresh Events'}
      </button>

      {/* Copyright */}
      <p className="mt-8 text-xs text-white/30 tracking-wide">
        © 2025 Ashenafi Zewdie. Aggregating events worldwide.
      </p>
    </div>
  </footer>
);

export default Footer;
