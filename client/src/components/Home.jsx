import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, cleanDogDetail } from "../actions";
import Dog from "./Dog";
import SearchBar from './SearchBar';
import './Home.css'
import Loading from "./Loading";

export default function Home() {
    const dispatch = useDispatch()
    const getAllDogs = useSelector((state) => state.dogs)

    let [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState()
    let defaultTemperaments = 'all';
    const [filteredByTemperaments, setFilteredByTemperaments] = useState(defaultTemperaments);

    const sourceFilters = [
        { label: "All Sources", value: "all" },
        { label: "Api dogs", value: "thedogapi" },
        { label: "Database Dogs", value: "database" }
    ]

    const [filteredBySource, setFilteredBySource] = useState(sourceFilters[0].value);

    const sortedOptions = [
        { label: 'A - Z', value: 'ascendingAlfabetic' },
        { label: 'Z - A', value: 'descendingAlfabetic' },
        { label: 'Weight: Min to Max', value: 'ascendingWeight' },
        { label: 'Weight: Max to Min', value: 'descendingWeight' },
        { label: 'Height: Min to Max', value: 'ascendingHeight' },
        { label: 'Height: Max to Min', value: 'descendingHeight' }
    ]

    const [sortedDogs, setSortedDogs] = useState(sortedOptions[0].value);

    let [dogsPerPage, setDogsPerPage] = useState(getAllDogs.slice(0, 8))

    const temperamentsList = useSelector(state => state.temperaments);

    const temperamentSelectId = "temperamentSelect";
    const sortBySelectId = "sortBySelect";
    const sourceSelectId = "sourceSelect";

    useEffect(() => {
        dispatch(cleanDogDetail())
        dispatch(getTemperaments());
        dispatch(getDogs());
    }, [])

    useEffect(() => {
        if (getAllDogs) {
            for (let i = 0; i < getAllDogs.length; i++) {
                const minWeight = getAllDogs[i].min_weight ? getAllDogs[i].min_weight : 0;
                const maxWeight = getAllDogs[i].max_weight ? getAllDogs[i].max_weight : 0;
                getAllDogs[i].weightAverage = (minWeight + maxWeight) / 2;
            }
        }
        resetFilters();
    }, [getAllDogs])


    useEffect(() => {
        displaySelectedDogs();
    }, [getAllDogs, filteredBySource, filteredByTemperaments, sortedDogs])

    function displaySelectedDogs() {

        let dogsToFilter = filteredBySource === 'all' ? getAllDogs : getAllDogs.filter(dog => (dog.source === filteredBySource))

        let dogsToFilterByTemp = filteredByTemperaments === defaultTemperaments ? dogsToFilter : dogsToFilter.filter(dog => dog.temperaments.some(e => e.name === filteredByTemperaments))

        let newMaxPage = Math.ceil(dogsToFilterByTemp.length / 8)
        if (newMaxPage === 0) {
            newMaxPage = 1;
        }
        setMaxPage(newMaxPage);

        if (sortedDogs === 'ascendingAlfabetic') {
            dogsToFilterByTemp.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return -1;
                }
                return 0;
            });
        } else if (sortedDogs === 'descendingAlfabetic') {

            dogsToFilterByTemp.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1;
                }
                if (a.name.toLowerCase() < b.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        } else {

            if (sortedDogs === 'ascendingWeight') {
                dogsToFilterByTemp = dogsToFilterByTemp.sort(function (a, b) {
                    return a.weightAverage - b.weightAverage;
                });
            } else if (sortedDogs === 'descendingWeight') {
                dogsToFilterByTemp.sort(function (a, b) {
                    return b.weightAverage - a.weightAverage;
                });
            } else if (sortedDogs === 'ascendingHeight') {
                dogsToFilterByTemp = dogsToFilterByTemp.sort(function (a, b) {
                    return a.min_height - b.min_height;
                });
            } else if (sortedDogs === 'descendingHeight') {
                dogsToFilterByTemp.sort(function (a, b) {
                    return b.min_height - a.min_height;
                });
            }
        }

        let dogsToSet = currentPage === 1 ? dogsToFilterByTemp.slice(0, 8) : dogsToFilterByTemp.slice(8 * (currentPage - 1), 8 * (currentPage))

        setDogsPerPage(dogsToSet);
    }

    function resetFilters() {
        setCurrentPage(1);
        setFilteredBySource(sourceFilters[0].value);
        setFilteredByTemperaments(defaultTemperaments);
        setSortedDogs(sortedOptions[0].value);


        document.getElementById(temperamentSelectId).value = defaultTemperaments;
        document.getElementById(sourceSelectId).value = sourceFilters[0].value;
        document.getElementById(sortBySelectId).value = sortedOptions[0].value;
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
        setSortedDogs(e.target.value)

    }

    function handleFilteredTemperament(e) {
        setCurrentPage(1)
        setFilteredByTemperaments(e.target.value)
    }

    function handleFilteredSource(e) {
        setCurrentPage(1);
        setFilteredBySource(e.target.value);
    }

    return (
        <div className={'homeMainContainer'}>
            <div>
                <Loading />
                <span className={'searchBar'}> <SearchBar /> </span>
                <span className={'removeButton marginLeftSmall'}> {(filteredBySource !== 'all' || filteredByTemperaments !== 'all') &&
                    <button onClick={e => handleReloadDogs(e)}> Remove filters</button>} </span>
            </div>
            <div>
                <div style={{ display: 'inline-block', margin: 10 }}>
                    <div className={'options'}>
                        <select id={sortBySelectId} className='inputBox' onChange={handleSort}>
                            {sortedOptions && sortedOptions.map((t) => {
                                return (
                                    <option value={t.value} key={t.value} >{t.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={'options'}>
                        <select className='inputBox' id={temperamentSelectId} onChange={e => handleFilteredTemperament(e)}>
                            <option value={'all'} key={'all'} >All temperaments</option>
                            {temperamentsList && temperamentsList.map((t) => {
                                return (
                                    <option value={t.name} key={t.id} >{t.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className={'options'}>

                        <select className='inputBox' id={sourceSelectId} onChange={handleFilteredSource}>
                            {sourceFilters && sourceFilters.map((t) => {
                                return (
                                    <option value={t.value} key={t.value} >{t.label}</option>
                                )
                            })}
                        </select>
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
                            <span key={dog.id}>
                                <Dog key={dog.id} id={dog.id} name={dog.name} min_weight={dog.min_weight} max_weight={dog.max_weight} min_height={dog.min_height} temperaments={dog.temperaments} image={dog.image} />

                            </span>
                        )
                    })
                }
            </div>

        </div>

    )
}