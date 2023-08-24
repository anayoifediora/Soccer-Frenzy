import React from 'react';


const Footer = () => {
    return (
        <footer className="footer" >
            <div className="m-2">
                <i className="bi bi-instagram" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
                <i className="bi bi-linkedin" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
                <i className="bi bi-github" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
                <i className="bi bi-facebook" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
            </div>
            <div>
                &copy; 2021
            </div>
        </footer>
    );
};

export default Footer;