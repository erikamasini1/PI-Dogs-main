import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";
import {Link} from 'react-router-dom'
import Dog from "./Dog";

export default function Home(){
    const dispatch = useDispatch()
    const getAllDogs = useSelector ((state) => state.dogs)

    useEffect(()=>{
        dispatch(getDogs())
    },[])

    function handleReloadDogs(e){
        e.preventDefault();
        dispatch(getDogs())

    }

    return(
        <div>
            <Link to='/dog'>CREATE DOG</Link>
            <div>This is the Dog's API</div>
            <button onClick={e => handleReloadDogs(e)}> Reload all dogs</button>
            <div>
                <select>
                    <option value='alfaasc'> Alfabetical Ascending order</option>
                    <option value='alfadesc'> Alfabetical Descending order</option>
                    <option value='weightasc'> Weight Ascending order</option>
                    <option value='weightdesc'> Weight Descending order</option>
                </select>
                <select>
                <option value='temperament'> HACER LO DE SELECCIONAR POR TEMPERAMENTO</option>
                </select>
                <select>
                <option value='all'> All dogs</option>
                <option value='api'> Api dogs</option>
                <option value='db'> Db dogs</option>
                </select>
                {
                    getAllDogs && getAllDogs.map(dog => 
                        {return(
                            
                            <Dog name={dog.name} height={dog.height} weight={dog.weight} temperament={dog.temperament}/>
                        )})
                }
            </div>
        </div>
        
    )
}