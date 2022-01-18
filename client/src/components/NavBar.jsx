import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';


export default function NavBar() {
    return (
        <div className={'navbar'}>
            <NavLink activeStyle={{ backgroundColor: '#BFA2DB' }} className={'navOptions'} to={'/home'}>Home</NavLink>
            <NavLink activeStyle={{ backgroundColor: '#BFA2DB' }} className={'navOptions'} to={'/create'}>Create</NavLink>
        </div>
    )
}