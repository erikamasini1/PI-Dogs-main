import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import {getDogById} from '../actions';
import defaultDog from'../assets/noimg.png';
import './Detail.css'


export default function Detail() {

    let { id } = useParams();
     let dispatch = useDispatch();

    const dog = useSelector(state => state.detail)
    
    useEffect(() => {
       dispatch(getDogById(id))
    }, [])

    return (
        <div className='containerDetail'>
            <div className='title'>{dog.name}</div>

            {dog.image ? <img src={dog.image} alt='img' className='dogImg' /> 
                : <img src={defaultDog} alt='img'  className='dogImg' /> }
            <div className='atributes'> <span className={'attributeDetailTitle'}>  Height: </span>  <span>{dog.min_weight} - {dog.max_weight}  kg </span></div>
            <div className='atributes'> <span className={'attributeDetailTitle'}> Weight:</span>  <span>{dog.min_height} - {dog.max_height} mts</span></div>
            <div className='atributes'> <span className={'attributeDetailTitle'}> Life Span: </span>  <span> {dog.life_span} </span></div>
            <div className='atributes'> <span className={'attributeDetailTitle'}> Temperaments: </span>  <span> <div>{dog.temperaments && dog.temperaments.map(temp => { return temp.name + ' ' })} </div> </span>
            </div>
        </div>
    )
}