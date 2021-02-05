import React, { useState, useEffect } from 'react';
import axios from "axios";

import Posts from "../../../components/board/Posts"
import Pagination from '../../../components/common/Pagination'

const Board = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noPosts, setVPost] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const { location } = props;
    
    useEffect(() => {
        const fetchPosts = async () => {
            const meetingno = location.state.id;
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/meetingnotice/'+meetingno);
            setPosts(res.data);
            if (res.data.length === 0) {
                setVPost(true);
                setLoading(false);
            }
            else
                setLoading(false);
        }
        
        if (sessionStorage.getItem("id") === location.state.hostid) {
            document.getElementById('writeBtn').setAttribute("style", "display:inline-block");
        }
        else {
            document.getElementById('writeBtn').setAttribute("style", "display:none");
        }
        
        fetchPosts();
        
    }, []);
    
    console.log(posts);
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    

    //change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
            
    return (
        
    <div id="main_content">
    <div id="board_list" className="board_list">
        <div className="titles">
            <h1 className="tit">{location.state.id}번글 공지 사항</h1>
        </div>
            <Posts posts={currentPosts} loading={loading} noPosts={noPosts}/>

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
                loading={loading}
                noPosts={noPosts}
            />

        <div id="writeBtn" className="writeBtn">
        <button>등록하기</button>
        </div>
            </div>
            </div>
    )
}

export default Board;