import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';

export default function Search() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    location: '',
    date: '',
    time: '',

  });

  console.log(sidebarData);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const locationFromUrl = urlParams.get('location');
    const dateFromUrl=urlParams.get('date');
    if (searchTermFromUrl || sortFromUrl || locationFromUrl||dateFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        location: locationFromUrl,
        date:dateFromUrl,
      });
    }

    const fetchEvents = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/event/getEvents?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setEvents(data.event);
        setLoading(false);
        if (data.event.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchEvents();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'location') {
        const location = e.target.value || '';
        setSidebarData({ ...sidebarData, location });
      }
      if(e.target.id==='date')
      {
        const date=e.target.value||'';
        setSidebarData({...sidebarData,date});
      }

  };
  function convertDateToNormalFormat(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed in JavaScript
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



  const handleSubmit = (e) => {
    console.log(sidebarData.location);
   

    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    if (sidebarData.sort) {
        urlParams.set('sort', sidebarData.sort);
      }

if(sidebarData.location)
{

    urlParams.set('location', sidebarData.location);

}

    

    if (sidebarData.date) {
        const dateToSend = convertDateToNormalFormat(sidebarData.date);
        urlParams.set('date', dateToSend);
      }

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfEvents = events.length;
    const startIndex = numberOfEvents;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/event/getEvents?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setEvents([...events, ...data.event]);
      if (data.event.length === 9 ) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

const handleRemoveFilters=()=>{

    setSidebarData({
        searchTerm: '',
        sort: 'desc',
        location: '',
        date: '',
        time: '',
      });
      navigate(location.pathname);



};





  return (
    <motion.div className='flex flex-col md:flex-row transition-all duration-1000' 
    initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex self-center   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term :
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex self-center items-center gap-12 md:gap-0 md:justify-between px-5'>
            <label className='font-semibold w-24 '>Sort :</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </Select>
          </div>
          <div className='flex self-center items-center gap-2'>
          <label className='whitespace-nowrap p-3 font-semibold'>
              Location :
            </label>
            <TextInput
              
              id='location'
              type='text'
              value={sidebarData.location}
              onChange={handleChange}
            />
          </div>

          <div className='flex self-center items-center md:justify-between gap-10  md:gap-8'>
          <label className='whitespace-nowrap pl-7 font-semibold'>
              Date:    
            </label>
            <input
              
              id='date'
              type='date'
              value={sidebarData.date}
              onChange={handleChange}
            />
          </div>

          <Button type='submit' outline gradientDuoTone='greenToBlue'>
            Apply Filters
          </Button>
          <Button type='button' onClick={handleRemoveFilters} outline gradientDuoTone='pinkToOrange'>
  Remove Filters
</Button>
          
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Events results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && events.length === 0 && (
            <p className='text-xl text-gray-500'>No Events found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            events &&
            events.map((event) => <EventCard key={event._id} event={event} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}