import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
 
function MyleetingList({ id, maintitle, subtitle, date, hostid, detail, categoryno, file, meetinglike, enddate, participants }) {
    return (
        <div className="itemListView" style={{width: 150 + 'px', textAlign: "center"}}>
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
                <img src={file} alt={maintitle} style={{width: 100 + 'px', height: 100 + 'px'}}></img>
                <p className="font-weight-bold">{maintitle.slice(0,12)}</p>
            </Link>
        </div>
    );
}

MyleetingList.propTypes  = {
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
 
export default MyleetingList;