import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <div>
            <div>Welcome</div>
            <Link to={'/home'}>
                <button>HOME</button> 
            </Link>
        </div>
    )
}