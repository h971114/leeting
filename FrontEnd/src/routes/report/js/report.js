import React, { useState, useEffect } from 'react';
import axios from "axios";

import { Editor } from '@toast-ui/react-editor';

import moment from 'moment';
import 'moment/locale/ko';

import '../css/report.css'

const Report = () => {
    const [reportid, setReportId] = useState();
    const [content, setContent] = useState();
    const editorRef = React.createRef();
    const sId = sessionStorage.getItem('id');

    useEffect(() => {
        if (sessionStorage.getItem('id') === null) {
            document.getElementById('root').setAttribute('style', 'display:none');
            alert('로그인 후 이용가능합니다!');
            window.location.replace("/login");
          }
        if (sId === "leetingadmin") {
            document.getElementById('adminLog').setAttribute("style", "display:inline-block");
        }
        else {
            document.getElementById('adminLog').setAttribute("style", "display:none");
        }
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    })

    const reportName = (e) => {
        setReportId(e.target.value);
    }

    const editorChange = (e) => {
        setContent(editorRef.current.getInstance().getHtml());
    }

    const adminLog = (e) => {
        window.location.assign('/report/list');
    }

    const writeReport = (e) => { 
        e.preventDefault();
        const nowTime = moment();
        
        axios.post("http://127.0.0.1:8080/myapp/report/writereport", {
            id: sId,
            reportid: reportid,
            detail: content,
            date: nowTime
        }).then(res => {
            if (res.data === "SUCCESS") {
                console.log("성공");
                alert("신고가 완료되었습니다.");
                window.location.replace('/report');
            }
            else {
                console.log("실패");
                alert("신고에 실패하셨습니다. 잠시후 다시 시도해주세요!");
                // window.location.replace('/meeting/write');
            }
        })
    }

    return (
        <div id="main_content">
            <div className="reportWrap">
                <div id="reportImage">
                    
                </div>
                <div className = "reportInput">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">신고자 아이디</th>
                                <td colSpan="5">
                                    <input type="text" onChange={reportName}></input>
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
                <div className="reportBtns">
                    <button id="adminLog" onClick={adminLog}>신고목록 보기</button>
                    <button onClick={writeReport}>신고하기</button>
                </div>
            </div>
        </div>
    )
}

export default Report;