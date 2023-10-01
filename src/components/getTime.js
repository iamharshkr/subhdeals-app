//get time elapsed
function getTime(date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) > 1
      ? Math.floor(interval) + ' years'
      : Math.floor(interval) + ' year';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) > 1
      ? Math.floor(interval) + ' months'
      : Math.floor(interval) + ' month';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) > 1
      ? Math.floor(interval) + ' days'
      : Math.floor(interval) + ' day';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) > 1
      ? Math.floor(interval) + ' hours'
      : Math.floor(interval) + ' hour';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) > 1
      ? Math.floor(interval) + ' minutes'
      : Math.floor(interval) + ' minute';
  }
  return Math.floor(interval) > 1
    ? Math.floor(interval) + ' seconds'
    : Math.floor(interval) + ' second';
}

export default getTime;
