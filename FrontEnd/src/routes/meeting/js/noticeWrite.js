import React from "react";

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios, { post } from "axios";

import moment from 'moment';
import 'moment/locale/ko';


class WriteNotice extends React.Component {
    editorRef = React.createRef();
    dateRef = React.createRef();

    componentDidMount() {
        const { location } = this.props;

        if (sessionStorage.getItem('id') === null) {
            document.getElementById('root').setAttribute('style', 'display:none');
            window.location.replace("/WrongPage");
        }

        const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
        this.setState({
            Date: nowTime,
            meetingno:location.state.id
        })
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    }

    constructor() {
        super();
        this.state = {
            meetingno:"",
            detail: "",
            writer: "",
            title: "",
            date: "",
            file1: null,
            file2: null,
            file3: null,
            mainTit: false,
            checkcontent:false
        };
    }    
    state = {
        meetingno:"",
        detail: "",
        writer: "",
        title: "",
        date: "",
        file1: null,
        file2: null,
        file3: null,
        mainTit: false,
    }

    /*Change 관련 메소드*/

    titChange = (event) => {
        this.setState({
            title: event.target.value,
            checkmainTit:true
        })
        // // console.log(this.state.mainTit);
    }

    editorChange = (e) => { 
        this.setState({
            detail: this.editorRef.current.getInstance().getHtml(),
            checkcontent:true
        })
        // // console.log(this.state.content);
    }

    /* Click 관련 메소드*/

    fileUpload = (file) => {
        const url = 'http://127.0.0.1:8080/myapp/gallery/upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }
        return post(url, formData, config)
    }

    file1Change = (e) => {
        // console.log(e)
        this.setState({
            file1 : e.target.files[0],
        })
        var filename;
        if(window.FileReader){
            filename = e.target.files[0].name;
        } else {
            filename = e.target.val().split('/').pop().split('\\').pop();
        }

        document.getElementById('upload-file1').value = filename;
        
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append('data', file);
        formData.append('hostid', sessionStorage.getItem('id'));
        formData.append('dirNum', 0);

        axios.post('http://127.0.0.1:8080/myapp/gallery/upload', formData,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => {
            // console.log(res)
            this.setState({
                file1: res.data
            })
        }).catch(err => {
            // // console.log(err);
        })
    }

    file2Change = (e) => {
        // console.log(e)
        this.setState({
            file2 : e.target.files[0],
        })
        var filename;
        if(window.FileReader){
            filename = e.target.files[0].name;
        } else {
            filename = e.target.val().split('/').pop().split('\\').pop();
        }

        document.getElementById('upload-file2').value = filename;
        
        var file = e.target.files[0];
        var formData = new FormData();
        formData.append('data', file);
        formData.append('hostid', sessionStorage.getItem('id'));
        formData.append('dirNum', 0);
        axios.post('http://127.0.0.1:8080/myapp/gallery/upload', formData,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => {
            this.setState({
                file2: res.data
            })
        }).catch(err => {
            // // console.log(err);
        })
    }

    file3Change = (e) => {
        // console.log(e)
        this.setState({
            file3 : e.target.files[0],
        })
        var filename;
        if(window.FileReader){
            filename = e.target.files[0].name;
        } else {
            filename = e.target.val().split('/').pop().split('\\').pop();
        }
        // // console.log(e.target.files[0]);
        // // console.log(filename);

        document.getElementById('upload-file3').value = filename;
        
        var file = e.target.files[0];
        // // console.log(this.state.startDay);
        // // console.log(file);
        var formData = new FormData();
        formData.append('data', file);
        formData.append('hostid', sessionStorage.getItem('id'));
        formData.append('dirNum', 0);
        axios.post('http://127.0.0.1:8080/myapp/gallery/upload', formData,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => {
            this.setState({
                file3: res.data
            })
        }).catch(err => {
            // // console.log(err);
        })
    }

    writeClick = (e) => {
        // console.log(e)
        e.preventDefault();
        let sId = sessionStorage.getItem('nickname');

        // var url = "/meeting/board/"+this.state.meetingno;

        if (this.state.file2 !== null) {
            if (this.state.file1 === null) {
                // console.log('1은없고 2는 있음');
                this.setState({
                    file1: this.state.file2,
                    file2:null
                })
            }
        }

        if (this.state.file3 !== null) {
            if (this.state.file1 === null) {
                // console.log('1은없고 3은 있음');
                this.setState({
                    file1: this.state.file3,
                    file3:null
                })
            }
            else if (this.state.file2 === null) {
                // console.log('2는없고 3은 있음');
                this.setState({
                    file2: this.state.file3,
                    file3:null
                })
            }
        }

        if (this.state.title === "") {
            return (alert('안돼 돌아가'));
        }
        if (this.state.detail === "") {
            return (alert('안돼 돌아가 내용'));
        }

        axios.post("http://127.0.0.1:8080/myapp/meetingnotice/"+this.state.meetingno, {
            meetingno:this.state.meetingno,
            detail: this.state.detail,
            writer: sId,
            title: this.state.title,
            date: this.state.date,
            file1: this.state.file1,
            file2: this.state.file2,
            file3: this.state.file3,
        }).then(res => {
            if (res.data === "SUCCESS") {
                // console.log("성공");
                // console.log(this.state.categoryno);
                alert("글 작성이 완료되었습니다.");
                // window.location.replace(url);
                this.goBack();
            }
            else {
                // console.log("실패");
                alert("글 작성에 실패하셨습니다. 다시 작성해 주세요!");
                window.location.replace('/notice/writenotice');
            }
        })


    }
    
    goBack = (e) => {
        this.props.history.goBack();
      }
    
    render() {
        return (
            <div className="writeWrap">
                <div className="titleset">
                    <p className="mainTit">공지사항 등록</p>
                </div>
                <div className="writeInputWrap">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="5">
                                    <input type="text" onChange={this.titChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">내 용</th>
                                <td colSpan="5">
                                    <Editor
                                        previewStyle="vertical"
                                        height="300px"
                                        initialEditType="wysiwyg"
                                        placeholder="글쓰기"
                                        ref={this.editorRef}
                                        onChange={this.editorChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">첨부파일</th>
                                <td colSpan="5">
                                <form className="filebox bs3-primary"  encType="multipart/form-data">
                                    <input className="upload-file" id="upload-file1"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_file1name">업로드</label> 
                                    <input type="file" accept="*"id="ex_file1name" className="upload-hidden" onChange={e => this.file1Change(e)}/> 
                                </form>
                                <form className="filebox bs3-primary"  encType="multipart/form-data">
                                    <input className="upload-file" id="upload-file2"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_file2name">업로드</label> 
                                    <input type="file" accept="*"id="ex_file2name" className="upload-hidden" onChange={e => this.file2Change(e)}/> 
                                </form>
                                <form className="filebox bs3-primary"  encType="multipart/form-data">
                                    <input className="upload-file" id="upload-file3"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_file3name">업로드</label> 
                                    <input type="file" accept="*"id="ex_file3name" className="upload-hidden" onChange={e => this.file3Change(e)}/> 
                                </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="btndiv">
                        <button id="join" onClick={this.writeClick}>게시하기</button>
                    </div>
                </div>
                
            </div>
        );
    }
}


export default WriteNotice;