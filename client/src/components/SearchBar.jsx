import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogByName, getDogs } from '../actions';
import './SearchBar.css';


export default function SearchBar() {

    const [name, setName] = useState('')
    const dispatch = useDispatch()

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
        if (e.target.value === '') {
            dispatch(getDogs())
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getDogByName(name))

    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <input className={'searchInput marginRightSmall'} type='text' placeholder='Search dog' value={name} onChange={e => handleChange(e)} />
            <button type='submit' >Search</button>
        </form>
    )
}