import { cn } from '../../utils/cn';

const LoadingSpinner = ({ message = "Loading events..." }) => (
  <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
    <div className={cn(
      "animate-spin rounded-full h-16 w-16",
      "border-4 border-emerald-500/20 border-t-emerald-500 shadow-xl",
      "drop-shadow-lg"
    )}></div>
    <p className="mt-6 text-xl font-semibold text-emerald-400 animate-pulse tracking-wide">
      {message}
    </p>
  </div>
);

export default LoadingSpinner;
