import React, { Component } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import axios from '../../axios-config';
import key from '../../api_key';
import css from './MovieInfo.css';
import MovieInfoRow from '../../components/MovieInfoRow/MovieInfoRow';

const imageSite = 'https://image.tmdb.org/t/p';
const backdrop = '/w1400_and_h450_face';
const imageNotFound = 'https://static1.squarespace.com/static/541339f0e4b06a3d5343bbf3/590396918419c2bcf19eb8f9/5993484537c581fc38321db8/1502824517922/Image+Coming+Soon.jpg?format=300w';

class MovieInfo extends Component {
    state = {
        data: {},
        loading: true,
    }

    componentDidMount() {
        console.log('[MovieEl DidMount]', this.props);
        axios.get(`/movie/${this.props.match.params.id}${key}`)
            .then(response => {
                console.log(response.data)
                this.setState({
                    data: response.data,
                    loading: false,
                })
            })
    }
    render() {
        if (this.state.loading) {
            return <Spinner />
        }
        let data = this.state.data;
        let fontSize = data.overview.length < 50 ? '18px' : data.overview.length > 500 ? '14px' : '16px';

        const InfoTable = [
            {
                type: 'Release',
                desc: data.release_date
            },
            {
                type: 'Country',
                desc: data.production_countries.map(e=>e.name).join(', ')
            },
            {
                type: 'Genres',
                desc: data.genres.map(e=>e.name).join(', ')
            },
            {
                type: 'Budget',
                desc: '$' + data.budget
            },
            {
                type: 'Revenue',
                desc: '$' + data.revenue
            },
            {
                type: 'Tagline',
                desc: data.tagline
            },
            {
                type: 'Runtime',
                desc: data.runtime + ' min / ' + duration(data.runtime)
            },
            {
                type: 'Companies',
                desc: data.production_companies.map(e=>e.name).join(', ')
            }
        ]

        return (
            <div className = {css.Wrap}>
                <div className = {css.BackDrop}
                    style = {{backgroundImage : `url(${imageSite + backdrop + data.backdrop_path})`}}
                >
                    <div className = {css.BackDropColor}>
                        {this.state.data.title}
                    </div>
                </div>
                <div className = {css.InfoWrap}>
                    <div className = {css.PosterWrap}>
                        <img 
                            className = {css.Poster}
                            src={data.poster_path ? `${imageSite}/w500${data.poster_path}` : imageNotFound} alt={data.title} 
                        />
                    </div>
                    <div className = {css.Information}>
                        <table>
                            <tbody>
                                {InfoTable.map((el,i)=>(
                                    <MovieInfoRow data = {el} key = {i} />
                                ))}
                            </tbody>
                        </table>
                        <div style = {{fontSize}} className={css.Description}>
                            {data.overview}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function duration(mins) {
    let hours = 0;
    while (mins >= 60) {
        mins-=60; hours++
    }
    if (hours < 10)
        hours = '0' + hours;
    if (mins < 10) 
        mins = '0' + mins;
    return hours + ':' + mins;
}

export default MovieInfo;
