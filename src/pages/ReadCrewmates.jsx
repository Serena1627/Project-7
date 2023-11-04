import React, { useState, useEffect } from 'react';
import Card from '../components/CrewmateCard';
import { supabase } from '../client';


const ReadPosts = (data) => {

    const [crewMates, setCrewMates] = useState([]);

    useEffect(() => {
        const fetchCrewMates = async() => {
            const {data} = await supabase
                .from('AddCrewmates')
                .select()
                .order('created_at', { ascending: true })
            setCrewMates(data);
        }
        fetchCrewMates();
    }, [data]);
    
    return (
        <div className="ReadCrewMates">
            {
                crewMates && crewMates.length > 0 ?
                crewMates.map((crewMate,index) => 
                   <Card id={crewMate.id} 
                   Name={crewMate.Name} 
                   Speed={crewMate.Speed} 
                   Color={crewMate.Color}
                   key={index}
                    />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;