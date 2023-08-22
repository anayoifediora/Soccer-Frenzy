import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Navigation = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    

    return (
        <div>
            {Auth.loggedIn() ? (
                <ul className="nav nav-pills justify-content-end" style={{flexWrap: "nowrap"}}>
                    <li className="nav-item" >
                        <Link className="nav-link active" aria-current="page" to={`/`}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={"/profile"}>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={logout}>Logout</button>
                    </li>
                </ul>
                    ) : (
                <>
                    <ul className="nav nav-pills justify-content-end" style={{flexWrap: "nowrap"}}>
                        <li className="nav-item" >
                            <Link className="nav-link active" aria-current="page" to={`/`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/signup"} tabIndex="-1">SignUp</Link>
                        </li>
                    </ul>
                </>
                    
            )}
            
        </div>
    )
}

export default Navigation;