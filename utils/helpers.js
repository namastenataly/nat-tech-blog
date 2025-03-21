module.exports = {
  // Format date to 'HH:MM:SS AM/PM'
  format_time: (date) => {
    if (!date) return ''; // Handle cases where date might be undefined or null
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(new Date(date));
  },
  
  // Format date to 'DD/MM/YYYY'
  format_date: (date) => {
    if (!date) return ''; // Handle cases where date might be undefined or null
    return new Intl.DateTimeFormat('en-GB').format(new Date(date));
  },
};