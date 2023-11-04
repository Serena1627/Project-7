import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../client';

const RecordForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        speed: '',
        color: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, speed, color } = formData;
        const table = 'AddCrewmates'; // Replace with your actual table name

        const { data, error } = await supabase.from(table).upsert([
            {
                Name: name,
                Speed: parseFloat(speed),
                Color: color
            }
        ]);

        if (error) {
            console.error('Error inserting record:', error);
        } else {
            console.log('Record inserted successfully:', data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Speed:
                <input
                    type="number"
                    name="speed"
                    value={formData.speed}
                    onChange={handleInputChange}
                />
            </label>

            <label>
                Color:
                <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                />
            </label>

            <button type="submit">Create Record</button>
        </form>
    );
};

export default RecordForm;
