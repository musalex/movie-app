import React from 'react';
import css from './Movies.css';
import Movie from '../Movie/Movie';

const movies = ({data, k}) => {
    return (
        <div className = {css.Movies}>
            {data.map(item=>(
                <Movie 
                    data = {item} 
                    key = {item.id}
                    k = {k}
                />
            ))}
        </div>
    );
}

export default movies;
