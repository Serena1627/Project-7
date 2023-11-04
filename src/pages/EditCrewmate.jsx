import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'; // Import your Supabase client
// You may need to create your own CSS file



const EditCrewmates = ({ data }) => {
    
    const { id } = useParams();
    const [data, setData] = useState([]);

    // Assuming that 'data' is an array of crewmates
    const crewMate = data.find((item) => item.id === id);

    if (!crewMate) {
        // Handle the case where the crewmate with the specified ID is not found
        return <div>Crewmate not found</div>;
    }

    const fetchCrewmates = async () => {
        const { data, error } = await supabase.from('Crewmates').select('*');
        
        if (error) {
            console.error('Error fetching crewmates:', error);
            return [];
        }
        
        return data;
    };
    fetchCrewmates()

    // Create state variables for the form data
    const [formData, setFormData] = useState({
        Name: crewMate.Name,
        Speed: crewMate.Speed,
        Color: crewMate.Color,
    });

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission to update the crewmate
    const updateCrewmate = async (event) => {
        event.preventDefault();

        // Update the crewmate using your Supabase client
        const { data, error } = await supabase
            .from('AddCrewmates') // Replace 'YourTableName' with your actual table name
            .update(formData)
            .eq('id', id);

        if (error) {
            console.error('Error updating crewmate:', error);
        } else {
            // Redirect to another page or perform any other actions after updating
            window.location = '/list'; // Redirect to the list page
        }
    };

    return (
        <div>
            <form onSubmit={updateCrewmate}>
                <label htmlFor="Name">Name</label> <br />
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="Speed">Speed</label>
                <br />
                <input
                    type="text"
                    id="Speed"
                    name="Speed"
                    value={formData.Speed}
                    onChange={handleInputChange}
                />
                <br />

                <label htmlFor="Color">Color</label>
                <br />
                <input
                    type="text"
                    id="Color"
                    name="Color"
                    value={formData.Color}
                    onChange={handleInputChange}
                />
                <br />

                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default EditCrewmates;
