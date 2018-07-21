import React from 'react';
import css from './SearchBar.css';

const searchBar = (props) => {
    return (
        <input 
            className={css.SearchBar} 
            type = "text" 
            placeholder = "Search..."   
            onChange = {props.change} 
            value = {props.val}
            ref = {props.myRef}
        />
    );
}

export default searchBar;
