import React from "react";
import { Link } from "react-router-dom";
import propTypes  from "prop-types";

function reviewList({ id, review, writer, date }) {
    
    let codes = review;

    return (
        <div className="reviewListView">
            <p className="reviewWriter">{writer}</p>
            <p className="reviewDate">{date}</p>
            <p className="detail_content" dangerouslySetInnerHTML={{ __html: codes} }></p>
        </div>
    );
}

reviewList.propTypes  = {
    id: propTypes.number.isRequired,
    review: propTypes.string.isRequired,
    writer: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
};
 
export default reviewList;