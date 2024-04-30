import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Filter({ setSelectType }) {

    const [types, setTypes] = useState([]);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/type');
            setTypes(response.data.results);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTypes();
    }, [])

    const handleTypeChange = (event) => {
        setSelectType(event.target.value);
    };

    return (
        <div className="flex justify-center mb-10 md:justify-end">
            <select className="w-full md:w-[200px] bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-xl" onChange={handleTypeChange}>
                <option disabled selected>Choose type...</option>
                <option value=''>Show all</option>
                {types.map((type, index) => (
                    <option key={type.name + index} value={type.name}>{type.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Filter