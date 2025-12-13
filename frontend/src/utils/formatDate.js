// export const formatDate = (dateString) => {
//   return new Date(dateString).toLocaleDateString('en-US', {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit',
//   });
// };

// export const formatShortDate = (dateString) => {
//   return new Date(dateString).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//   });
// };

// export const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     weekday: 'short',
//     month: 'short',
//     day: 'numeric',
//     year: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//   });
// };

// export const formatRelativeDate = (dateString) => {
//   const now = new Date();
//   const eventDate = new Date(dateString);
//   const diff = eventDate - now;

//   if (diff < 0) return 'Past';
//   if (diff < 24 * 60 * 60 * 1000) return 'Tomorrow';
//   if (diff < 7 * 24 * 60 * 60 * 1000) return 'This Week';
//   return 'Upcoming';
// };


export const formatDate = (dateString) => {
  if (!dateString) return 'Date TBD';
  
  // Handle multiple date formats from Ticketmaster/Eventbrite
  let date;
  if (typeof dateString === 'string') {
    // ISO string or YYYY-MM-DD
    date = new Date(dateString);
  } else if (dateString._bsontype === 'Date') {
    date = dateString; // MongoDB Date object
  }
  
  // Fallback if still invalid
  if (isNaN(date.getTime())) {
    return 'Date TBD';
  }
  
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC'
  });
};

export const formatRelativeDate = (dateString) => {
  if (!dateString) return 'Upcoming';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Upcoming';
  
  const now = new Date();
  const diff = date - now;
  
  if (diff < 0) return 'Past';
  if (diff < 24 * 60 * 60 * 1000) return 'Tomorrow';
  if (diff < 7 * 24 * 60 * 60 * 1000) return 'This Week';
  return 'Upcoming';
};
