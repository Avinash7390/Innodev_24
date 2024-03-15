import React from 'react';
import { useParams , Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import { Spinner,Button} from 'flowbite-react';
import { FaTicketAlt } from "react-icons/fa";


const EventPage = () => {
  const { eventSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [event, setEvent] = useState([]);


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



  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/event/getEvents?slug=${eventSlug}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setEvent(data.event[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventSlug]);

  if (loading) 
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner className='w-12 h-12' />
    </div>
  );


  
    
  
  
  return (
    <main className='  p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>

<h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{event&&event.title}</h1>
<Link to={`/search?location=${event&&event.location}`} className='self-center mt-3'>
<Button color='gray' pill size='xs'>{event&&event.location}</Button>
</Link>


<img src={event&&event.image} alt={event&&event.title} className='self-center object-cover w-[70%] h-[400px] xl:max-w-300px max-h-300px p-3 mt-10' />
 
<div className='flex justify-between p-3 border-b border-slate-500 w-full max-w-2xl text-xs mx-auto'>
<span>{event&&new Date(event.date).toISOString().slice(0, 10)}</span>

<span className='italic'>{event&&convertTo12Hour(event.time)}</span>
</div>


<div className='p-3 w-[70%] mx-auto post-content   flex-wrap ' dangerouslySetInnerHTML={{__html:event&&event.content}}></div>
<div className='flex gap-4 justify-center mt-4'>
<FaTicketAlt className="hover:rotate-90 transform duration-200 my-auto "  size={30} />
{event && event.tickets.map((ticket, index) => (
  <Button className='max-w-[100px] p-1 ' key={index} color='gray' pill size='xs'>
    {ticket.label}
  </Button>
))}
</div>
<div className='justify-center flex w-full mt-24'>
<Button color='green' pill size='lg'>Register</Button>
</div>

    </main>
  );
};

export default EventPage;
