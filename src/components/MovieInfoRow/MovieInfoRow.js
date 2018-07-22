import React from 'react';
import css from './MovieInfoRow.css';

const movieInfoRow = ({data}) => {
    return (
        <tr className={css.InfoRow}>
            <td className={css.InfoType}>{data.type}</td>
            <td className={css.InfoDesc}>{data.desc}</td>
        </tr>
    );
}

export default movieInfoRow;
