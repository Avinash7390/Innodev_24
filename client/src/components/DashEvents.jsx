import { Table, Modal, Button} from 'flowbite-react';
import React from 'react'
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

const DashEvents = () => {
  const {currentUser}=useSelector((state)=>state.user)
const [userEvents,setUserEvents]=useState([]);
const[showMore,setShowMore]=useState(true);
const[showModal,setShowModal]=useState(false);
const [eventIdToDelete,setEventIdToDelete]=useState('');




useEffect(()=>{
const fetchEvents=async()=>{
  try{
    const res=await fetch(`/api/event/getEvents?userId=${currentUser._id}`)
    const data=await res.json()
    console.log(data);
    if(res.ok)
    {
      setUserEvents(data.events)
      if(data.events.length<9){
        setShowMore(false);
      }
    }
  }catch(error)
  {
    console.log(error.message)
  }
}
if(currentUser.isAdmin)
{
  fetchEvents();
}
},[currentUser._id])


const handleShowMore=async()=>{
  const startIndex=userEvents.length;
  try{
    const res=await fetch(`api/event/getEvents?userid=${currentUser._id}&startIndex=${startIndex}`);
    const data=await res.json();
    if(res.ok){
      setUserEvents((prev)=>[...prev,...data.events]);
      if( data.events.length < 9){

        setShowMore(false);
        
      }
    }
  } catch(error)
  {
    console.log(error.message);
  }
}

const handleDeleteEvent=async()=>{
  setShowModal(false);
  try{
const res=await fetch(
  `/api/event/deleteEvent/${eventIdToDelete}/${currentUser._id}`,
  {
  method:'DELETE',
}
);
const data=await res.json();
if(!res.ok)
{
  console.log(data.message);
}
else{
  setUserEvents((prev)=>prev.filter((event)=>event._id!==eventIdToDelete));//to update the posts and filter out those who aren't deleted
}

}catch(error){
    console.log(error.message);
  }

}


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userEvents.length>0?(
<>
<Table hoverable className='shadow-md'> 
<Table.Head>
  <Table.HeadCell>Date </Table.HeadCell>
  <Table.HeadCell>Event Image</Table.HeadCell>
  <Table.HeadCell>Event Name</Table.HeadCell>
  <Table.HeadCell>Event Location</Table.HeadCell>
  <Table.HeadCell>
    <span>Delete </span></Table.HeadCell>
  <Table.HeadCell>
    <span>Edit</span></Table.HeadCell>
  </Table.Head>
  {userEvents.map((event)=>(
    <Table.Body className='divide-y'>
      <Table.Row  className='bg-white dark:border-gray-700 dark:bg-gray-800'>
        <Table.Cell>
          {new Date(event.updatedAt).toLocaleDateString()}
        </Table.Cell>
        <Table.Cell>
          <Link to={`/event/${event.slug}`}>
            <img src={event.image}
           alt={event.title}
           className='w-20 h-10 object-cover bg-gray-500'/>
          </Link>
        </Table.Cell>
        <Table.Cell>
          <Link    className='font-medium text-gray-900 dark:text-white'   to={`/event/${event.slug}`}>{event.title}</Link>
        </Table.Cell>
        <Table.Cell>
        {event.location}
        </Table.Cell>
        <Table.Cell>
        <span onClick={()=>{
          setShowModal(true);
          setEventIdToDelete(event._id);
        }} className='font-medium text-red-500 hover:underline cursor-pointer'>
          Delete
        </span>
        </Table.Cell>
        <Table.Cell>
        <Link className="text-teal-500  hover:underline" to={`/update-event/${event._id}`}>
        <span>
          Edit
        </span>
        </Link>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  ))}
  </Table>
  {
    showMore&&(
   <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>Show more</button>
    )
  }
</>
      ):(<p>You have no Events yet !</p>)}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400' onClick={handleDeleteEvent}>
              Are you sure you want to delete this Event?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteEvent}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default DashEvents