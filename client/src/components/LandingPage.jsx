import React from "react";
import {Link} from 'react-router-dom';
import defaultDog from'../assets/landing.jpeg';

import './LandingPage.css';

export default function LandingPage(){
    return(
        <div>
            <Link to={'/home'}>
                <div className='mainTitle'>WELCOME TO THE DOG'S API</div> 
            </Link>
            <img src={defaultDog} alt='img' className='landingPageImage' />
        </div>
    )
}