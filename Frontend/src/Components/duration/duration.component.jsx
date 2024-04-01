// import React from 'react'
// import './duration.styles.css'
// import { useTimeContext } from '../../context/hours.context'
// const Duration = () => {

//   const {hours} = useTimeContext();
//   return (
//     <>
//         <div className="duration-container">
//             <span>Total Hours: {hours}</span>
//             <div className="date-time">
//             <i className="pi pi-angle-left" style={{ fontSize: '1.8rem' }}></i>
//                 05 Feb 2024 - 11 Feb 2024
//             <i className="pi pi-angle-right" style={{ fontSize: '1.8rem' }}></i>
//             </div>
//         </div>
//     </>
//   )
// }

// export default Duration

import React, { useState } from 'react';
import './duration.styles.css';
import { useTimeContext } from '../../context/hours.context';
import { Calendar } from 'primereact/calendar';

const Duration = () => {
  const { hours } = useTimeContext();
  const [startDate, setStartDate] = useState(new Date()); // Initialize with current date

  const handleDateChange = (e) => {
    setStartDate(e.value);
  };

  const calculateEndDate = () => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Calculate end date by adding 6 days
    return endDate;
  };

  return (
    <>
      <div className="duration-container">
        <span>Total Hours: {hours}</span>
        <div className="date-time">
          <i className="pi pi-angle-left" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)))}></i>
          <Calendar
            value={startDate}
            onChange={handleDateChange}
            dateFormat="dd M yy"
          />
          <i className="pi pi-angle-right" style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)))}></i>
        </div>
        <span>{startDate.toLocaleDateString()} - {calculateEndDate().toLocaleDateString()}</span>
      </div>
    </>
  );
};

export default Duration;
