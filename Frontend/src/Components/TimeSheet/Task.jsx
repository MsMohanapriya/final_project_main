import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
 
// Dropdown component for tasks

import React, { useState } from "react";    
import { Dropdown } from 'primereact/dropdown';

export default function BasicDemo() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Employee Wellbeing', code: 'NY' },
        { name: 'Human Resources', code: 'RM' },
        { name: 'IDE', code: 'LDN' },
        { name: 'JMates', code: 'IST' },
        { name: 'People Stratergy', code: 'PRS' }
    ];

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Task" className="w-full md:w-14rem" style={{width:"110px"}} />
        </div>
    )
}
        