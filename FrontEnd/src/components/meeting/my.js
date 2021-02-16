import React from 'react'
import List from "./list"
import { Link } from "react-router-dom";

export const Posts = ({ posts, loading, noPosts }) => {
    if (loading) {
        return (
            <div className="main_loading_view">
                <div className="loader loader-7">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                    <div className="line line3"></div>
                    <span className="loader_text">Loading...</span>
                </div>
            </div>
        )
    }
    if (noPosts) {
        return (
            <div id="myleetingNo">
            <Link
                to={{
                    pathname: `/meeting/exercise`
                }}
            >
                <img src="img/noMyLeeting.png" alt="참여 리팅 없음"></img>
            </Link>
        </div>
        )
    }
    return (
        <div className="list_view">
            <ul>
                {posts.map(post => (
                    <List
                        key={post.meetingno}
                        id={post.meetingno}
                        maintitle={post.maintitle}
                        subtitle={post.subtitle}
                        date={post.date}
                        hostid={post.hostid}
                        detail={post.detail}
                        categoryno={post.categoryno}
                        file={post.file}
                        meetinglike={post.meetinglike}
                        enddate={post.enddate}
                        participants={post.participants}
                    />
                ))}
            </ul>
        </div>

        
    )
}

export default Posts;