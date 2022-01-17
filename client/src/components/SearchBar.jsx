import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogByName } from '../actions';

export default function SearchBar(){

    const [name, setName] = useState('')
    const dispatch = useDispatch()



    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getDogByName(name))
        setName('')
        
        
    }

    return (
        <form onSubmit={e => handleSubmit(e)}> 
            <input  type='text' placeholder='Search dog' value={name} onChange={e => handleChange(e)}/>
            <button type='submit' >Search</button>           
        </form>
    )
}