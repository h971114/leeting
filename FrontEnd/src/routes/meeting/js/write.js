import React, {useState} from "react";
import "../css/meeting.css"

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios from "axios";

import DatePicker, { registerLocale } from "react-datepicker";

import "../css/react-datepicker.css";

import ko from 'date-fns/locale/ko'; registerLocale('ko', ko);


class write extends React.Component {
    editorRef = React.createRef();
    dateRef = React.createRef();
    
    constructor() {
        super();
        this.state = {
            value: '1',
            
            thumb: "https://leeting.s3.ap-northeast-2.amazonaws.com/static/noimage.png",

            checkCategory: true,
            checkmainTit: false,
            checksubTit: false,
            checkcontent:false
        };
    }    
    state = {
        categoryno: "1",
            mainTit: "",
            subTit: "",
            thumb: "https://leeting.s3.ap-northeast-2.amazonaws.com/static/noimage.png",
            sDate: new Date(),
        content: "",
            
        
        selectedFile: null, //썸네일 파일 첨부
    }
    
    // handleClick = () => {
    //     this.setState({
    //     content: this.editorRef.current.getInstance().getHtml(),
    //     });
    //     console.log(this.state.content);
    // };


    /*Change 관련 메소드*/

    selectChange = (event) => {
        this.setState({
            categoryno: event.target.value,
            value:event.target.value,
            checkCategory:true
        })
        document.getElementById('category').value = event.target.value;
        console.log(this.state.categoryno);
    }

    mainTitChange = (event) => {
        this.setState({
            mainTit: event.target.value,
            checkmainTit:true
        })
        console.log(this.state.mainTit);
    }

    subTitChange = (event) => {
        this.setState({
            subTit: "#"+event.target.value,
            checksubTit:true
        })
        console.log(this.state.subTit);
    }

    setStartDate = (event) => { 
        this.setState({
            sDate: event.target.value,
        })
        console.log(this.state.sDate);
    }

    editorChange = (e) => { 
        this.setState({
            content: this.editorRef.current.getInstance().getHtml(),
            checkcontent:true
        })
        // console.log(this.state.content);
    }

    /* Click 관련 메소드*/

    handleFileInput(e) {
        this.setState({
            selectedFile : e.target.files[0],
        })
    }


    uploadImage = (e) => {
        e.preventDefault();
        
        var file = this.state.selectedFile;
        console.log(this.state.startDay);
        console.log(file);
        var formData = new FormData();
        formData.append('data', file);
        axios.post('http://127.0.0.1:8080/myapp/gallery/upload', formData,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => {
            this.setState({
                thumb: res.data
            })
            console.log(this.state.thumb);
        }).catch(err => {
            console.log(err);
        })
    }


    // calenderCheck = (e) => {
    //     this.setState({
    //         startDay : e.value
    //     })
    //     console.log(this.state.startDay);
    // }

    handlePost(){
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        axios.post("/api/upload", formData).then(res => {
            return alert('성공')
        }).catch(err => {
            return alert('실패')
        })
    }

    writeClick = (e) => {
        e.preventDefault();
        let sId = sessionStorage.getItem('id');

        // console.log(document.getElementById("datepick").value);
        this.setState({
            sDate:document.getElementById("datepick").value
        })
        // console.log( this.state.mainTit);
        // console.log( this.state.subTit);
        // console.log( this.state.sDate);
        // console.log( this.state.content);
        // console.log(this.state.categoryno);
        // console.log(this.state.thumb);
        axios.post("http://127.0.0.1:8080/myapp/meeting/enrollmeeting", {
            hostid: sId,
            maintitle: this.state.mainTit,
            subtitle: this.state.subTit,
            date: document.getElementById("datepick").value,
            detail: this.state.content,
            categoryno: this.state.categoryno,
            file:this.state.thumb
        }).then(res => {
            if (res.data === "SUCESS") {
                console.log("성공");
            }
            else {
                console.log("실패");
            }
        })
    }

    
    render() {
        return (
            <div className="writeWrap">
                <div className="titleset">
                    <p className="mainTit">Leeting 등록</p>
                    <p className="subTit">당신이 원하는 Leeting!</p>
                </div>
                <div className="writeInput category">
                    <span>카테고리 </span>
                    <select id="category" value={this.state.value} onChange={this.selectChange}>
                        <option value="1" defaultValue>운  동</option>
                        <option value="2">음  악</option>
                        <option value="3">게  임</option>
                        <option value="4">D.I.Y</option>
                        <option value="5">Lan's Meeting</option>
                        <option value="6">스터디</option>
                    </select>
                </div>
                <div className="writeInput">
                    <span>제 목</span>
                    <input type="text" onChange={this.mainTitChange}></input>
                </div>
                <div className="writeInput">
                    <span>부제목</span>
                    <input type="text" onChange={this.subTitChange}></input>
                </div>
                <div className="writeInput">
                    <span>썸네일</span>
                    <input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
                    <button type="button" onClick={this.uploadImage}>업로드</button>
                </div>
                <div className="writeInput">
                    <span>시작일</span>
                    <App /> 
                </div>
                <div className="editor">
                    <Editor
                    previewStyle="vertical"
                    height="300px"
                    initialEditType="wysiwyg"
                    placeholder="글쓰기"
                        ref={this.editorRef}
                        onChange={this.editorChange}
                    />
                    {/* <button onClick={this.handleClick}>저장</button> */}
                </div>
                <div className="btn">
                    <button onClick={this.writeClick}>등록하기</button>
                </div>
            </div>
        );
    }
}

function App() {
    // 달력 날짜 변경 시 기준점이 되는 날짜 
    const [startDate, setStartDate] = useState(new Date());
            
    // 요일 반환 
    const getDayName = (date) => {
        return date.toLocaleDateString('ko-KR', { weekday: 'long', }).substr(0, 1);
    }
    
    // 날짜 비교시 년 월 일까지만 비교하게끔 
    const createDate = (date) => {
        return new Date(
            new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                0,
                0,
                0));
    }
    

    return ( 
    <>
            <DatePicker
                id="datepick"
                locale="ko" // 달력 한글화
                dateFormat="yyyy-MM-dd"
                selected={startDate} // 날짜 state
                onChange={setStartDate} // 날짜 설정 콜백 함수 
                minDate={new Date()} // 과거 날짜 disable
                popperModifiers={{
                    // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정 
                    preventOverflow: { enabled: true, },
                }} popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록 
                // 토요일, 일요일 색깔 바꾸기 위함
                dayClassName={
                    date => getDayName(createDate(date)) === '토' ? "saturday"
                        :
                        getDayName(createDate(date)) === '일' ? "sunday" : undefined
                }
            />
        </>
    );
}





export default write;