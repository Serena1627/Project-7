import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabase'; // Import your Supabase client

const DetailsPage = () => {
    const { id } = useParams();
    const [recordDetails, setRecordDetails] = useState(null);

    useEffect(() => {
        // Fetch the record details from your Supabase table
        const fetchRecordDetails = async () => {
            try {
                const { data, error } = await supabase
                    .from('AddCrewmates') // Replace with your actual table name
                    .select()
                    .eq('id', data.id)
                    .single();

                if (error) {
                    throw new Error('Failed to fetch record details');
                }

                // Set the fetched record details
                setRecordDetails(data);
            } catch (error) {
                console.error('Error fetching record details:', error);
            }
        };

        fetchRecordDetails();
    }, [id]);

    return (
        <div>
            <h1>Record Details</h1>
            {recordDetails ? (
                <div>
                    <h2>ID: {recordDetails.id}</h2>
                    <p>Name: {recordDetails.Name}</p>
                    <p>Speed: {recordDetails.Speed}</p>
                    <p>Color: {recordDetails.Color}</p>
                </div>
            ) : (
                <p>Loading record details...</p>
            )}
        </div>
    );
};

export default DetailsPage;
