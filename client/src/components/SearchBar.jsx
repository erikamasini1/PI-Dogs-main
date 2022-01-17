import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogByName, getDogs } from '../actions';
import './SearchBar.css';
import { useHistory } from "react-router-dom";

export default function SearchBar(){

    const [name, setName] = useState('')
    const dispatch = useDispatch()

        let history = useHistory();
      
       
    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
        if(e.target.value === ''){
            dispatch(getDogs())
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogByName(name)) 
    }

    function handleResetSearch(e){
        e.preventDefault()
        dispatch(getDogs());
    }

    return (
        <form onSubmit={e => handleSubmit(e)}> 
            <input  className={'searchInput'} type='text' placeholder='Search dog' value={name} onChange={e => handleChange(e)}/>
            <button type='submit' >Search</button>        
        </form>
    )
}