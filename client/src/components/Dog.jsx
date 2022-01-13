import React from 'react';
import {Link} from 'react-router-dom';
import defaultDog from'../assets/dog.jpg';


export default function Dog({ id, name, min_weight, max_weight, temperaments, image }) {

    return (
        <div style={{ width: '20%', display: 'inline-block', textAlign: 'left', padding: 10 }}>
            <Link to={`/detail/${id}`}> 
            <div style={{fontSize:18, fontWeight: 600 }}>{name}</div>
            </Link>
            {image ? <img src={image} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} /> 
                : <img src={defaultDog} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} /> }
            <div>ID: {id}</div>
            <div>Weight:  {min_weight} - {max_weight}</div>
            <div>Temperaments:  <div>{temperaments && temperaments.map(temp => { return temp.name + ' ' })} </div>
            </div>
        </div>
    )
}