import { CATEGORIES, SOURCES } from '../../utils/constants';
import { cn } from '../../utils/cn';
import { Filter, Database, Users } from 'lucide-react';

const FilterPanel = ({ category, source, onCategoryChange, onSourceChange, totalCount, stats }) => (
  <div className={cn(
    "bg-black/40 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 sticky top-6 z-10",
    "hover:shadow-emerald-500/25 transition-all duration-300"
  )}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
      {/* Category Filter */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3">
          <Filter className="h-4 w-4" />
          Category
        </label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={cn(
            "w-full p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl text-white shadow-lg",
            "focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 focus:outline-none",
            "hover:border-white/30 hover:shadow-emerald-500/20 transition-all duration-200"
          )}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      
      {/* Source Filter */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-white/80 mb-3">
          <Database className="h-4 w-4" />
          Source
        </label>
        <select
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          className={cn(
            "w-full p-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl text-white shadow-lg",
            "focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 focus:outline-none",
            "hover:border-white/30 hover:shadow-emerald-500/20 transition-all duration-200"
          )}
        >
          {SOURCES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      
      {/* Stats */}
      <div className="lg:col-span-2 xl:col-span-2">
        <div className={cn(
          "grid grid-cols-3 h-24 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10",
          "rounded-3xl shadow-xl border border-emerald-500/20 backdrop-blur-xl"
        )}>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-3xl font-black text-emerald-400 mb-1">{totalCount}</p>
            <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">Total Events</p>
          </div>
          {stats?.bySource?.map((s, i) => (
            <div key={s._id} className={cn(
              "text-center p-3 flex flex-col items-center justify-center",
              "border-l border-white/10 first:border-l-0 hover:bg-white/10 rounded-lg transition-all"
            )}>
              <p className="font-bold text-white text-xl">{s.count}</p>
              <p className="text-xs text-white/60 capitalize font-medium mt-1">{s._id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FilterPanel;
