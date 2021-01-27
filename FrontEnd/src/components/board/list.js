import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
import moment from 'moment';
import 'moment/locale/ko';
 
function List({ no, title, detail, date, writer, hit, file1, file2, file3 }) {
    var t1 = moment(date);
    var t2 = moment();
    var t3 = moment.duration(t2.diff(t1)).asDays();

    var newsign = "";
    if (t3 < 3) {
        newsign = "NEW";
    }
    // var filecheck = false;
    // if (file1 === null && file2 === null && file3 === null) {
    //     filecheck = false;
    // } else {
    //     filecheck = true;
    // }

    var sYear = date.substring(0,4);
    var sMonth = date.substring(5,7);
    var sDate = date.substring(8,10);

    var dateformat = sYear + '-' + sMonth + '-' + sDate;
    
    return (
        <div className="content">
            <div className="no">{no}</div>
            <div className="title">
                <div className="b-title-box">
                    <Link
                        to={{
                            pathname: `/board/${no}`,
                            state: {
                                no,
                                title,
                                detail,
                                date,
                                writer,
                                hit,
                                file1,
                                file2,
                                file3
                            }
                        }}
                    >
                        <span title="자세히 보기">{title+"  "}</span>
                    </Link>
                        <div className="b-etc-box">
                            <sup className="b-new" id="b-new"><span>{newsign}</span></sup>
                        </div>
                </div>
            </div>
            <div className="writer">{writer}</div>
            <div className="date">{dateformat}</div>
            <div className="hit">{hit}</div>
            <div className="file"></div>
            
        </div>
            
    );
}

List.propTypes  = {
    no: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    detail: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    writer: propTypes.string.isRequired,
    hit: propTypes.number.isRequired,
    file1: propTypes.string,
    file2: propTypes.string,
    file3: propTypes.string
};

export default List;