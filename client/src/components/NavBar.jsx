import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={'/home'}>Home</NavLink>
                    </li>
                <li>
                    <NavLink to={'/dogs'}>Dogs</NavLink>
                </li>
                <li>
                    <NavLink to={'/create'}>Create</NavLink>
                </li>
                <li>
                    <NavLink to={'/detail'}>Detalle</NavLink>
                </li>
            </ul>
        </nav>
    )
}