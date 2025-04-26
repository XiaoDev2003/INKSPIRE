import React, { useEffect, useState } from 'react';

export default function Ticker() {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [location, setLocation] = useState('Detecting location...');

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        setLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
      }, () => {
        setLocation('Location permission denied.');
      });
    } else {
      setLocation('Geolocation not supported.');
    }

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker">
      <span>Datetime📅: {dateTime}  |  Location📍: {location}</span>
    </div>
  );
}
