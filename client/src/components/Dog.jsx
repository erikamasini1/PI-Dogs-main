import React from 'react';
import {Link} from 'react-router-dom';
import defaultDog from'../assets/dog.jpg';
import './Dog.css';


export default function Dog({ id, name, min_weight, max_weight, temperaments, image }) {

    return (
        <div className={'container'}>
            <div className={'dogTitle'}>
            <Link className={'dogTitle'} to={`/detail/${id}`}> 
            {name}
            </Link>
            </div>
            {image ? <img src={image} alt='img' className='dogImg' /> 
                : <img src={defaultDog} alt='img'  className='dogImg' /> }
        
            <div>Weight:  {min_weight} - {max_weight} kg</div>
            <div>Temperaments:  <div>{temperaments && temperaments.map(temp => { return temp.name + ' ' })} </div>
            </div>
        </div>
    )
}