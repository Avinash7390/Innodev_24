import { FileInput, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Select, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getStorage, uploadBytesResumable , ref , getDownloadURL} from "firebase/storage";
import {app} from '../firebase';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Alert } from "flowbite-react";
import ReactSelect from 'react-select';
import { Form, useNavigate } from 'react-router-dom';
import { htmlToText } from 'html-to-text';




const CreateEvent = () => {

const [file,setFile]=useState(null);
const [imageUploadProgress,setImageUploadProgress]=useState(null);
const [imageUploadError,setImageUploadError]=useState(null);
const [formData,setFormData]=useState({});
const [publishError,setPublishError]=useState(null);

const [tickets, setTickets] = useState([{ name: '', price: '' }]);




const navigate = useNavigate();
const [locationError, setLocationError] = useState('');


const handleTicketChange = (index, event) => {
 
  const values = [...tickets];
  values[index][event.target.name] = event.target.value;
  setTickets(values);
 

};

const handleAddTicket = () => {
  setTickets([...tickets, { name: '', price: '' }]);
  
};


const handleRemoveTicket = (index) => {
  const values = [...tickets];
  values.splice(index, 1);
  setTickets(values);
};

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










const handleSubmit=async(e)=>{
  e.preventDefault();

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
  const finalFormData = {
    ...formData,
    tickets,
  };

 

  try{
    const res=await fetch('/api/event/create',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(finalFormData),
    });
  
    const data=await res.json();
    
   if(!res.ok) {
    setPublishError(data.message);
    console.log(data.message);
    return;
  }


    if(res.ok){
      setPublishError(null);
      navigate(`/event/${data.slug}`);
      console.log(finalFormData);
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
      <h1 className="text-center text-3xl my-7 font-semibold">Create an Event</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Event Name"
            required
            id="title"
            className="flex-1"
            onChange={(e)=>setFormData({...formData,title: e.target.value})}
          />
          <input
  type="date"
  onChange={(e) =>{ setFormData({ ...formData, date: e.target.value });
  console.log(e.target.value);

  }
  }
/>
        </div>
        <input
  placeholder="Time of the Event "
  type="time"
  onChange={(e) => setFormData({ ...formData, time: convertTo12Hour(e.target.value) })}
  required
/>
<input
          type="text"
          name="location"
          placeholder="Location of the Event goes here ..."
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        {locationError && <p className="text-xl text-red-400">{locationError}</p>}

        {tickets.map((ticket, index) => (
          <div key={index} className="flex flex-wrap gap-2 sm:gap-4">
            <TextInput
            className=" w-[35%]"
              type="text"
              name="name"
              placeholder="Ticket Name"
              value={ticket.name}
              required
              onChange={(event) => { handleTicketChange(index, event);
              
              }}
            />
            <TextInput
            className="w-[30%]"
              type="number"
              name="price"
              placeholder="Ticket Price"
              value={ticket.price}
              required
              onChange={(event) => handleTicketChange(index, event)}
            />
            <Button className=" sm:w-full text-xs w-[70px] sm:text-lg max-w-[80px] " type="button" color="red"  onClick={() => handleRemoveTicket(index)} outline>
        Remove
        </Button>
          </div>
        ))}
       
      
        <Button className="w-full sm:w-[30%] self-center"  color="purple" onClick={handleAddTicket} outline>
        Add Ticket
        </Button>
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
           placeholder="Write something .."
           className="h-72 mb-12"
           required
           onChange={(value)=>{
             setFormData({...formData,content:value});
           }}
        />
       
        <Button type="submit" gradientDuoTone="purpleToPink" outline>
          Create
        </Button>
        {
          publishError && <Alert color='failure' className="mt-5">{publishError}</Alert>
        }
      </form>
    </div>
  )
  }
export default CreateEvent;
