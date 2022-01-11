import React from 'react';
// import { Link } from 'react-router-dom';

export default function Dog({ id, name, height, weight, temperaments, life_span, image }) {
    return (
        <div style={{ width: '20%', display: 'inline-block', textAlign: 'left', padding: 10 }}>
            {/* <div>Dog number: {id}</div> */}
            {/* Name: <Link to={`/detail/${id}`}>{name}</Link> */}
            <div style={{fontSize:18, fontWeight: 600 }}>{name}</div>

            {image && <img src={image} alt='img' width='200' height='200' style={{ objectFit: 'cover', marginTop: 5 }} />}
            <div>Height:  {height}</div>
            <div>Weight:  {weight}</div>
            <div>Life Span: {life_span}</div>
            <div>Temperaments:  <div>{temperaments && temperaments.map(temp => { return temp.name + ' ' })} </div>
            </div>
        </div>
    )
}