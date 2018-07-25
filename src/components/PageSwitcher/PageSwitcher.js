import React from 'react';
import styles from './PageSwitcher.css';
import {Link, withRouter} from 'react-router-dom';

const pageSwitcher = (props) => {
    let classes = [props.direction === 'next' ? styles.Next : styles.Prev, styles.PageSwitcher].join(' ');
    let path = props.location.pathname, pageNumber = +props.match.params.pageNumber;
    let change = props.direction === 'next' ? 1 : -1;
    
    return (
        <div className = {styles.Wrap} style = {props.direction === 'next' ? {right: 0} : {left: 0}}>
            <Link to = {path.slice(0,path.lastIndexOf('/') + 1) + (pageNumber + change)}>
                <div 
                    className = {classes} 
                    onClick = {!props.disabled ? props.click : null}
                />
            </Link>
        </div>
    );
}

export default withRouter(pageSwitcher);
