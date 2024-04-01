import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
 
// Drop down component for BAU projects

import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function Bau() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'BAU_001 Training', code: 'NY' },
        { name: 'BAU_002 People', code: 'RM' },
        { name: 'BAU_003 Delivery', code: 'LDN' },
        { name: 'BAU_004 Sales', code: 'IST' },
        { name: 'BAU_007 Operations', code: 'PRS' }
    ];

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Project" className="w-full md:w-1rem" style={{width:"110px"}}/>
        </div>
    )
}
        