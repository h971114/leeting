import React from 'react'
import List from "./recoList"

export const Posts = ({ posts, loading }) => {
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
    return (
        <div className="list_view" id="slide">
            <input type="radio" name="pos" id="pos1" defaultChecked/>
            <input type="radio" name="pos" id="pos2"/>
            <input type="radio" name="pos" id="pos3"/>
            <input type="radio" name="pos" id="pos4"/>
            <input type="radio" name="pos" id="pos5"/>
            <ul>
                {posts.map(post => (
                    <List
                        key={post.meetingno}
                        id={post.meetingno}
                        maintitle={post.maintitle}
                        subtitle={post.subtitle}
                        date={post.date}
                        hostid={post.hostid}
                        categoryno={post.categoryno}
                        file={post.file}
                        meetinglike={post.meetinglike}
                        enddate={post.enddate}
                        participants={post.participants}
                    />
                ))}
            </ul>
            <p className="pos">
                <label htmlFor="pos1">1</label>
                <label htmlFor="pos2">2</label>
                <label htmlFor="pos3">3</label>
                <label htmlFor="pos4">4</label>
                <label htmlFor="pos5">5</label>
            </p>
        </div>

        
    )
}

export default Posts;