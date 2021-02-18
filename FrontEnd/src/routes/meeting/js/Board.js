import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import Posts from "../../../components/board/Posts"
import Pagination from '../../../components/common/Pagination'
import propTypes from "prop-types";

const Board = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noPosts, setVPost] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const { location } = props;
    const nullpost = [{
        no : 0,
        id:"test",
        reportid:"test",
        detail:"<p>test</p>",
        date: "2021-01-01 00:00:00"
    }];

    useEffect(() => {
        const fetchPosts = async () => {
            const meetingno = location.state.id;
            setLoading(true);
            const res = await axios.get('http://127.0.0.1:8080/myapp/meetingnotice/'+meetingno);
            // console.log(res);

            if (sessionStorage.getItem('id') === null) {
                document.getElementById('root').setAttribute('style', 'display:none');
                window.location.replace("/WrongPage");
            }
            
            if (res.data.conclusion === "FAIL") {
                setVPost(true);
                setPosts([nullpost]);
            }
            else {
                setPosts(res.data.list);
            }
            setLoading(false);
        }
        

        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
        if (sessionStorage.getItem("id") === location.state.hostid) {
            document.getElementById('writeBtn').setAttribute("style", "display:inline-block");
        }
        else {
            document.getElementById('writeBtn').setAttribute("style", "display:none");
        }
        
        fetchPosts();
        // // console.log(noPosts);
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
                    <GoWrite
                        id={location.state.id}
                    />
                </div>
            </div>
        </div>
    )

}

function GoWrite({ id }) {
    return (
        <div id="modifyBtn">
            <Link
                to={{
                    pathname: `/meeting/board/write`,
                    state: {
                        id
                    }
                }}
            ><button>등록하기</button>
                {/* <button id="modifyBtn" ></button> */}
            </Link>
        </div>
    )
}

GoWrite.propTypes = {
    id: propTypes.number.isRequired
};


export default Board;