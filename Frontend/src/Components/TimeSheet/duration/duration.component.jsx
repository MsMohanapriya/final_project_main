

import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import './duration.styles.css';

const Duration = ({ hours, startDate, endDate, setStartDate, setEndDate }) => {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date(startDate.setDate(startDate.getDate() + 6))); // Initialize end date as one week ahead

  useEffect(() => {
    const newEndDate = new Date(startDate);
    newEndDate.setDate(newEndDate.getDate() + 6); // Set end date as one week ahead of start date
    setEndDate(newEndDate);
  }, [startDate]);

  const navigateWeek = (direction) => {
    const newStartDate = new Date(startDate);
    if (direction === 'back') {
      newStartDate.setDate(newStartDate.getDate() - 7);
    } else if (direction === 'forward') {
      newStartDate.setDate(newStartDate.getDate() + 7);
    }
    setStartDate(newStartDate);
  };

  return (
    <div className="duration-container totalhours">
      <span>Total Hours: {hours}</span>
      <div className="date-time">
        <i className="pi pi-angle-left" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => navigateWeek('back')}></i>
        <Calendar
          value={startDate}
          onChange={(e) => setStartDate(e.value)}
          dateFormat="dd M yy"
          readOnlyInput
        />
        <span>-</span>
        <Calendar
          value={endDate}
          onChange={(e) => setEndDate(e.value)}
          dateFormat="dd M yy"
          readOnlyInput
        />
        <i className="pi pi-angle-right" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => navigateWeek('forward')}></i>
      </div>
    </div>
  );
};

export default Duration;
