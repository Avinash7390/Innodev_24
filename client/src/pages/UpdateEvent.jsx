import { FileInput, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Select, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getStorage, uploadBytesResumable , ref , getDownloadURL} from "firebase/storage";
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert } from "flowbite-react";
import ReactSelect from 'react-select';
import {  useNavigate , useParams } from 'react-router-dom';
import { htmlToText } from 'html-to-text'; 
import { useSelector } from "react-redux";
import { set } from "mongoose";
const UpdateEvent = () => {

const [file,setFile]=useState(null);
const [imageUploadProgress,setImageUploadProgress]=useState(null);
const [imageUploadError,setImageUploadError]=useState(null);
const [formData,setFormData]=useState({});
const [publishError,setPublishError]=useState(null);
const navigate = useNavigate();
const {eventId}=useParams();
const [locationError, setLocationError] = useState('');

const {currentUser}=useSelector((state)=>state.user);


const options = [
  { value: 'A', label: 'VIP Room' },
  { value: 'B', label: 'Front Row Left Wing' },
  { value: 'C', label: 'Front Row Right Wing' },
  { value: 'D', label: 'Middle Row Left Wing' },
  { value: 'E', label: 'Middle Row Right Wing' },
  { value: 'F', label: 'Back Row Left Wing' },
  { value: 'G', label: 'Back Row Right Wing' },
  { value: 'H', label: 'Upstands' },
  { value: 'I', label: 'Downstands' },

];
useEffect(()=>{
  try {
    const fetchEvent = async () => {
      const res = await fetch(`/api/event/getEvents?eventId=${eventId}`);
      const data = await res.json();
  
      const { date, time, ...restOfData } = data.event[0];
  
      // Convert date to YYYY-MM-DD format
      const dateObj = new Date(date);
      const formattedDate = dateObj.toISOString().split('T')[0];
  
      // Convert time to HH:mm format
      const [timePart, period] = time.split(' ');
      let [hours, minutes] = timePart.split(':');
      if (period === 'PM' && hours !== '12') {
        hours = (parseInt(hours, 10) + 12).toString();
      } else if (period === 'AM' && hours === '12') {
        hours = '00';
      }
      const formattedTime = `${hours}:${minutes}`;
  
      if (!res.ok) {
        console.log(data.message);
        setPublishError(data.message);
        return;
      }
  
      if (res.ok) {
        setPublishError(null);
        setFormData({ ...restOfData, date: formattedDate, time: formattedTime });
      }
    };
  
    fetchEvent();
  } catch (error) {
    console.log(error.message);
  }


},[eventId]);


const handleUploadImage=async ()=>{
  try{
    if(!file){
      setImageUploadError('Please select an image');
      return;
    }
    setImageUploadError(null);
    const storage=getStorage(app);
    const fileName=new Date().getTime()+'-'+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=
        (snapshot.bytesTransferred/snapshot.totalBytes)*100;
   setImageUploadProgress(progress.toFixed(0));

      },
      (error)=>{
        setImageUploadError('Image upload failed')
        setImageUploadProgress(null);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({...formData,image:downloadURL});
        });
      }
    );
  }
  catch(error)
      {
setImageUploadError('Image upload failed');
setImageUploadProgress(null);
console.log(error);
      }
    
};






const handleSelectChange = (selectedOptions) => {
  setFormData({ ...formData, tickets: selectedOptions });

};



const handleSubmit=async(e)=>{
  e.preventDefault();
console.log(formData);
  const dateError = validateDate(formData.date);
  if (dateError) {
    setPublishError(dateError);
    return;
  }
 
  const locationError = validateLocation(formData.location);

  // If there's an error, set the error state and stop the form submission
  if (locationError) {
    setPublishError(locationError);
    return;
  }
  if (!formData.content==="") {
    setPublishError('Content is required.');
    return;
  }

  try{
    const res=await fetch(`/api/event/updateEvent/${formData._id}/${currentUser._id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    const data=await res.json();
    
   if(!res.ok){
    setPublishError(data.message);
    console.log(data.message);
    return;
  }


    if(res.ok){
      setPublishError(null);
      navigate(`/event/${data.slug}`);
    }


  }
   catch(error)
  {
    setPublishError('Something went wrong');
  }
}
const validateLocation = (location) => {
  const regex = /[!@#$%^&*(),.?":{}|<>\]0-9]/g;
 
   

  if (regex.test(location)) {
    
    return "Invalid Location. Please remove any special characters";
  } else {
    return null;
  }
};
const validateDate = (date) => {
  

  // Check if date is not in the future
  const selectedDate = new Date(date);
  
  if (!date) {
    return "Select the Date first ";
  }
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    return "Only Future Events are allowed to be created.";
  }

  // If all checks pass, return null
  return null;
};

function convertTo12Hour(time) {
  const [hours, minutes] = time.split(':');
  return ((hours % 12) || 12) + ':' + minutes + (hours < 12 ? ' AM' : ' PM');
}

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Event</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Event Name"
            required
            id="title"
            className="flex-1"
            onChange={(e)=>setFormData({...formData,title: e.target.value})}
            value={formData.title}
          />
          <input
  type="date"
  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
  value={formData.date}
/>
        </div>
        <input
  placeholder="Time of the Event "
  type="time"
  onChange={(e) => setFormData({ ...formData, time:e.target.value})}
  required
  value={formData.time}
/>
<input
          type="text"
          name="location"
          placeholder="Location of the Event goes here ..."
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          value={formData.location}
        />
        {locationError && <p className="text-xl text-red-400">{locationError}</p>}

        <ReactSelect
        placeholder="Select Tickets for this event" 
  isMulti
  options={options}
  onChange={handleSelectChange}
  value={formData.tickets}
/>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])} />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {
              imageUploadProgress?
              (
              <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
              </div>
              ):(
                'Upload Image'
              )}
           
          </Button>
        </div>
        {imageUploadError&&(
          <Alert color='failure'>
            {imageUploadError}
          </Alert>
        )}
        {formData.image&&(
          <img src={formData.image}
          alt='upload'
          className="w-full h-84 object-cover"></img>
         )}
        
        <ReactQuill
          theme="snow"
          placeholder="Describe the event here..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
            value={formData.content}
        />
       
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Update
        </Button>
        {
          publishError && <Alert color='failure' className="mt-5">{publishError}</Alert>
        }
      </form>
    </div>
  )
  }
export default UpdateEvent;
