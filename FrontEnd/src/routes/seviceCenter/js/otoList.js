import React, { useState, useEffect } from 'react';
import axios from "axios";

import Posts from "../../../components/sc/Posts"
import Pagination from '../../../components/common/Pagination'

import { Link } from "react-router-dom";

const OtOList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noPosts, setVPost] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const sId = sessionStorage.getItem('id');
    const nullpost = [{
        no: 0,
        type: 1,
        title: "test",
        detail: "<p>test</p>",
        qwriter: "test",
        date: "2021-01-01 00:00:00"
    }];
    
    useEffect(() => {
        const fetchWriterPosts = async () => {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/question/listquestion', {
                params: {
                    writer: sId
                }
            });
            // console.log(res.data);
            if (res.data.conclusion === "FAIL") {
                setVPost(true);
                setLoading(false);
                setPosts([nullpost]);
            }
            else {
                // console.log(sId);
                // console.log(res.data.list);
                setPosts(res.data.list);
                setLoading(false);
            }
        }
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/question/listAllquestion', {
            });
            if (res.data.conclusion === "FAIL") {
                setVPost(true);
                setLoading(false);
                setPosts([nullpost]);
            }
            else {
                // console.log(res.data.list);
                setPosts(res.data.list);
                setLoading(false);
            }
        }
        
        if (sessionStorage.getItem('id') === null) {
            alert('로그인 후 이용가능한 서비스입니다.');
            window.location.assign("/login");
        }

        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
        if (sId === 'leetingadmin') {
            document.getElementById('Admin').setAttribute('style', 'display:block');
            document.getElementById('noAdmin').setAttribute('style', 'display:none');
            fetchPosts();
            // console.log('관리자');
        } else {
            document.getElementById('Admin').setAttribute('style', 'display:none');
            document.getElementById('noAdmin').setAttribute('style', 'display:block');
            fetchWriterPosts();
            // console.log('사용자');
            // console.log(posts);
        }
        
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
            <div id="board_list" className="board_list report">
                <div className="titles">
                    <h1 id="noAdmin" className="tit">{sessionStorage.getItem('nickname')}님 문의 목록</h1>
                    <h1 id="Admin" className="tit">종합 문의 목록</h1>
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
                    <Link to={{pathname: `/sc/otowrite`}}>
                        <button>문의 하기</button>
                    </Link>
                </div>
            </div>
        </div>
    )
    
    
}

export default OtOList;