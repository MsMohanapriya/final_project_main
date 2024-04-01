import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// Drop down component for Sales projects 

import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';

export default function Sales() {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Account Management', code: 'NY' },
        { name: 'Lead Generation', code: 'RM' },
        { name: 'Opportunity', code: 'LDN' }
    ];

    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Project" className="w-full md:w-14rem" style={{width:"110px"}}/>
        </div>
    )
}
        