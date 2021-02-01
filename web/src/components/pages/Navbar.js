// vendor imports
import React from 'react'
import { Link } from 'react-router-dom';
// constants
import ROUTES from '../../data/routes';

const Navbar = () => {
    return ( 
        <ul className="navigation-list">
            <li><Link to={ROUTES.ROOT}><img src="https://www.self-directed.org/img/tp/TP-podcast-FW.png" style={{width:"200px", height:"100px"}}/></Link></li>
            <li><Link to={ROUTES.ROOT}>Сите</Link></li>
        </ul>
     );
}
 
export default Navbar;