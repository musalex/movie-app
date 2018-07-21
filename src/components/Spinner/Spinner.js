import React from 'react';
import css from './Spinner.css';

const spinner = () => {
    let style = [css['lds-css'], css['ng-scope']].join(' ');
    return (
        <React.Fragment>
            <div className = {style} >
                <div className={css['lds-spinner']} style={{
                    opacity: "1",
                    height: "100%",
                }}>
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />    
                </div>   
            </div>
        </React.Fragment>
    );
}

export default spinner;
