import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments } from "../actions";
import { Link } from 'react-router-dom'
import Dog from "./Dog";
import SearchBar from './SearchBar';
import Select from 'react-select';



export default function Home() {
    const dispatch = useDispatch()
    const getAllDogs = useSelector((state) => state.dogs)
    let [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10)
    const [filteredByTemperaments, setFilteredByTemperaments] = useState({ id: 0, value: 'all', label: 'All Temperaments' });

    let previous = currentPage - 1;
    let next = currentPage + 1;

    let defaultTemperaments = { id: 0, value: 'all', label: 'All Temperaments' }

    const sourceFilters = [
        { id: 1, name: "all", label: "All Sources", value: "all" },
        { id: 2, name: "thedogapi", label: "Api dogs", value: "thedogapi" },
        { id: 3, name: "database", label: "Database Dogs", value: "database" }
    ]

    const [filteredBySource, setFilteredBySource] = useState(sourceFilters[0]);

    const sortedOptions = [
        { id: 1, name: 'ascendingAlfabetic', label: 'A - Z', value: 'ascendingAlfabetic' },
        { id: 2, name: 'descendingAlfabetic', label: 'Z - A', value: 'descendingAlfabetic' },
        { id: 3, name: 'ascendingWeight', label: 'Weight: Min to Max', value: 'ascendingWeight' },
        { id: 4, name: 'descendingWeight', label: 'Weight: Max to Min', value: 'descendingWeight' }
    ]

    const [sortedDogs, setSortedDogs] = useState(sortedOptions[0]);

    let [dogsPerPage, setDogsPerPage] = useState(getAllDogs.slice(0, 8))

    const temperamentsList = useSelector(state => state.temperaments)

    useEffect(() => {
        dispatch(getTemperaments());
        dispatch(getDogs());
    }, [])

    useEffect(() => {
        if (temperamentsList) {
            temperamentsList.unshift(defaultTemperaments)
        }
    }, [temperamentsList])

    useEffect(() => {
        if (getAllDogs) {
            for (let i = 0; i < getAllDogs.length; i++) {
                const minWeight = getAllDogs[i].min_weight ? getAllDogs[i].min_weight : 0
                const maxWeight = getAllDogs[i].max_weight ? getAllDogs[i].max_weight : 0
                getAllDogs[i].weightAverage = (minWeight + maxWeight) / 2

            }
        }
        resetFilters();
    }, [getAllDogs])


    useEffect(() => {
        displaySelectedDogs();
    }, [getAllDogs, filteredBySource, filteredByTemperaments, sortedDogs])



    function displaySelectedDogs() {

        let dogsToFilter = filteredBySource.value === 'all' ? getAllDogs : getAllDogs.filter(dog => (dog.source === filteredBySource.value))

        let dogsToFilterByTemp = filteredByTemperaments.value === 'all' ? dogsToFilter : dogsToFilter.filter(dog => dog.temperaments.some(e => e.name === filteredByTemperaments.name))

        setMaxPage(Math.ceil(dogsToFilterByTemp.length / 8));

        if (sortedDogs.value === 'ascendingAlfabetic') {
            dogsToFilterByTemp.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
        } else if (sortedDogs.value === 'descendingAlfabetic') {

            dogsToFilterByTemp.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                // a must be equal to b
                return 0;
            });
        } else {

            if (sortedDogs.value === 'ascendingWeight') {
                dogsToFilterByTemp = dogsToFilterByTemp.sort(function (a, b) {
                    return a.weightAverage - b.weightAverage;
                });
            } else if (sortedDogs.value === 'descendingWeight') {
                dogsToFilterByTemp.sort(function (a, b) {
                    return b.weightAverage - a.weightAverage;
                });
            }
        }

        let dogsToSet = currentPage === 1 ? dogsToFilterByTemp.slice(0, 8) : dogsToFilterByTemp.slice(8 * (currentPage - 1), 8 * (currentPage))

        setDogsPerPage(dogsToSet);
    }

    function resetFilters() {
        setCurrentPage(1)
        setFilteredBySource(sourceFilters[0])
        setFilteredByTemperaments({ id: 0, value: 'all', label: 'All Temperaments' })
        setSortedDogs(sortedOptions[0])
    }

    function handleReloadDogs(e) {
        dispatch(getDogs());
        resetFilters();
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

    function handleSort(e) {
        setCurrentPage(1)
        setSortedDogs(e)

    }

    function handleFilteredTemperament(e) {
        setCurrentPage(1)
        setFilteredByTemperaments(e)
    }

    function handleFilteredSource(e) {
        setCurrentPage(1);
        setFilteredBySource(e);
    }

    return (
        <div>
            <div>This is the Dog's API</div>
            <button onClick={e => handleReloadDogs(e)}> Reload all dogs</button>
            <SearchBar />
            <div>
                <div style={{ display: 'inline-block', margin: 10 }}>
                    <div style={{ display: 'inline-block', width: 200, marginRight: 10 }}>
                        <Select options={sortedOptions} value={sortedDogs} onChange={e => handleSort(e)} />
                    </div>
                    {/* <div>{defalultImg.url}</div> */}
                    <div style={{ display: 'inline-block', width: 200, marginRight: 10 }}>
                        <Select options={temperamentsList} value={filteredByTemperaments} onChange={e => handleFilteredTemperament(e)} />
                    </div>
                    <div style={{ display: 'inline-block', width: 200 }}>
                        <Select options={sourceFilters} value={filteredBySource} onChange={handleFilteredSource} />
                    </div>
                </div>
                <div>
                    {currentPage > 1 && <button onClick={e => handlePreviousPage(e)}> Previous </button>}
                    <span >  | {currentPage}  of {maxPage}| </span>
                    {currentPage < maxPage && <button onClick={e => handleNextPage(e)}>  Next</button>}
                </div>
                {
                    dogsPerPage && dogsPerPage.map(dog => {
                        return (

                            <Dog key={dog.id} id={dog.id} name={dog.name} min_weight={dog.min_weight} max_weight={dog.max_weight} temperaments={dog.temperaments} image={dog.image} />
                        )
                    })
                }
            </div>
        </div>

    )
}