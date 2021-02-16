import React, { useState, useEffect } from 'react';
import axios from "axios";

import Posts from "../../../components/report/Posts"
import Pagination from '../../../components/common/Pagination'

const List = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noPosts, setVPost] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const sId = sessionStorage.getItem('id');
    const nullpost = [{
        no : 0,
        id:"test",
        reportid:"test",
        detail:"<p>test</p>",
        date: "2021-01-01 00:00:00"
    }];
    
    useEffect(() => {
        if (sessionStorage.getItem('id') === null || sessionStorage.getItem('id')!=='leetingadmin') {
            document.getElementById('root').setAttribute('style', 'display:none');
            window.location.replace("/404");
        }
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/report/listreport');
            if (res.data.message === "FAIL") {
                setVPost(true);
                setLoading(false);
                setPosts([nullpost]);
            }
            else {
                console.log(res.data.list);
                setPosts(res.data.list);
                setLoading(false);
            }
        }

        if (sId === 'leetingadmin') {
            document.getElementById('noAdmin').setAttribute('style', 'display:none');
            document.getElementById('Admin').setAttribute('style', 'display:block');
        }
        
        fetchPosts();
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
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
                    <h1 id="noAdmin" className="tit">{sessionStorage.getItem('nickname')}님 신고 목록</h1>
                    <h1 id="Admin" className="tit">종합 신고 목록</h1>
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
            </div>
        </div>
    )
    
    
}

export default List;