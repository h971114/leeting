import React from "react";
import "../css/writeNotice.css"

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios, { post } from "axios";

class WriteNotice extends React.Component {
    editorRef = React.createRef();
    dateRef = React.createRef();

    componentDidMount() {
        if (sessionStorage.getItem('id') === null || sessionStorage.getItem('id')!=='leetingadmin') {
            document.getElementById('root').setAttribute('style', 'display:none');
            window.location.replace("/WrongPage");
        }
        const { location } = this.props;
        this.setState({
            no : location.state.no,
            title: location.state.title,
            detail: location.state.detail,
            date: location.state.date,
            writer: location.state.writer,
            file1: location.state.file1,
            file2: location.state.file2,
            file3: location.state.file3
        })
        document.getElementById('title').value = location.state.title;

        if (location.state.file1 === null) {
            document.getElementById('none1').setAttribute('style', 'display:table-row');
            document.getElementById('already1').setAttribute('style', 'display:none');
        } else {
            document.getElementById('none1').setAttribute('style', 'display:none');
            document.getElementById('already1').setAttribute('style', 'display:table-row');
        }
        if (location.state.file2 === null) {
            document.getElementById('none2').setAttribute('style', 'display:table-row');
            document.getElementById('already2').setAttribute('style', 'display:none');
        } else {
            document.getElementById('none2').setAttribute('style', 'display:none');
            document.getElementById('already2').setAttribute('style', 'display:table-row');
        }
        if (location.state.file3 === null) {
            document.getElementById('none3').setAttribute('style', 'display:table-row');
            document.getElementById('already3').setAttribute('style', 'display:none');
        } else {
            document.getElementById('none3').setAttribute('style', 'display:none');
            document.getElementById('already3').setAttribute('style', 'display:table-row');   
        }
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
        // // console.log(e)
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
        // // console.log(e)
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
        // // console.log(e)
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

    deleteFile1 = (e) => {
        e.preventDefault();
        
        this.setState({
            file1:null
        })
        document.getElementById('already1').setAttribute('style', 'display:none');
        document.getElementById('none1').setAttribute('style', 'display:table-row');
    }
    
    deleteFile2 = (e) => {
        e.preventDefault();
        
        this.setState({
            file2:null
        })
        document.getElementById('already2').setAttribute('style', 'display:none');
        document.getElementById('none2').setAttribute('style', 'display:table-row');
    }
    
    deleteFile3 = (e) => {
        e.preventDefault();
        
        this.setState({
            file3:null
        })
        document.getElementById('already3').setAttribute('style', 'display:none');
        document.getElementById('none3').setAttribute('style', 'display:table-row');
    }

    writeClick = (e) => {
        // // console.log(e)
        e.preventDefault();

        var file1Url = this.state.file1,
            file2Url = this.state.file2,
            file3Url = this.state.file3;

        if (this.state.file3 === null) {
            file3Url = null;
        } else {
            file3Url = this.state.file3;
        }
        if (this.state.file2 === null) {
            if (file3Url !== null) {
                file2Url = file3Url;
                file3Url = null;
                // console.log('2는없고 3은 있음');
            }
        } else {
            file2Url = this.state.file2;
        }
        if (this.state.file1 === null) {
            if (file2Url !== null) {
                file1Url = file2Url;
                file2Url = null;
                // console.log('1은없고 2는 있음');
            }
            else if (file3Url !== null) {
                file1Url = file3Url;
                file3Url = null;
                // console.log('1은없고 3은 있음');
            }
        } else {
            file1Url = this.state.file1;
        }


        if (this.state.title === "") {
            return (alert('안돼 돌아가'));
        }
        if (this.state.detail === "") {
            return (alert('안돼 돌아가 내용'));
        }

        axios.put("http://127.0.0.1:8080/myapp/notice/", {
            no:this.state.no,
            detail: this.state.detail,
            title: this.state.title,
            file1: file1Url,
            file2: file2Url,
            file3: file3Url,
        }).then(res => {
            if (res.data === "SUCCESS") {
                // console.log("성공");
                alert("글 수정이 완료되었습니다.")
                window.location.replace('/notice');
            }
            else {
                // console.log("실패");
                alert("글 작성에 실패하셨습니다. 다시 작성해 주세요!");
                window.location.replace('/notice/writenotice');
            }
        })


    }
    
    render() {
        const { location } = this.props;

        
        if (location.state.file1 !== null) {    
            var _fileLen1 = location.state.file1.length;
            var _lastSlash1 = location.state.file1.lastIndexOf('/');
            var _fileName1 = location.state.file1.substring(_lastSlash1 + 1, _fileLen1).toLowerCase();
        }
        
        if (location.state.file2 !== null) {
            var _fileLen2 = location.state.file2.length;
            var _lastSlash2 = location.state.file2.lastIndexOf('/');
            var _fileName2 = location.state.file2.substring(_lastSlash2 + 1, _fileLen2).toLowerCase();
        }
        if (location.state.file3 !== null) {
            var _fileLen3 = location.state.file3.length;
            var _lastSlash3 = location.state.file3.lastIndexOf('/');
            var _fileName3 = location.state.file3.substring(_lastSlash3 + 1, _fileLen3).toLowerCase();
        }

        return (
            <div className="writeWrap">
                <div className="titleset">
                    <p className="mainTit">공지사항 수정</p>
                </div>
                <div className="writeInputWrap">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="5">
                                    <input id="title" type="text" onChange={this.titChange}></input>
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
                                        initialValue={location.state.detail}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">첨부파일</th>
                                <td colSpan="5">
                                <form className="filebox bs3-primary" id="already1"  encType="multipart/form-data">
                                    <input className="upload-file" placeholder={_fileName1} disabled="disabled"/>
                                    <label onClick={this.deleteFile1}>삭제</label> 
                                    {/* <input type="file" accept="*"id="ex_file1name" className="upload-hidden" onChange={e => this.file1Change(e)}/>  */}
                                </form>                                  
                                <form className="filebox bs3-primary nofile" id="none1" encType="multipart/form-data">
                                    <input className="upload-file" id="upload-file1"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_file1name">업로드</label> 
                                    <input type="file" accept="*"id="ex_file1name" className="upload-hidden" onChange={e => this.file1Change(e)}/> 
                                </form>
                                <form className="filebox bs3-primary" id="already2"  encType="multipart/form-data">
                                    <input className="upload-file" placeholder={_fileName2} disabled="disabled"/>
                                    <label onClick={this.deleteFile2}>삭제</label> 
                                    {/* <input type="file" accept="*"id="ex_file1name" className="upload-hidden" onChange={e => this.file1Change(e)}/>  */}
                                </form>  
                                <form className="filebox bs3-primary nofile" id="none2" encType="multipart/form-data">
                                    <input className="upload-file" id="upload-file2"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_file2name">업로드</label> 
                                    <input type="file" accept="*"id="ex_file2name" className="upload-hidden" onChange={e => this.file2Change(e)}/> 
                                </form>
                                <form className="filebox bs3-primary" id="already3"  encType="multipart/form-data">
                                    <input className="upload-file" placeholder={_fileName3} disabled="disabled"/>
                                    <label onClick={this.deleteFile3}>삭제</label> 
                                    {/* <input type="file" accept="*"id="ex_file1name" className="upload-hidden" onChange={e => this.file1Change(e)}/>  */}
                                </form>
                                <form className="filebox bs3-primary nofile" id="none3" encType="multipart/form-data">
                                    <input className="upload-file" id="upload-file3"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_file3name">업로드</label> 
                                    <input type="file" accept="*"id="ex_file3name" className="upload-hidden" onChange={e => this.file3Change(e)}/> 
                                </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="btndiv">
                        <button id="join" onClick={this.writeClick}>수정하기</button>
                    </div>
                </div>
                
            </div>
        );
    }
}


export default WriteNotice;