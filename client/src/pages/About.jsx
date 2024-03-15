import React from 'react';

export default function About() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">About Our Event Management Web App</h1>
      <p className="text-lg mb-4">
        Our Event Management Web App is a platform designed with both event-goers and event organizers in mind. 
        We aim to streamline the process of discovering, attending, and managing events.
      </p>
      <p className="text-lg mb-4">
        For event-goers, we offer a wide range of events to choose from. Whether you're into music, tech, sports, or arts, 
        you'll find events that match your interests.
      </p>
      <p className="text-lg mb-4">
        For event organizers, we provide a suite of tools to help you manage and promote your events effectively. 
        From ticket sales to attendee management, we've got you covered.
      </p>
      <p className="text-lg">
        Join us today and experience the future of event management!
      </p>
    </div>
  );
}