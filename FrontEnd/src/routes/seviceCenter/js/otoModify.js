import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Editor } from '@toast-ui/react-editor';

const OtOModify = (props) => {
    const [no, setNo] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const editorRef = React.createRef();
    const [type, setType] = useState();
// eslint-disable-next-line
    useEffect(() => {
        const location = props.location.state;
        console.log(location.qwriter);

        setNo(location.no);
        setTitle(location.title);
        setContent(location.detail);
        setType(location.type);
        if (sessionStorage.getItem('id') === null) {
            document.getElementById('root').setAttribute('style', 'display:none');
            alert('test');
            window.location.replace("/WrongPage");
        }
        if (sessionStorage.getItem('id') !== location.qwriter) {
            document.getElementById('root').setAttribute('style', 'display:none');
            alert('test');
            window.location.replace("/WrongPage");
        }

        document.getElementById('title').value = title;
        document.getElementById('type').value = type;
        document.getElementById('mobile_title').value = title;
        document.getElementById('mobile_type').value = type;
        
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
        // console.log(content);
    }

    const updateReport = (e) => { 
        e.preventDefault();
        axios.put("http://127.0.0.1:8080/myapp/question", {
            no: no,
            title: title,
            detail: content,
            type: type
        }).then(res => {
            if (res.data === "SUCCESS") {
                console.log("성공");
                alert("문의 완료되었습니다.");
                window.location.replace('/sc/onetoone/');
            }
            else {
                console.log("실패");
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
                                    <input type="text" id="title" onChange={otoTitle}></input>
                                </td>
                                <th scope="row">문의 카테고리</th>
                                <td colSpan="2">
                                    <select id="type" value={type} onChange={typeChange}>
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
                                    <input type="text" id="mobile_title" onChange={otoTitle}></input>
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
                                        initialValue={content}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="otoBtns">
                    <button onClick={updateReport}>수정 하기</button>
                </div>
            </div>
        </div>
    )
}

export default OtOModify;