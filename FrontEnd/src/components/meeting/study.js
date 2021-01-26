import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
 
function Study({ idx, id, maintitle, subtitle, date, hostid, detail, categoryno, file, meetinglike, enddate, participants }) {
    
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
                        file,
                        meetinglike,
                        enddate,
                        participants
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

Study.propTypes  = {
    id: propTypes.number.isRequired,
    maintitle: propTypes.string.isRequired,
    subtitle: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    hostid: propTypes.string.isRequired,
    detail: propTypes.string.isRequired,
    categoryno: propTypes.number.isRequired,
    file: propTypes.string.isRequired,
    meetinglike: propTypes.number.isRequired,
    enddate: propTypes.string,
    participants: propTypes.number.isRequired
};
 
export default Study;