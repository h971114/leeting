import React, { useState, useEffect } from 'react';
import axios from "axios";

import "../css/meeting.css"

import { Link } from "react-router-dom";

import moment from 'moment';
import 'moment/locale/ko';

import RecoPosts from "../../../components/meeting/reco"

import Posts from "../../../components/meeting/Posts"

import Pagination from '../../../components/common/Pagination'

const Diy = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [recoPosts, setRecoPosts] = useState([]);
    const [recoLoading, setRecoLoading] = useState(false);
    
    useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/meeting/diy');
            
          setPosts(res.data);
          setLoading(false);
        }
    
        const recoPosts = async () => {
            setRecoLoading(true);

            let data = await axios.get('http://127.0.0.1:8080/myapp/recommend/cate/4');
            // // console.log(data.data);
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
    
    // // console.log(posts);
    
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
                                <li id="exercise" >??? ???</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/music` }}>
                                <li id="music" >??? ???</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/game` }}>
                                <li id="game">??? ???</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/diy` }}>
                                <li id="diy"className="onPage">D.I.Y</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/lans` }}>
                                <li id="lans">?????? ??????</li>
                            </Link>
                        <Link to={{ pathname: `/meeting/study` }}>
                                <li id="study">?????????</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                
                <div className="titles">
                    <h1 className="tit">D.I.Y</h1>
                    <p className="subtit">????????? ????????? ????????? ?????? ????????? ??????????????? ?????? ?????????.<br/>- ?????????</p>
                </div>
                
                <div className="leetingQuicktit">
                    <h3>???????????? D.I.Y ?????? ????</h3>
                </div>
                <div className="favoriteleet">
                    <RecoPosts posts={recoPosts} loading={recoLoading} />
                </div>
                
                <div className="quicktit">
                    <h3>?????? ??????</h3>
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
                    <button >????????????</button>
                </Link>
            </div>

            </div>
            </div>
    )
}

export default Diy;