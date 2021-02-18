import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
 
function RecoList({ idx, id, maintitle, subtitle, date, hostid, categoryno, file, meetinglike, enddate, participants }) {
    var title = maintitle;

    if (title.length > 11) {
        title = title.substring(0, 10) + "...";
    }
    date = date.substring(0, 10);
    // // console.log(title);

    return (
        <li className="recoListView">
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
                <div className="intro">
                    <p className="tit">{title}</p>
                    <p className="subtit">{subtitle}</p>
                    <p className="hostid">호스트 : {hostid}</p>
                    <p className="date">일정 : {date} ~ {enddate}</p>
                    <p className="like">좋아요 수 : {meetinglike},  참여자 수 : {participants}</p>
                    {/* <p className="participants">참여자 수 : {participants}</p> */}
                </div>
            </Link>
        </li>
    );
}

RecoList.propTypes  = {
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
 
export default RecoList;