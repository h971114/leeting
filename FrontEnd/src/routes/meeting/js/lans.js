import React, { useState, useEffect } from 'react';
import axios from "axios";

import "../css/meeting.css"

import { Link } from "react-router-dom";

import moment from 'moment';
import 'moment/locale/ko';

import Posts from "../../../components/meeting/Posts"

import Pagination from '../../../components/common/Pagination'

const Lans = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    
    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/meeting/lans');
            
          setPosts(res.data);
          setLoading(false);
        }
    
        if (sessionStorage.getItem("token") != null) {
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
        <div id="meeting_list">
                <div id="sub_wrap">
                    <div id="sub_menu">
                        <ul>
                            <Link to="/meeting/exercise">
                                <li id="exercise">운 동</li>
                            </Link>
                            <Link to="/meeting/music">
                                <li id="music">음 악</li>
                            </Link>
                            <Link to="/meeting/game">
                                <li id="game">게 임</li>
                            </Link>
                            <Link to="/meeting/diy">
                                <li id="diy">D.I.Y</li>
                            </Link>
                            <Link to="/meeting/lans">
                                <li id="lans" className="onPage">랜선 모임</li>
                            </Link>
                            <Link to="/meeting/study">
                                <li id="study">스터디</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                
                <div className="titles">
                    <h1 className="tit">Leeting</h1>
                <p className="subtit">운명에는 우연이 없다 인간은 어떤 운명을 만나기 전에 스스로 그것을 만든다.
                    <br />- 토마스 윌슨</p>
                </div>
            <Posts posts={currentPosts} loading={loading} />

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
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
    )
}

export default Lans;
