import React from 'react';
import css from './Movie.css';
import {Link} from 'react-router-dom';

const imageNotFound = 'https://static1.squarespace.com/static/541339f0e4b06a3d5343bbf3/590396918419c2bcf19eb8f9/5993484537c581fc38321db8/1502824517922/Image+Coming+Soon.jpg?format=300w';


const movie = ({data}) => {
    let imagePath = data.poster_path ? 'http://image.tmdb.org/t/p/w300' + data.poster_path : imageNotFound;
        return (
        <div className={css.Movie}>
            <Link to={`/movie/${data.id}`}>
                <img 
                    className={css.Card} 
                    src={imagePath} 
                    alt={data.alt}
                />
            </Link>
            <div className={css.Title}>
                {(data.title.length > 45 ? data.title.slice(0,45) + '...' : data.title) + 
                (data.release_date ?  ' (' + data.release_date.slice(0,4) + ')' : '')} 
            </div>
            <div className = {css.Genres}>
                {data.genres.slice(0,3).join(', ')}
            </div>
            <div className={css.Vote}>
                {data.vote_average}
            </div>
        </div>
    );
}

export default movie;
