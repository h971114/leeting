import React, { useState } from "react";
import axios from "axios";
import propTypes from "prop-types";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

function ReviewList({ id, review, writer, date }) {
    const [content, setContent] = useState();    
    const editorReff = React.createRef();
    let codes = review;
    let reviewWrapId = id +"_"+ writer;
    let reviewModifyId = writer +"_"+ id;
    let reviewTxtId = writer + "_" + id + "txt";
    let reviewBtnId = writer + "_" + id;

    const Modify = (e) => {
        e.preventDefault();
        let sNickName = sessionStorage.getItem('nickname');

        if (writer === sNickName) {
            // let result = window.confirm("수정하시겠습니까?");
            document.getElementById(reviewTxtId).setAttribute('style', 'display:none');
            document.getElementById(reviewModifyId).setAttribute('style', 'display:inline-block');
            document.getElementById('reviewModifyCancle').setAttribute('style', 'display:inline-block');
            document.getElementById('reviewConfirmModify').setAttribute('style', 'display:inline-block');
            document.getElementById('reviewModify').setAttribute('style', 'display:none');
            document.getElementById('reviewDelete').setAttribute('style', 'display:none');
        }
        else {
            alert('작성자만 수정 가능합니다.');
        }
    }

    const confirmModify = (e) => {
        e.preventDefault();
        let result = window.confirm("수정하시겠습니까?");
        if (result) {
            if (content.length > 10 && content.length < 140) {
                axios.put('http://127.0.0.1:8080/myapp/meeting/review', {
                    review: content,
                    no:id
                }).then(res => {
                    alert('수정에 성공하셨습니다.');
                    document.getElementById(reviewTxtId).setAttribute('style', 'display:inline-block');
                    document.getElementById(reviewModifyId).setAttribute('style', 'display:none');
                    document.getElementById('reviewModifyCancle').setAttribute('style', 'display:none');
                    document.getElementById('reviewConfirmModify').setAttribute('style', 'display:none');
                    document.getElementById('reviewModify').setAttribute('style', 'display:inline-block');
                    document.getElementById('reviewDelete').setAttribute('style', 'display:inline-block');
                    
                    document.getElementById(reviewTxtId).innerHTML = content;
                })
            }
            else {
                alert('양식에 맞게 입력해주세요');
            }
        }
        else {
            
        }
        
    }

    const cancleModify = (e) => {
        e.preventDefault();
        document.getElementById(reviewTxtId).setAttribute('style', 'display:inline-block');
        document.getElementById(reviewModifyId).setAttribute('style', 'display:none');
        document.getElementById('reviewModifyCancle').setAttribute('style', 'display:none');
        document.getElementById('reviewConfirmModify').setAttribute('style', 'display:none');
        document.getElementById('reviewModify').setAttribute('style', 'display:inline-block');
        document.getElementById('reviewDelete').setAttribute('style', 'display:inline-block');
    }

    const confirmDelete = (e) => {
        e.preventDefault();
        let sNickName = sessionStorage.getItem('nickname');

        if (writer === sNickName) {
            let result = window.confirm("삭제하시겠습니까?");
    
            if (result) {
                axios.delete('http://127.0.0.1:8080/myapp/meeting/review', {
                    params: {
                        no:id
                    }
                }).then(res => {
                    if (res.data === "SUCCESS") {
                        alert('삭제에 성공하였습니다!!');
                        document.getElementById(reviewWrapId).setAttribute('style', 'display:none');
                    } else {
                        alert('삭제에 실패했습니다!!');
                    }
                })
            } else {
                // console.log('잠시후 다시 시도해주시기 바랍니다.');
            }            
        }
        else {
            alert('작성자만 삭제 가능합니다.');
        }
    }

    const editorChange = (e) => { 
        setContent(editorReff.current.getInstance().getHtml());
    }
    
    return (
        <div className="reviewListView" id={reviewWrapId}>
            <p className="reviewWriter">{writer}</p>
            <p className="reviewDate">{date}</p>
            <p className="detail_content" id={reviewTxtId} dangerouslySetInnerHTML={{ __html: codes }}></p>
            <div className="detail_content" id={reviewModifyId}>
                <Editor
                    id="editorReview"
                    className="editorr"
                    previewStyle="vertical"
                    height="60px"
                    placeholder="댓글 입력창입니다."
                    initialEditType="wysiwyg"
                    ref={editorReff}
                    onChange={editorChange}
                    initialValue={review}
                />
            </div>
            <div className="reviewBtns">
                <button id="reviewConfirmModify" onClick={confirmModify}>수정</button>
                <button id="reviewModifyCancle"onClick={cancleModify}>취소</button>
                <button id="reviewModify" onClick={Modify}>수정</button>
                <button id="reviewDelete" onClick={confirmDelete}>삭제</button>
            </div>
        </div>
    );
}

ReviewList.propTypes  = {
    id: propTypes.number.isRequired,
    review: propTypes.string.isRequired,
    writer: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
};
 
export default ReviewList;