import React from 'react'
import List from "./list"

export const Posts = ({ posts, loading, noPosts }) => {
    if (loading) {
        return (
            <div className="loading_view">
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
                <img src="img/noMyLeeting.png" alt="참여 리팅 없음"></img>
        </div>
        )
    }
    return (
        <div className="timeline_list_view">
            <ul>
                {posts.map(post => (
                    <List
                        key={post.no}
                        id={post.no}
                        writer={post.writer}
                        date={post.date}
                        detail={post.detail}
                        file={post.file}
                        contentslike={post.contentslike}
                        likestatus={post.likestatus}
                    />

                    // <li key={post.id} className='list-group-item'>
                    //     {post.title}
                    // </li>
                ))}
            </ul>
        </div>

        
    )
}

export default Posts;