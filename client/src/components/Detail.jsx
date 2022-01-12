import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import {getDogById} from '../actions'


export default function Detail() {

    let { id } = useParams();
     let dispatch = useDispatch();

    const dog = useSelector(state => state.detail)
    
    useEffect(() => {
       
       dispatch(getDogById(id))
    }, [])

    return (
        <div style={{ width: '20%', display: 'inline-block', textAlign: 'left', padding: 10 }}>
          
            <div> DETALLE </div>

            <div style={{fontSize:18, fontWeight: 600 }}>{dog.name}</div>

            {dog.image && <img src={dog.image} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} />}
            <div>Height:  {dog.height}</div>
            <div>Weight:  {dog.weight}</div>
            <div>Life Span: {dog.life_span}</div>
            <div>Temperaments:  <div>{dog.temperaments && dog.temperaments.map(temp => { return temp.name + ' ' })} </div>
            </div>
        </div>
    )
}