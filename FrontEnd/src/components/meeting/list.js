import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
 
function Study({ idx, id, maintitle, subtitle, date, hostid, categoryno, file, meetinglike, enddate, participants }) {
    var title = maintitle;

    if (title.length > 11) {
        title = title.substring(0, 10) + "...";
    }
    // // console.log(title);

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
                <p className="tit">{title}</p>
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
    categoryno: propTypes.number.isRequired,
    file: propTypes.string.isRequired,
    meetinglike: propTypes.number.isRequired,
    enddate: propTypes.string,
    participants: propTypes.number.isRequired
};
 
export default Study;