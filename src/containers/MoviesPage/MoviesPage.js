import React, { PureComponent } from 'react';
import axios from '../../axios-config';
import Movies from '../../components/Movies/Movies';
import SearchBar from '../../components/SearchBar/SearchBar';
import debounce from '../../debounce';
import Spinner from '../../components/Spinner/Spinner';
import styles from './MoviesPage.css';

const key = '?api_key=daff65c036673bf55ddef790e717e11d';

class MoviesPage extends PureComponent {
    constructor(props) {
        super(props);
        
        this.state = {
            data: null,
            loading: true,
        }

        //this.inputRef = React.createRef();
        this.updateData = debounce(this.updateData, 700);
    }
    
    
    componentDidMount() {
        console.log('[DidMount]', this.props)
        console.log(this.inputRef)
        let {queryName, id} = this.props.match.params;
        let path = queryName ? '/search/' + encodeURI(queryName) : '/popular';
        let url = (queryName ? '/search/movie' + key + '&query=' + encodeURI(queryName) : '/movie/popular' + key);
        if (id > 1000) {
            this.props.history.replace('/movies' + path + '/page/1000');
            this.setState({
                loading: true,
            })
            return;
        }

        axios.get(url + '&page=' + id)
            .then(response => {
                let pages  = response.data.total_pages;
                if (id > pages) {
                    this.props.history.replace(`/movies${path}/page/${pages-1}`);
                    this.setState({
                        loading: true,
                    })
                } else {
                    this.setState({
                        data: response.data,
                        loading: false,
                    })
                }
            })
    }


    componentDidUpdate() {
        console.log('[DidUpdate]', this.props);
        this.updateData();
        this.inputRef.focus();
    }

    changeHandler = (e) => {
        this.props.history.push('/movies/search/' + encodeURI(e.target.value) + '/page/1')
    }

    updateData() {
        let {queryName, id} = this.props.match.params;
        let path = queryName ? '/search/' + encodeURI(queryName) : '/popular';
        console.log(queryName, encodeURI(queryName))
        let url = (queryName ? '/search/movie' + key + '&query=' + encodeURI(queryName) : '/movie/popular' + key);
        if (id > 1000) {
            this.props.history.replace('/movies/' + path + '/1000');
            return;
        }
            axios.get(url + '&page=' + id)
                .then(response => {
                    console.log(response)
                    const toString = (arr) => arr.map(e=>e.title).join('-_-');
                    if (!this.state.data || (this.state.data && toString(response.data.results) !== toString(this.state.data.results))) {
                        this.setState({
                            data: response.data,
                            loading: false,
                        })
                    }
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
            </React.Fragment>
        );
    }
}

export default MoviesPage;
