import React from 'react'
import List from "./reviewList"

const reviewPosts = ({ posts, loading }) => {
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
        <div className="list_view">
            <ul>
                {posts.map(post => (
                    <List
                        key={post.no}
                        id={post.no}
                        review={post.review}
                        writer={post.writer}
                        date={(post.date).substring(0,19)}
                    />
                ))}
            </ul>
        </div>

        
    )
}

export default reviewPosts;