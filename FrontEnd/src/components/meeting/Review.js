import React, {useState, useEffect} from "react";
import axios from "axios";

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import moment from 'moment';
import 'moment/locale/ko';

import Posts from "./reviewPosts"

import Pagination from '../common/Pagination'

const Review = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noPosts, setVPost] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [content, setContent] = useState();
    const [reviewBool, setReviewBool] = useState(false);
    const editorRef = React.createRef();
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');

    useEffect(() => {
        const fetchPosts = async () => {

            setReviewBool(false);

            const res = await axios.get('http://127.0.0.1:8080/myapp/meeting/review', {
                params: {
                    meetingno:props.id
                }
            });
            
            setPosts(res.data.list);
            if (res.data.length === 0) {
                setVPost(true);
                setLoading(false);
            }
            else
                setLoading(false);
        }
    
        if (props.checkJoin === true) {
            document.getElementById('editWrap').setAttribute('style', 'display:block');
            // console.log('Success');
        }
        else {
            document.getElementById('editWrap').setAttribute('style', 'display:none');
            // console.log('Fail');
        }
        fetchPosts();
    }, [props.checkJoin, reviewBool]);
    
    // console.log(posts);
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
    //change page
    const paginate = (e, pageNumber) => {
        e.preventDefault();

        setCurrentPage(pageNumber);
    }

    const editorChange = (e) => { 
        setContent(editorRef.current.getInstance().getHtml());
        // console.log(content.length);
    }

    const reviewAdd = (e) => {
        e.preventDefault();

        let sNickName = sessionStorage.getItem('nickname');
    
        if (content.length > 10 && content.length < 140) {
            axios.post('http://127.0.0.1:8080/myapp/meeting/review', {
                meetingno: props.id,
                review: content,
                writer: sNickName,
                date : nowTime
            }).then(res => {
                if (res.data === "SUCCESS") {
                    alert('등록에 성공하셨습니다.');
                    setReviewBool(true);
                } else {
                    alert('잠시후 다시 시도해주세요');
                }
            })
        }
        else {
            alert('양식에 맞게 입력해주세요');
        }
    }

    return (
        <div>
            <div id="editWrap">
                <div id="editorWrap">
                    <Editor
                        id="editorReview"
                        className="editorr"
                        previewStyle="vertical"
                        height="60px"
                        placeholder="댓글 입력창입니다."
                        initialEditType="wysiwyg"
                        ref={editorRef}
                        onChange={editorChange}
                    />
                </div>
                <div id="reviewWriteBtn">
                    <button onClick={reviewAdd}>
                        댓글 작성
                    </button>
                </div>
            </div>
            <Posts posts={currentPosts} loading={loading} />

            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
                loading={loading}
                noPosts={noPosts}
            />


        </div>
    )

}
export default Review;