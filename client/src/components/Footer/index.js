import React from 'react';


const Footer = () => {
    return (
        <footer className="footer" >
            <div className="m-2">
                <a href="https://www.instagram.com/kifediora/?next=%2F" target='_blank' rel="noreferrer">
                    <i className="bi bi-instagram" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
                </a>
                <a href="https://linkedin.com/in/kanayochi-ifediora-43422b20a" target='_blank' rel="noreferrer">
                    <i className="bi bi-linkedin" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
                </a>
                <a href='https://github.com/anayoifediora' target='_blank' rel="noreferrer">
                    <i className="bi bi-github" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
                </a>
                <a href="https://www.facebook.com/kanayo.ifediora" target='_blank' rel="noreferrer">
                    <i className="bi bi-facebook" style={{fontSize: '3rem', color: 'var(--light-cyan)'}}></i>
                </a>
            </div>
            <div>
                Copyright&copy; 2023
            </div>
        </footer>
    );
};

export default Footer;