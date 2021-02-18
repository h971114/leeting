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
            <div id="oneToOneNoPosts">
                <img src="../../img/noOTO.png" alt="글이없어요"></img>
            </div>
        )
    }
    return (
        <div id="notice_list_view" className="notice_list_view">
            <div className="header">
                <p className="no">No.</p>
                <p className="hit">카테고리</p>
                <p className="title">제목</p>
                <p className="writer">작성자</p>
                <p className="date">등록일</p>
            </div>


            <ul className="list-group">
                {posts.map(post => (
                    <List
                        key={post.no}
                        no={post.no}
                        type={post.type}
                        title={post.title}
                        date={post.date}
                        qwriter={post.qwriter}
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