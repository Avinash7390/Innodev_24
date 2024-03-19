import React from 'react'
import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../components/EventCard';
import Select from 'react-select';
import CalendarViewBg from "/CalendarView.jpg"
import { set } from 'mongoose';
const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

const CalendarView = () => {

 
  const [loading, setLoading] = useState(true);
  const [showMore,setShowMore]=useState(true);
  const [userEvents,setUserEvents]=useState([]);
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());

  const handleMonthChange = (selectedOption) => {
    
    setSelectedMonth(selectedOption.value);
    
  };
  


  useEffect(() => {
    try {
      setLoading(true);
      const fetchRecentEvents = async () => {
        const res = await fetch(`/api/event/getEvents?sort=asc&sortField=date&month=${selectedMonth}`);
        const data = await res.json();
        console.log(data)
        if (res.ok) {
          
          setUserEvents(data.event)
          
          setLoading(false);
          
        }
         
    if(!res.ok)
    {
      setLoading(false);
      return;
    }
      };
      if (selectedMonth) {
        setLoading(true);fetchRecentEvents();
       
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedMonth]);






 



  if (loading)
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
    </div>
  );







  return (
    <div className=''> 
  
  
<>
<div className='flex  flex-col justify-center items-center mb-5'>
<Select
  className='mt-12 mb-12'
  options={monthOptions}
  onChange={handleMonthChange}
  defaultValue={monthOptions.find(option => option.value === selectedMonth)}
  styles={{
    control: (provided) => ({
      ...provided,
      width: 150,
      backgroundColor: '#f0f0f0',
      borderColor: '#8a8a8a',
      minHeight: '40px',
      height: '40px',
      boxShadow: 'none',
    }),
    menu: (provided) => ({
      ...provided,
      color: '#000',
      margin: '0px',
      padding: '0px',
      borderRadius: '0px',
      zIndex: 999,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#000',
      backgroundColor: state.isSelected ? '#007bff' : '#fff',
    }),
  }}
/>
   

      {userEvents.length>0?(
    <motion.div className='flex flex-wrap gap-5 mt-5 justify-center transition-all duration-1000'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
      {userEvents &&
        userEvents.map((event) => <EventCard key={event._id} event={event} />)}
    </motion.div>
     ):(<p className='mt-4 text-3xl font-bold'>No Recent Events in this month !</p>)}
  </div>

  <div className='mx-auto flex flex-col items-center justify-center'>
  <p className= 'text-zinc-800 dark:text-slate-300 font-semibold'>Feeling Overwhelmed ? Find events that match your schedule effortlessly with our advanced search filters – location, keywords, and date, all at your fingertips!</p>
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
     
    
  
  </div>
  )
}

export default CalendarView