import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import {getDogById} from '../actions';
import defaultDog from'../assets/dog.jpg';
import './Detail.css'


export default function Detail() {

    let { id } = useParams();
     let dispatch = useDispatch();

    const dog = useSelector(state => state.detail)
    
    useEffect(() => {
       
       dispatch(getDogById(id))
    }, [])

    return (
        <div className='container'>
            <div className='title'>{dog.name}</div>

            {dog.image ? <img src={dog.image} alt='img' className='dogImg' /> 
                : <img src={defaultDog} alt='img'  className='dogImg' /> }
            <div className='atributes'>Height:  {dog.min_weight} - {dog.max_weight}</div>
            <div className='atributes'>Weight:  {dog.min_height} - {dog.max_height}</div>
            <div className='atributes'>Life Span: {dog.life_span}</div>
            <div className='atributes'>Temperaments:  <div>{dog.temperaments && dog.temperaments.map(temp => { return temp.name + ' ' })} </div>
            </div>
        </div>
    )
}