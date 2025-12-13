// export default function EmptyState() {
//   return (
//     <div className="text-center py-20">
//       <div className="text-6xl mb-4">🔍</div>
//       <h3 className="text-2xl font-semibold text-gray-700 mb-2">No events found</h3>
//       <p className="text-gray-500">Try changing your search or filters</p>
//     </div>
//   );
// }

const EmptyState = ({ message = "No events found", action }) => (
  <div className="text-center py-20 px-8">
    <div className="mx-auto w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-6">
      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{message}</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      Try adjusting your search or filters to find more events.
    </p>
    {action}
  </div>
);

export default EmptyState;
