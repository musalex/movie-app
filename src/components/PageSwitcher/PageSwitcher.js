import React from 'react';
import styles from './PageSwitcher.css';
import {Link, withRouter} from 'react-router-dom';

const pageSwitcher = (props) => {
    let style = {
        top: (props.screenSize / 2) - 70 + 'px'
    }
    let classes = [props.direction === 'next' ? styles.Next : styles.Prev, styles.PageSwitcher].join(' ');
    let path = props.location.pathname, pageNumber = +props.match.params.pageNumber;
    let change = props.direction === 'next' ? 1 : -1;
    console.log(path)
    return (
        <Link to = {path.slice(0,path.lastIndexOf('/') + 1) + (pageNumber + change)}>
            <div 
                className = {classes} 
                style = {style}
                onClick = {props.click}
            />
        </Link>
    );
}

export default withRouter(pageSwitcher);
