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
        const res = await fetch(`/api/event/getEvents?limit=6&sortField=createdAt`);
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
      const res=await fetch(`api/event/getEvents?startIndex=${startIndex}&sortField=createdAt`);
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
    <h1 className='text-3xl mt-5 font-bold'>New Events</h1>
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
   <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-lg py-7'>Show more</button>
    )
  }
  <div className='mx-auto flex flex-col items-center justify-center'>
  <p className='text-zinc-800 dark:text-slate-300 text-xl font-semibold '>Confused ? We have advanced search filters to help you attend Events aligned with your Schedules .</p>
  <Link className='' to="/search">
  <Button 
  className='mt-8 mb-16 hover:scale-125' 
  gradientDuoTone="pinkToOrange" 
  outline
  style={{
    transition: 'ease-in-out 0.3s',
    boxShadow: '0 0 5px #ff7f50, 0 0 5px #ff7f50, 0 0 5px #ff7f50, 0 0 10px #ff7f50'
  }}
  onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 0 10px #ff7f50, 0 0 10px #ff7f50, 0 0 10px #ff7f50, 0 0 20px #ff7f50'}
  onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 0 5px #ff7f50, 0 0 5px #ff7f50, 0 0 5px #ff7f50, 0 0 5px #ff7f50'}
>
  Try Now !
</Button>
  </Link>
</div>
  
 
</>
      ):(<p>Sorry But We Have No Upcoming Events right now !</p>)}
      
  
  </div>
  )
}

export default Events