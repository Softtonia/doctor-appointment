export const convertDate = (props) =>{
    const dt = new Date(props);
    const formatted = dt.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return formatted
 }


export const convertToAMPM = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const time = `${(hours % 12) || 12}:${minutes} ${(hours >= 12) ? 'PM' : 'AM'}`;
  return time;
}


export const reverseToAMPM = (timeString) => {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}
