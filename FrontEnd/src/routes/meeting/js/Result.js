import React, { useState, useEffect } from 'react';
import axios from "axios";

import "../css/meeting.css"

import Posts from "../../../components/meeting/Posts"

import Pagination from '../../../components/common/Pagination'


const Result = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    const { location } = props;

    useEffect(() => {
        const fetchPosts = async () => {

            setLoading(true);
            
            const res=
                await axios.get('http://i4a304.p.ssafy.io/myapp/meeting/search', {
                    params: {
                        condition: location.state.selectoption,
                        keyword: location.state.keyWord
                    }
                });
          setPosts(res.data.list);
          setLoading(false);
        }
        fetchPosts();
    }, [location.state.keyWord]);

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
        <div id="meeting_list">
            <div className="titles">
                <h1 className="tit">검색 결과</h1>
            </div>
            <Posts posts={currentPosts} loading={loading} />

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            </div>
            </div>
    )
}

export default Result;

