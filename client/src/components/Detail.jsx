import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import {getDogById} from '../actions';
import defaultDog from'../assets/dog.jpg';


export default function Detail() {

    let { id } = useParams();
     let dispatch = useDispatch();

    const dog = useSelector(state => state.detail)
    
    useEffect(() => {
       
       dispatch(getDogById(id))
    }, [])

    return (
        <div style={{ width: '20%', display: 'inline-block', textAlign: 'left', padding: 10 }}>
            <div style={{fontSize:18, fontWeight: 600 }}>{dog.name}</div>

            {dog.image ? <img src={dog.image} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} /> 
                : <img src={defaultDog} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} /> }
            <div>Height:  {dog.min_weight} - {dog.max_weight}</div>
            <div>Weight:  {dog.min_height} - {dog.max_height}</div>
            <div>Life Span: {dog.life_span}</div>
            <div>Temperaments:  <div>{dog.temperaments && dog.temperaments.map(temp => { return temp.name + ' ' })} </div>
            </div>
        </div>
    )
}