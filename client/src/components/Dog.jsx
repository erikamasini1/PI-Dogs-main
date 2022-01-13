import React from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { getDogById } from '../actions';

export default function Dog({ id, name, min_weight, max_weight, temperaments, image }) {

    return (
        <div style={{ width: '20%', display: 'inline-block', textAlign: 'left', padding: 10 }}>
            <Link to={`/detail/${id}`}> 
            <div style={{fontSize:18, fontWeight: 600 }}>{name}</div>
            </Link>
            {image ? <img src={image} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} /> 
                : <img src={'https://graphicriver.img.customer.envatousercontent.com/files/270440720/CartoonDogPointer%20p.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=d7ccf47eef9f9a8f679c134cc70bffa5'} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} /> }
            <div>ID: {id}</div>
            <div>Weight:  {min_weight} - {max_weight}</div>
            <div>Temperaments:  <div>{temperaments && temperaments.map(temp => { return temp.name + ' ' })} </div>
            </div>
        </div>
    )
}