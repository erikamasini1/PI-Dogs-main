import React from 'react';
import {Link} from 'react-router-dom';
import defaultDog from'../assets/noimg.png';
import './Dog.css';


export default function Dog({ id, name, min_weight, max_weight, min_height, temperaments, image }) {

    return (
        <div className={'containerDog'}>

            <Link  className={'linkDog'} to={`/detail/${id}`}> 
            <div className={'titleDog'}>
            {name}
            </div>
            {image ? <img src={image} alt='img' className='dogImg' /> 
                : <img src={defaultDog} alt='img'  className='dogImg' /> }
        
            <div className='attributes' ><span className={'attributeTitle'}>Weight:</span>  {min_weight} - {max_weight} kg</div>
            <div className='attributes' ><span className={'attributeTitle'}>Height:</span>  {min_height} cms</div>
            <div className='attributes' ><span className={'attributeTitle'}>Temperaments:</span><div>{temperaments && temperaments.map((temp, i) => { return temp.name + (i < (temperaments.length - 1) ?  ', ' : '') })} </div>
            </div>
            </Link>
        </div>
    )
}