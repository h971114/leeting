import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";
import moment from 'moment';
import 'moment/locale/ko';
 
function List({ no, type, title, qwriter, date}) {
    var t1 = moment(date);
    var t2 = moment();
    var t3 = moment.duration(t2.diff(t1)).asDays();

    var newsign = "";
    if (t3 < 3) {
        newsign = "NEW";
    }

    var sYear = date.substring(0,4);
    var sMonth = date.substring(5,7);
    var sDate = date.substring(8,10);

    var dateformat = sYear + '-' + sMonth + '-' + sDate;
    let typeString;
    if (type === 1) {
        typeString = "미팅"
    } else if (type === 2) {
        typeString = "회원"
    } else if (type === 3) {
        typeString = "페이지"
    } else {
        typeString = "기타"
    }

    return (
        <div className="content">
            <div className="no">
                {no}
            </div>
            <div className="hit">{typeString}</div>
            <div className="title">
                <div className="b-title-box">
                    <Link
                        to={{
                            pathname: `/sc/onetoone/${no}`,
                            state: {
                                no,
                                type,
                                title,
                                qwriter,
                                date
                            }
                        }}
                    >
                        <span title="자세히 보기">{title+"  "}</span>
                    </Link>
                        <div className="b-etc-box">
                            <sup className="b-new" id="b-new"><span>{newsign}</span></sup>
                        </div>
                    <div className="b-m-con">
                        <span className="b-writer">{qwriter}</span><span className="b-date">{dateformat}</span>
                    </div>
                </div>
            </div>
            <div className="writer">{qwriter}</div>
            <div className="date">{dateformat}</div>
        </div>
            
    );
}

List.propTypes  = {
    no: propTypes.number.isRequired,
    type: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    qwriter: propTypes.string.isRequired,
    date: propTypes.string.isRequired
};

export default List;