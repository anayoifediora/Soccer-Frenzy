import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {

    return (
        <div>
            <ul className="nav nav-pills justify-content-end" style={{flexWrap: "nowrap"}}>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={`/`}>Home</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">SignUp</a>
                </li>
            </ul>
        </div>
    )
}

export default Navigation;