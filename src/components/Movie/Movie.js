import React from 'react';
import css from './Movie.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const imageNotFound = 'https://static1.squarespace.com/static/541339f0e4b06a3d5343bbf3/590396918419c2bcf19eb8f9/5993484537c581fc38321db8/1502824517922/Image+Coming+Soon.jpg?format=300w';


const movie = (props) => {
    let imagePath = props.data.poster_path ? 'http://image.tmdb.org/t/p/w300' + props.data.poster_path : imageNotFound;
    let style = { transform: `scale(${props.k})` };
    let isFavorite = props.favorites.indexOf(props.data.id + '') !== -1;
    let favClass = [css.Favorite, isFavorite ? css.FavoriteAdded : css.FavoriteRemoved].join(' ');

    function localHandler(e) {
        console.log('click');
        let isFavorite = props.favorites.indexOf(props.data.id + '') !== -1;
        console.log(props.favorites);
        let id = props.data.id + '';
        if (!isFavorite) {
            props.onFavAdd(id)
        } else {
            props.onFavDel(id)
        }
    }
        return (
        <div className={css.Movie} style = {style}>
            <div 
                id = {props.data.id} 
                className = {favClass}
                onClick = {localHandler}
            />
            <Link to={`/movie/${props.data.id}`}>
                <img 
                    className={css.Card} 
                    src={imagePath} 
                    alt={props.data.alt}
                />
            </Link>
            <div className={css.Title}>
                {(props.data.title.length > 45 ? props.data.title.slice(0,45) + '...' : props.data.title) + 
                (props.data.release_date ?  ' (' + props.data.release_date.slice(0,4) + ')' : '')} 
            </div>
            <div className = {css.Genres}>
                {props.data.genres.slice(0,3).join(', ')}
            </div>
            <div className={css.Vote}>
                {props.data.vote_average}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFavAdd: (id) => dispatch({type: 'ADD_FAV', id: id}),
        onFavDel: (id) => dispatch({type: 'DEL_FAV', id: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(movie);
