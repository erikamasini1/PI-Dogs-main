import React from 'react';
// import { Link } from 'react-router-dom';

export default function Dog({id, name, height, weight, temperaments}) {
    return (
        <div>
            {/* <div>Dog number: {id}</div> */}
            {/* Name: <Link to={`/detail/${id}`}>{name}</Link> */}
            <div>Name:  {name}</div>
            <div>Height:  {height}</div>
            <div>Min Weight:  {weight}</div>
            <div>Temperaments:  {temperaments}</div>
        </div>
    )
}