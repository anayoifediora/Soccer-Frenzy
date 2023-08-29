import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Auth from '../../utils/auth';

const Navigation = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        window.location.assign('/');
    };
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <ul className="nav nav-pills justify-content-end" style={{flexWrap: "nowrap"}}>
                    <li className="nav-item" >
                        <Link className="nav-link text-light" aria-current="page" to={`/`}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light" to={"/profile"}>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link text-light" onClick={logout}>Logout</button>
                    </li>
                </ul>
                    ) : (
                <>
                    <ul className="nav nav-pills justify-content-end" style={{flexWrap: "nowrap"}}>
                        <li className="nav-item" >
                            <Link className="nav-link text-light" aria-current="page" to={`/`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to={"/login"}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to={"/signup"} tabIndex="-1">SignUp</Link>
                        </li>
                    </ul>
                </>
                    
            )}
            
        </div>
    )
}

export default Navigation;