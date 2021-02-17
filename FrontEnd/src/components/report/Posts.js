import React from 'react'
import List from "./list"

export const Posts = ({ posts, loading, noPosts }) => {
    // // console.log(posts);
    
    if (noPosts) {
        return (
            <div id="reportNoPosts">
                <img src="../../img/cleanLeeting.png" alt="글이없어요"></img>
            </div>
        )
    }

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
    return (
        <div id="notice_list_view" className="notice_list_view">
            <div className="header">
                <p className="id">신고자</p>
                <p className="reportid">신고대상자</p>
                <p className="reportdate">등록일</p>
            </div>


            <ul className="list-group">
                {posts.map(post => (
                    <List
                        key={post.no}
                        no={post.no}
                        id={post.id}
                        reportid={post.reportid}
                        detail={post.detail}
                        date={post.date}
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