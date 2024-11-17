export const formatDate = (date: string | number | Date): string => {
  const newDate = new Date(date);

  // Ensure the date is valid
  if (isNaN(newDate.getTime())) {
    throw new Error('Invalid date');
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = newDate.toLocaleDateString(undefined, options);
  const formattedTime = newDate.toLocaleTimeString(undefined, timeOptions);

  return `${formattedDate} at ${formattedTime}`;
};
