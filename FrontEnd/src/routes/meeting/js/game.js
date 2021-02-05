import React, { useState, useEffect } from 'react';
import axios from "axios";

import "../css/meeting.css"

import { Link } from "react-router-dom";

import moment from 'moment';
import 'moment/locale/ko';

import Posts from "../../../components/meeting/Posts"

import Pagination from '../../../components/common/Pagination'

const Game = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/meeting/game');
            
          setPosts(res.data);
          setLoading(false);
        }
    
        if (sessionStorage.getItem("token") != null) {
            document.getElementById('writeBtn').setAttribute("style", "display:block");
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
        
      <div id="main_content">
        <div id="meeting_list">
                <div id="sub_wrap">
                    <div id="sub_menu">
                        <ul>
                        <Link to={{pathname: `/meeting/exercise`}}>
                                <li id="exercise">운 동</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/music` }}>
                                <li id="music" >음 악</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/game` }}>
                                <li id="game" className="onPage">게 임</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/diy` }}>
                                <li id="diy">D.I.Y</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/lans` }}>
                                <li id="lans">랜선 모임</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/study` }}>
                                <li id="study">스터디</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                
                <div className="titles">
                    <h1 className="tit">게 임</h1>
                    <p className="subtit">세상에 없던 게임! 이 있을까...?<br/>- Prestto</p>
                </div>
            <Posts posts={currentPosts} loading={loading} />

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
                loading={loading}
            />

            <div id="writeBtn" className="writeBtn">
                <Link
                    to={{
                        pathname: `/meeting/write`,
                        state: {
                            date: moment().add(1, 'd')._d
                        }
                    }}
                >
                    <button >등록하기</button>
                </Link>
            </div>

            </div>
            </div>
    )
}

export default Game;