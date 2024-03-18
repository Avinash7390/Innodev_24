import React from 'react'
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
const Events = () => {

 
  const [loading, setLoading] = useState(true);
  const [showMore,setShowMore]=useState(true);
  const [userEvents,setUserEvents]=useState([]);

  



  useEffect(() => {
    try {
      setLoading(true);
      const fetchRecentEvents = async () => {
        const res = await fetch(`/api/event/getEvents?limit=6&sort=-createdAt`);
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          setUserEvents(data.event)
          
          setLoading(false);
          if(data.event.length<6){
            setShowMore(false);
         
          }
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





  const handleShowMore=async()=>{
    const startIndex=userEvents.length;
    try{
      const res=await fetch(`api/event/getEvents?startIndex=${startIndex}`);
      const data=await res.json();
      if(res.ok){
        setUserEvents((prev)=>[...prev,...data.event]);
        if( data.event.length < 9){
  
          setShowMore(false);
  
        }
      }
    } catch(error)
    {
      console.log(error.message);
    }
  }


  if (loading)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  );











  return (
    <div className=''> 
  
  {userEvents.length>0?(
<>
<div className='flex flex-col justify-center items-center mb-5'>
    <h1 className='text-xl mt-5'>New Events</h1>
    <motion.div className='flex flex-wrap gap-5 mt-5 justify-center transition-all duration-1000'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
      {userEvents &&
        userEvents.map((event) => <EventCard key={event._id} event={event} />)}
    </motion.div>
  </div>
{
    showMore&&(
   <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show more</button>
    )
  }
  <div className='flex flex-col  mx-auto'><p className='text-slate-300 mx-auto '>Confused ? We have advanced search filters to help you attend Events aligned with your Schedules .</p>  <Link to="/search" ><Button className='ml-4 mt-8 mb-16 self-center mx-auto'  gradientDuoTone="pinkToOrange" outline>
            Try Now
          </Button></Link></div>
  
 
</>
      ):(<p>Sorry But We Have No Upcoming Events right now !</p>)}
      
  
  </div>
  )
}

export default Events