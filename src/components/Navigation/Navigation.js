import React from 'react';
import styles from './Navigation.css'
import {NavLink} from 'react-router-dom';

const navigation = () => {
    return (
        <div className = {styles.Nav}>
                    <NavLink 
                        to="/movies/popular/page/1"
                        activeStyle = {{color: "red"}}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/movies/favorite/page/1"
                        activeStyle = {{color: "red"}}
                    >
                        Favorites
                    </NavLink>
                </div>
    );
}

export default navigation;
