import React from "react";
import "../css/detailNotice.css"
import axios from "axios";

import propTypes from "prop-types";
import { Link } from "react-router-dom";

class DetailNotice extends React.Component {
    constructor() {
        super();
        this.state = {
            no: 0,
            title: "",
            writer: "",
            hit: "",
            file1: "",
            file2: "",
            file3: "",
            detail: "",
            date: "",
        }
    }

    componentDidMount() {
        const { location } = this.props;
        const sId = sessionStorage.getItem('id');
        if (sId !== 'leetingadmin') {
            document.getElementById('goModify').setAttribute('style', 'display:none');
            document.getElementById('goDelete').setAttribute('style', 'display:none');
        }

        axios.get(`http://127.0.0.1:8080/myapp/notice/${location.state.no}`, {
            meetingno: location.state.no
          }).then(res => {
            console.log(res.data);
            this.setState({
                no: location.state.no,
                title: res.data.title,
                writer: res.data.writer,
                hit: res.data.hit,
                file1: res.data.file1,
                file2: res.data.file2,
                file3: res.data.file3,
                detail: res.data.detail,
                date: res.data.date,
            })
          });
          if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    }

    callFileDownload = () => {
        var _fileLen = this.state.file1.length;
        var _lastDot = this.state.file1.lastIndexOf('.');
        var _fileExt = this.state.file1.substring(_lastDot, _fileLen).toLowerCase();
        
        var _lastSlash = this.state.file1.lastIndexOf('/');
        var _fileName = this.state.file1.substring(_lastSlash+1, _lastDot).toLowerCase();
        
        var FileSaver = require('file-saver');
        FileSaver.saveAs(this.state.file1, _fileName+_fileExt);
    }

    callFileDownload2 = () => {
        var _fileLen = this.state.file2.length;
        var _lastDot = this.state.file2.lastIndexOf('.');
        var _fileExt = this.state.file2.substring(_lastDot, _fileLen).toLowerCase();
        
        var _lastSlash = this.state.file2.lastIndexOf('/');
        var _fileName = this.state.file2.substring(_lastSlash+1, _lastDot).toLowerCase();
        
        var FileSaver = require('file-saver');
        FileSaver.saveAs(this.state.file1, _fileName+_fileExt);
    }

    callFileDownload3 = () => {
        var _fileLen = this.state.file3.length;
        var _lastDot = this.state.file3.lastIndexOf('.');
        var _fileExt = this.state.file3.substring(_lastDot, _fileLen).toLowerCase();
        
        var _lastSlash = this.state.file3.lastIndexOf('/');
        var _fileName = this.state.file3.substring(_lastSlash+1, _lastDot).toLowerCase();
        
        var FileSaver = require('file-saver');
        FileSaver.saveAs(this.state.file3, _fileName+_fileExt);
    }

    noticedelete = () => {
        axios.delete(`http://127.0.0.1:8080/myapp/notice/${this.state.no}`, {
            noticeno: this.state.no
          }).then(res => {
            //   console.log(res)
              alert('삭제 완료되었습니다!');
              window.location.replace('/notice');
          }).catch(err => {
              console.log(err)
          })
    }

    goBack = (e) => {
        e.preventDefault();
        const { history } = this.props;
        
        history.goBack();
    }

  render() {
    const { location } = this.props;
    let codes = location.state.detail;

    var date = location.state.date;

    var sYear = date.substring(0,4);
    var sMonth = date.substring(5,7);
    var sDate = date.substring(8,10);

    var sday = sYear + '-' + sMonth + '-' + sDate;
      
    if (this.state.file1 !== null) {    
        var _fileLen1 = this.state.file1.length;
        var _lastDot1 = this.state.file1.lastIndexOf('.');
        var _fileExt1 = this.state.file1.substring(_lastDot1, _fileLen1).toLowerCase();
        var _lastSlash1 = this.state.file1.lastIndexOf('/');
        var _fileName1 = this.state.file1.substring(_lastSlash1+1, _lastDot1).toLowerCase();
    }
    
    if (this.state.file2 !== null) {
        var _fileLen2 = this.state.file2.length;
        var _lastDot2 = this.state.file2.lastIndexOf('.');
        var _fileExt2 = this.state.file2.substring(_lastDot2, _fileLen2).toLowerCase();
        var _lastSlash2 = this.state.file2.lastIndexOf('/');
        var _fileName2 = this.state.file2.substring(_lastSlash2 + 1, _lastDot2).toLowerCase();
    }
    if (this.state.file3 !== null) {
        var _fileLen3 = this.state.file3.length;
        var _lastDot3 = this.state.file3.lastIndexOf('.');
        var _fileExt3 = this.state.file3.substring(_lastDot3, _fileLen3).toLowerCase();
        var _lastSlash3 = this.state.file3.lastIndexOf('/');
        var _fileName3 = this.state.file3.substring(_lastSlash3 + 1, _lastDot3).toLowerCase();
    }
    if (location.state) {
        return (
            <div id="notice_detail">
                <div className="titles text-center">
                    <h1>공 지 사 항</h1>
                    <hr/>
                </div>
                {/* <img src={location.state.file} alt={location.state.title}></img> */}
                <div className="container contents">
                    <div>
                        <h3 className="tit text-center">{location.state.title}</h3><br/>
                        <div className="d-flex justify-content-between">
                            <p className="col-6">{location.state.writer}</p>
                            <p className="col-6 date text-right">작성일 : {sday}</p>
                        </div>
                    </div>
                    <hr />
                    <div className="detail_content" dangerouslySetInnerHTML={{ __html: codes} }></div>
                    <hr />
                    <div className="enclosed_files">
                        <p className="font-weight-bold">첨부파일</p>
                        {this.state.file1 ? (
                            <p className="pointer" onClick={this.callFileDownload}>첨부파일 1 ({_fileName1}{_fileExt1})</p>
                        ) : (
                            <p>첨부파일이 존재하지 않습니다.</p>
                        )}
                        <br />
                        {this.state.file2 ? (
                            <p className="pointer" onClick={this.callFileDownload2}>첨부파일2 ({_fileName2}{_fileExt2})</p>
                        ) : ( null )}
                        <br />
                        {this.state.file3 ? (
                            <p className="pointer" onClick={this.callFileDownload3}>첨부파일3 ({_fileName3}{_fileExt3})</p>
                        ) : ( null )}
                        
                    </div>
                    <hr />
                    <div className="text-right UserBtns">
                        <button id="goModify" className="notice_button">
                            <GoModify
                                no={this.state.no}
                                title= {this.state.title}
                                writer= {this.state.writer}
                                file1= {this.state.file1}
                                file2= {this.state.file2}
                                file3= {this.state.file3}
                                detail= {this.state.detail}
                                date = {this.state.date}
                            />
                        </button>
                        <button id="goDelete" className="notice_button" onClick={this.noticedelete}>삭제하기</button>
                        <button className="notice_button" onClick={this.goBack}>
                            목록
                        </button>
                    </div>
                </div>
            </div>
        );            
    } else {
      return null;
    }
  }
}

function GoModify({ no, title, detail, date, writer, file1, file2, file3 }) {
    return (
        <div id="modifyBtn">
            <Link
                to={{
                    pathname: `/board/modify/${no}`,
                    state: {
                        no,
                        title,
                        detail,
                        date,
                        writer,
                        file1,
                        file2,
                        file3
                    }
                }}
            > 수정하기
                {/* <button id="modifyBtn" ></button> */}
            </Link>
        </div>
    )
}

GoModify.propTypes = {
    no: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    detail: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    writer: propTypes.string.isRequired,
    file1: propTypes.string,
    file2: propTypes.string,
    file: propTypes.string,
};
    
export default DetailNotice;