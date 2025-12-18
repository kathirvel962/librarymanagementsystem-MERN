import {Link} from 'react-router-dom';
import React from 'react';
import {toast} from 'react-hot-toast';
const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;