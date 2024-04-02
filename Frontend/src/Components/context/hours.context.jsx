import React, { createContext, useContext, useState } from 'react';
const TimeContext = createContext();
export const TimeProvider = ({ children }) => {
  const [hours, setHours] = useState(0);

  const updateHours = (newHours) => {
    setHours(newHours);
  };

  return (
    <TimeContext.Provider value={{ hours, updateHours }}>
      {children}
    </TimeContext.Provider>
  );
};
export const useTimeContext = () => useContext(TimeContext);