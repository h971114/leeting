import React, { useState, useEffect } from 'react';
import axios from "axios";

import "../css/timeline.css"

import { Link } from "react-router-dom";

import Posts from "../../../components/timeline/Post"

import Pagination from '../../../components/common/Pagination'

const Timeline = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const id = sessionStorage.length === 0 ? "":sessionStorage.getItem("id");
            const res = await axios.get('http://127.0.0.1:8080/myapp/contents/', {
                params:{
                    "userid": id
                }
            });
            setPosts(res.data.contentsList);
            setLoading(false);
        }
        
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
        
        fetchPosts();
        // eslint-disable-next-line
    }, []);

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
            <div id="timeline" className="timeline">
                <div className="timeline_titles">
                    <h1 className="tit">Leeting 타임 라인</h1>
                </div>
                <Posts posts={currentPosts} loading={loading} />

            </div>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    loading={loading}
                />
                <div id="timelineWriteBtn" className="writeBtn">
                    <Link
                        to={{
                            pathname: `/timeline/write`
                        }}
                    >
                        <button >등록하기</button>
                    </Link>
                </div>
        </div>
    )
}

export default Timeline;
