import React from 'react';
import css from './SimilarMovies.css';
import Movie from '../Movie/Movie';

const similarMovies = ({data, myRef}) => {
    return (
        <div className = {css.Wrap}>
            <h3>Similar Movies:</h3>
            <div ref ={myRef} className = {css.SimilarMovies}>
                {data.map(item=>(
                    <Movie 
                        data = {item} 
                        key = {item.id}
                        k = {0.85}
                    />
                ))}
            </div>
        </div>
    );
}

export default similarMovies;
