import { Link } from 'react-router-dom';
import { ImLocation } from "react-icons/im";
export default function PostCard({ event }) {


    function convertTo12Hour(time) {
        // If time already contains 'AM' or 'PM', return it as is
        if (time.includes('AM') || time.includes('PM')) {
          return time;
        }
      
        // Otherwise, convert time to 12-hour format
        const [hours, minutes] = time.split(':');
        const hoursIn12HourFormat = (hours % 12) || 12;
        const period = hours < 12 ? ' AM' : ' PM';
        return hoursIn12HourFormat + ':' + minutes + period;
      }





    function getOrdinalSuffix(date) {
        const day = date.getDate();
        if (day % 10 === 1 && day !== 11) {
          return day + 'st';
        } else if (day % 10 === 2 && day !== 12) {
          return day + 'nd';
        } else if (day % 10 === 3 && day !== 13) {
          return day + 'rd';
        } else {
          return day + 'th';
        }
      }
    








  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link  to={`/event/${event.slug}`}>
        <img
          src={event.image}
          alt='post cover'
          className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
       <p className='text-xl font-semibold line-clamp-2'>{event.title}</p>
       

        
       <div className='flex justify-between w-full'>
        
        <span className='text-md'>
{
  event && (() => {
    const date = new Date(event.date);
    const dayWithSuffix = getOrdinalSuffix(date);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return `${dayWithSuffix} ${monthYear}`;
  })()
}
</span>

<span className='italic text-lg'>{event&&convertTo12Hour(event.time)}</span>
</div>
<div className='flex gap-2'>
  <span className=' text-lg'> {event.location}</span><ImLocation  size={25} className=' hover:text-green-500 transition duration-100'/>
        
</div>   

        <Link
          to={`/event/${event.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
         Know more
        </Link>
      </div>
    </div>
  );
}