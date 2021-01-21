import React, { Component } from 'react';
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
 
function Game({ id, maintitle, subtitle, date, hostid, detail, categoryno, file }) {
    return (
        <div className="itemListView">
            <Link
                to={{
                    pathname: `/meeting/${id}`,
                    state: {
                        maintitle,
                        subtitle,
                        date,
                        hostid,
                        detail,
                        categoryno,
                        file
                    }
                }}
            >
                <img src={file} alt={maintitle}></img>
                <p className="subtit">{subtitle}</p>
                <p className="tit">{maintitle.slice(0,12)}</p>
            </Link>
        </div>
    );
}

Game.propTypes  = {
    id: propTypes.number.isRequired,
    maintitle: propTypes.string.isRequired,
    subtitle: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    hostid: propTypes.string.isRequired,
    detail: propTypes.string.isRequired,
    categoryno: propTypes.number.isRequired,
    file: propTypes.string.isRequired
};
 
export default Game;