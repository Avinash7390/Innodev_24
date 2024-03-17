import React from 'react'
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import EventCard from '../components/EventCard';
const Events = () => {

 
  const [loading, setLoading] = useState(true);
 
  

  const [recentEvents, setRecentEvents] = useState(null);



  useEffect(() => {
    try {
      setLoading(true);
      const fetchRecentEvents = async () => {
        const res = await fetch(`/api/event/getEvents`);
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setRecentEvents(data.event);
          setLoading(false);
        }
         
    if(!res.ok)
    {
      setLoading(false);
      return;
    }
      };
      fetchRecentEvents();
    } catch (error) {
      console.log(error.message);
    }
  }, []);


  if (loading)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  );











  return (
    <div> <div className='flex flex-col justify-center items-center mb-5'>
    <h1 className='text-xl mt-5'>Upcoming Events</h1>
    <div className='flex flex-wrap gap-5 mt-5 justify-center'>
      {recentEvents &&
        recentEvents.map((event) => <EventCard key={event._id} event={event} />)}
    </div>
  </div></div>
  )
}

export default Events