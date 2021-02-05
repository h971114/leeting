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
            <div id="noPosts">
                <img src="../../img/noPosts.png" alt="글이없어요"></img>
            </div>
        )
    }
    return (
        <div id="notice_list_view" className="notice_list_view">
            <div className="header">
                <p className="no">NO.</p>
                <p className="title">제목</p>
                <p className="writer">작성자</p>
                <p className="date">등록일</p>
                <p className="hit">조회</p>
                <p className="file">파일</p>
            </div>


            <ul className="list-group">
                {posts.map(post => (
                    <List
                        key={post.no}
                        no={post.no}
                        title={post.title}
                        detail={post.detail}
                        date={post.date}
                        writer={post.writer}
                        hit={post.hit}
                        file1={post.file1}
                        file2={post.file2}
                        file3 = { post.file3 }
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