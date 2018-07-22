import React, { PureComponent } from 'react';
import axios from '../../axios-config';
import Movies from '../../components/Movies/Movies';
import SearchBar from '../../components/SearchBar/SearchBar';
import debounce from '../../debounce';
import Spinner from '../../components/Spinner/Spinner';
import styles from './MoviesPage.css';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import key from '../../api_key';

class MoviesPage extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            data: null,
            loading: true,
        }

        //this.inputRef = React.createRef();
        this.updateData = debounce(this.updateData, 700);
        this.screenSizeY = parseInt(document.documentElement.clientHeight, 10);
    }
    
    
    componentDidMount() {
        console.log('[DidMount]', this.props)
        let {queryName, pageNumber} = this.props.match.params;
        let path = queryName ? '/search/' + encodeURI(queryName) : '/popular';
        let url = (queryName ? '/search/movie' + key + '&query=' + encodeURI(queryName) : '/movie/popular' + key);
        if (pageNumber > 1000) {
            this.props.history.replace('/movies' + path + '/page/1000');
            this.setState({
                loading: true,
            })
            return;
        }

        axios.get(url + '&page=' + pageNumber)
            .then(response => {
                let pages  = response.data.total_pages;
                if (pageNumber > pages) {
                    this.props.history.replace(`/movies${path}/page/${pages-1}`);
                    this.setState({
                        loading: true,
                    })
                } else {
                    console.log(response)
                    let movieList = response.data;
                    axios.get('/genre/movie/list' + key)
                        .then(genreResponse => {
                            let genreNames = genreResponse.data.genres;
                            for (let movie of movieList.results) {
                                movie.genres = movie.genre_ids.map(
                                    id => genreNames.find(
                                        genre => genre.id === id
                                    ).name
                                )
                            }

                            this.setState({
                                data: movieList,
                                loading: false,
                            })
                        })
                }
            })
    }


    componentDidUpdate() {
        console.log('[DidUpdate]', this.props);
        this.updateData();
        // this.inputRef.focus();
    }

    changeHandler = (e) => {
        this.props.history.push('/movies/search/' + encodeURI(e.target.value) + '/page/1')
    }

    switchPage = () => {
        this.setState({
            loading: true
        })
    }

    updateData() {
        let {queryName, pageNumber} = this.props.match.params;
        let path = queryName ? '/search/' + encodeURI(queryName) : '/popular';
        let url = (queryName ? '/search/movie' + key + '&query=' + encodeURI(queryName) : '/movie/popular' + key);
        if (pageNumber > 1000) {
            this.props.history.replace('/movies/' + path + '/1000');
            return;
        }
            axios.get(url + '&page=' + pageNumber)
                .then(response => {
                    const toString = (arr) => arr.map(e=>e.title).join('-_-');
                    let movieList = response.data;
                    axios.get('/genre/movie/list' + key)
                        .then(genreResponse => {
                            let genreNames = genreResponse.data.genres;

                            for (let movie of movieList.results) {
                                movie.genres = movie.genre_ids.map(
                                    id => genreNames.find(
                                        genre => genre.id === id
                                    ).name
                                )
                            }
                            if (!this.state.data || (this.state.data && toString(response.data.results) !== toString(this.state.data.results))) {
                                this.setState({
                                    data: movieList,
                                    loading: false,
                                })
                            }
                        })
                })
                 
    }

    render() {
        console.log('Loading = ', this.state.loading)
        let displayElement = <Spinner />;
        if (!this.state.loading) {
            let movies = this.state.data.results;
            displayElement = (
                <div className={styles.NoResults}>
                    No search results
                </div>
            )
            if (movies.length) {
                displayElement = <Movies data = {movies} />
            }
        }
        return (
            <React.Fragment>
                <SearchBar
                    myRef = {el => this.inputRef = el}
                    change = {this.changeHandler} 
                    val = {this.props.match.params.queryName || ''}
                />
                {displayElement}
                <PageSwitcher click={this.switchPage} screenSize = {this.screenSizeY} direction="prev" />
                <PageSwitcher click={this.switchPage}screenSize = {this.screenSizeY} direction="next" />
            </React.Fragment>
        );
    }
}

export default MoviesPage;
