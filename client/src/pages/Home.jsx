import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { MdStarBorderPurple500 } from 'react-icons/md';
export default function Home() {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Event Web App!</h1>
      <p className="text-lg mb-4">
        Our platform is designed to help you discover and participate in events that you're interested in. 
        Whether you're looking for music festivals, tech conferences, or community gatherings, you'll find it all here.
      </p>
      <p className="text-lg mb-4">
        If you're an event organizer, you can also use our platform to manage and promote your events. 
        You'll have access to powerful tools that make it easy to sell tickets, manage attendees, and more.
      </p>
      <p className="text-lg">
        Start exploring events or create your own today!
      </p>
     <div>
      <Link className='flex justify-center sm:flex mt-6' to='/AllEvents'><Button  gradientDuoTone="purpleToBlue" outline>
            View Events
          </Button></Link>
      </div>
    </div>
  );
}