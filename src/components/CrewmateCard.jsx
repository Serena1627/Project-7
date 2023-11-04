import React from 'react'
import './CrewmateCard.css'
import PropTypes from 'prop-types'
import more from './more.png'
import { Link } from 'react-router-dom';
import { supabase } from '../client';


const Card = (props) =>  {
    const handleDelete = async () => {
        await supabase
            .from('AddCrewmates')
            .delete()
            .eq('id', props.id)
    }


  return (
      <div className="Card">
        <Link to={'/edit/'+ props.id}>
            <button >Update</button>
        </Link>
        <button onClick={handleDelete}>Delete Crewmate</button>
        
          <h2 className="Name">{props.Name}</h2>
          <h3 className="Speed">{props.Speed + 'Mph'}</h3>
          <p className="Color">{props.Color}</p>
      </div>
  );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    Name: PropTypes.string,
    Speed: PropTypes.number,
    Color: PropTypes.string,
  };

export default Card;