import React, { useState, useEffect } from 'react';
import axios from "axios";

import "../css/meeting.css"

import { Link } from "react-router-dom";

import moment from 'moment';
import 'moment/locale/ko';

import RecoPosts from "../../../components/meeting/reco"

import Posts from "../../../components/meeting/Posts"

import Pagination from '../../../components/common/Pagination'

const Exercise = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [recoPosts, setRecoPosts] = useState([]);
    const [recoLoading, setRecoLoading] = useState(false);
    
    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/meeting/exercise');
            
          setPosts(res.data);
          setLoading(false);
        }

        const recoPosts = async () => {
            setRecoLoading(true);

            let data = await axios.get('http://127.0.0.1:8080/myapp/recommend/cate/1');
            // console.log(data.data);
            data = data.data;
            setRecoPosts(data);
            setRecoLoading(false);
        }

        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    
        if (sessionStorage.getItem("token") != null) {
            document.getElementById('writeBtn').setAttribute("style", "display:block");
        }
        else {
            document.getElementById('writeBtn').setAttribute("style", "display:none");
        }
    
        recoPosts();
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
                                <li id="exercise" className="onPage">운 동</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/music` }}>
                                <li id="music" >음 악</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/game` }}>
                                <li id="game">게 임</li>
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
                    <h1 className="tit">운 동</h1>
                    <p className="subtit">운동은 하루를 짧게 하지만, 운동은 인생을 길게 한다.<br/>- 다니엘 W. 조스린</p>
                </div>
                <div className="quicktit">
                    <h3>추천하는 운동 리팅 👍</h3>
                </div>
                <div className="favoriteleet">
                    <RecoPosts posts={recoPosts} loading={recoLoading} />
                </div>
                
                <div className="quicktit">
                    <h3>전체 목록</h3>
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

export default Exercise;