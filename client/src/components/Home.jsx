import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, filteredDogsBySource, filteredDogsByTemperament } from "../actions";
import { Link } from 'react-router-dom'
import Dog from "./Dog";

export default function Home() {
    const dispatch = useDispatch()
    const getAllDogs = useSelector((state) => state.dogs)

    let maxPage = Math.ceil(getAllDogs.length / 8)

    let [currentPage, setCurrentPage] = useState(1)
    let previous = currentPage - 1;
    let next = currentPage + 1;


    let [dogsPerPage, setDogsPerPage] = useState(getAllDogs.slice(0, 8))

    console.log(dogsPerPage.map(el => { return el.name }))

    useEffect(() => {
        dispatch(getDogs())
    }, [])

    useEffect(() => {
        displaySelectedDogs();
    }, [getAllDogs])

    function displaySelectedDogs() {
        let dogsToFilter = getAllDogs;
        let dogsToSet = currentPage === 1 ? dogsToFilter.slice(0, 8): dogsToFilter.slice(8 * (currentPage - 1), 8 * (currentPage))

        setDogsPerPage(dogsToSet);
    }

    function handleReloadDogs(e) {
        e.preventDefault();
        dispatch(getDogs())

    }

    function handlePreviousPage(e) {
        e.preventDefault();
        setCurrentPage(--currentPage)
        displaySelectedDogs();
    }

    function handleNextPage(e) {
        e.preventDefault();
        setCurrentPage(++currentPage)
        displaySelectedDogs();
    }

    // function handleFilteredTemperament(e){
    //     dispatch(filteredDogsByTemperament(e.target.value))
    // }

    function handleFilteredSource(e){
        // dispatch(filteredDogsBySource(e.target.value))
    }



    return (
        <div>
            <Link to='/dog'>CREATE DOG</Link>
            <div>This is the Dog's API</div>
            <button onClick={e => handleReloadDogs(e)}> Reload all dogs</button>
            <div>
                <select>
                    <option value='alfaasc'> A-Z</option>
                    <option value='alfadesc'> Z-A</option>
                    <option value='weightasc'> Weight Ascending order</option>
                    <option value='weightdesc'> Weight Descending order</option>
                </select>
                <select>
                    <option value='temperament'> HACER LO DE SELECCIONAR POR TEMPERAMENTO</option>
                </select>
                <select onChange={e => handleFilteredSource(e)}>
                    <option value='all'> All dogs</option>
                    <option value='thedogapi'> Api dogs</option>
                    <option value='database'> Db dogs</option>
                </select>
                <div>
                    {currentPage > 1 && <button onClick={e => handlePreviousPage(e)}> PREVIOUS </button>}
                    <span >  | {currentPage}  | </span>
                    {currentPage < maxPage && <button onClick={e => handleNextPage(e)}>  NEXT {next}</button>}
                </div>
                {
                    dogsPerPage && dogsPerPage.map((dog, id) => {
                        return (

                            <Dog key={id} name={dog.name} height={dog.height} weight={dog.weight} temperaments={dog.temperaments} image={dog.image} />
                        )
                    })
                }
            </div>
        </div>

    )
}