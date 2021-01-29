import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../css/board.css"

import Posts from "../../../components/board/Posts"
import Pagination from '../../../components/common/Pagination'

const Notice = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          const res = await axios.get('http://127.0.0.1:8080/myapp/notice/listnotice');
          setPosts(res.data);
          setLoading(false);
        }
    
        if (sessionStorage.getItem("nickname") === "관리자") {
            document.getElementById('writeBtn').setAttribute("style", "display:inline-block");
        }
        else {
            document.getElementById('writeBtn').setAttribute("style", "display:none");
        }
    
        fetchPosts();

    }, []);
    
    // console.log(posts);
    
      // Get current posts
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
      //change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
        
    return (
    <div className="board_list">
        <div className="titles">
            <h1 className="tit">공 지 사 항</h1>
        </div>

        <Posts posts={currentPosts} loading={loading} />

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />

        <div id="writeBtn" className="writeBtn">
        <button>등록하기</button>
        </div>
    </div>
    )
}

export default Notice;