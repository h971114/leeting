import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
 
function Lans({ id, maintitle, subtitle, date, hostid, detail, categoryno, file }) {
    return (
        <div className="itemListView">
            <Link
                to={{
                    pathname: `/meeting/${id}`,
                    state: {
                        id,
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

Lans.propTypes  = {
    id: propTypes.number.isRequired,
    maintitle: propTypes.string.isRequired,
    subtitle: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    hostid: propTypes.string.isRequired,
    detail: propTypes.string.isRequired,
    categoryno: propTypes.number.isRequired,
    file: propTypes.string.isRequired
};
 
export default Lans;