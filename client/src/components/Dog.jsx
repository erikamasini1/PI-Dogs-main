import React from 'react';
import {Link} from 'react-router-dom';
import defaultDog from'../assets/Defaultdog2.jpeg';
import './Dog.css';


export default function Dog({ id, name, min_weight, max_weight, temperaments, image }) {

    return (
        <div className={'container'}>
            <div >
            <Link className={'dogTitle'} to={`/detail/${id}`}> 
            {name}
            </Link>
            </div>
            {image ? <img src={image} alt='img' className='dogImg' /> 
                : <img src={defaultDog} alt='img'  className='dogImg' /> }
        
            <div className='attributes' ><span className={'attributeTitle'}>Weight:</span>  {min_weight} - {max_weight} kg</div>
            <div><span className={'attributeTitle'}>Temperaments:</span><div>{temperaments && temperaments.map((temp, i) => { return temp.name + (i < (temperaments.length - 1) ?  ', ' : '') })} </div>
            </div>
        </div>
    )
}