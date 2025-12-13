// import { CATEGORIES } from '../utils/constants';

// export default function FilterPanel({ category, onChange }) {
//   return (
//     <select
//       value={category}
//       onChange={(e) => onChange(e.target.value)}
//       className="px-6 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/30"
//     >
//       {CATEGORIES.map(cat => (
//         <option key={cat} value={cat}>{cat}</option>
//       ))}
//     </select>
//   );
// }
// import { SOURCES } from '../utils/constants';

// const FilterPanel = ({ source, onSourceChange, totalCount, stats }) => (
//   <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 sticky top-6">
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div>
//         <label className="block text-sm font-semibold text-gray-700 mb-3">Source</label>
//         <select
//           value={source}
//           onChange={(e) => onSourceChange(e.target.value)}
//           className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-md"
//         >
//           {SOURCES.map((s) => (
//             <option key={s.value} value={s.value}>{s.label}</option>
//           ))}
//         </select>
//       </div>
      
//       <div className="md:col-span-2">
//         <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
//           <div>
//             <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
//             <p className="text-sm text-gray-600">Total Events</p>
//           </div>
//           {stats?.bySource?.map((s) => (
//             <div key={s._id} className="text-right">
//               <p className="font-semibold text-gray-900">{s.count}</p>
//               <p className="text-xs text-gray-500 capitalize">{s._id}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default FilterPanel;


import { CATEGORIES, SOURCES } from '../utils/constants';

const FilterPanel = ({ category, source, onCategoryChange, onSourceChange, totalCount, stats }) => (
  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 sticky top-6 z-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white shadow-md"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
      
      {/* Source Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Source</label>
        <select
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white shadow-md"
        >
          {SOURCES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
      
      {/* Stats */}
      <div className="lg:col-span-2 xl:col-span-2">
        <div className="grid grid-cols-2 h-20 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-md">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
            <p className="text-xs text-gray-600">Total Events</p>
          </div>
          {stats?.bySource?.map((s, i) => (
            <div key={s._id} className={`text-center p-2 ${i === 0 ? 'border-l-2 border-indigo-200' : ''}`}>
              <p className="font-bold text-indigo-600">{s.count}</p>
              <p className="text-xs text-gray-500 capitalize">{s._id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FilterPanel;
