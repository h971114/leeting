import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Editor } from '@toast-ui/react-editor';

import moment from 'moment';
import 'moment/locale/ko';

const OtOWrite = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const editorRef = React.createRef();
    const sId = sessionStorage.getItem('id');
    const [type, setType] = useState(1);

    useEffect(() => {
        if (sessionStorage.getItem('id') === null) {
            document.getElementById('root').setAttribute('style', 'display:none');
            alert('test');
            window.location.replace("/WrongPage");
        }
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    })

    const otoTitle = (e) => {
        setTitle(e.target.value);
    }

    const editorChange = (e) => {
        setContent(editorRef.current.getInstance().getHtml());
    }

    const writeReport = (e) => { 
        e.preventDefault();
        const nowTime = moment();
        
        axios.post("http://127.0.0.1:8080/myapp/question/writequestion", {
            qwriter: sId,
            title: title,
            detail: content,
            type:type,
            date: nowTime
        }).then(res => {
            if (res.data === "SUCCESS") {
                // console.log("성공");
                alert("문의 완료되었습니다.");
                window.location.replace('/sc/onetoone');
            }
            else {
                // console.log("실패");
                alert("문의에 실패하셨습니다. 잠시후 다시 시도해주세요!");
                // window.location.replace('/meeting/write');
            }
        })
    }

    const typeChange = (e) => {
        setType(e.target.value);
    }

    return (
        <div id="main_content">
            <div className="otoWrap">
                <div className="otoTitle">
                    <h1>1:1 문의하기</h1>
                </div>
                <div className = "otoInput">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr className="oto_PC">
                                <th scope="row">제목</th>
                                <td colSpan="2">
                                    <input type="text" onChange={otoTitle}></input>
                                </td>
                                <th scope="row">문의 카테고리</th>
                                <td colSpan="2">
                                    <select id="pc_type" value={type} onChange={typeChange}>
                                        <option value="1" defaultValue>미  팅</option>
                                        <option value="2">회  원</option>
                                        <option value="3">페이지</option>
                                        <option value="4">기  타</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className="oto_Mobile">
                                <th scope="row">제목</th>
                                <td colSpan="5">
                                    <input type="text" onChange={otoTitle}></input>
                                </td>
                            </tr>
                            <tr className="oto_Mobile">
                                <th scope="row">문의 카테고리</th>
                                <td colSpan="5">
                                    <select id="mobile_type" value={type} onChange={typeChange}>
                                        <option value="1" defaultValue>미  팅</option>
                                        <option value="2">회  원</option>
                                        <option value="3">페이지</option>
                                        <option value="4">기  타</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">신고 내용</th>
                                    <td colSpan="5">
                                    <Editor
                                        previewStyle="vertical"
                                        height="300px"
                                        placeholder="글쓰기"
                                        initialEditType="wysiwyg"
                                        ref={editorRef}
                                        onChange={editorChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="otoBtns">
                    <button onClick={writeReport}>문의하기</button>
                </div>
            </div>
        </div>
    )
}

export default OtOWrite;