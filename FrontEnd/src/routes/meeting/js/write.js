import React, {useState} from "react";
import "../css/meeting.css"

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ko';

import DatePicker, { registerLocale } from "react-datepicker";

import "../css/react-datepicker.css";

import ko from 'date-fns/locale/ko'; registerLocale('ko', ko);


class write extends React.Component {
    editorRef = React.createRef();
    dateRef = React.createRef();

    componentDidMount() {
        
    }

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
        eDate:0,
            
        
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
        // console.log(this.state.categoryno);
    }

    mainTitChange = (event) => {
        this.setState({
            mainTit: event.target.value,
            checkmainTit:true
        })
        // console.log(this.state.mainTit);
    }

    subTitChange = (event) => {
        this.setState({
            subTit: "#"+event.target.value,
            checksubTit:true
        })
        // console.log(this.state.subTit);
    }

    setStartDate = (event) => { 
        this.setState({
            sDate: event.target.value,
        })
        // console.log(this.state.sDate);
    }

    editorChange = (e) => { 
        this.setState({
            content: this.editorRef.current.getInstance().getHtml(),
            checkcontent:true
        })
        // console.log(this.state.content);
    }

    /* Click 관련 메소드*/
    //enddate enddatepick

    oneDay = (e) => {
        this.setState({
            eDate:0
        })

        const startDay = document.getElementById('startdatepick').value;

        document.getElementById('enddatepick').setAttribute('style', 'display:none');
        document.getElementById('enddate').setAttribute('style', 'display:inline-block');

        document.getElementById('enddate').value=startDay;
        
    }

    oneWeek = (e) => {
        this.setState({
            eDate:1
        })

        const startDay = document.getElementById('startdatepick').value;

        var sYear = startDay.substring(0,4);
        var sMonth = startDay.substring(5,7);
        var sDate = startDay.substring(8,10);

        const nowDate = moment(sYear + '-' + sMonth + '-' + sDate);
        const nextDate = nowDate.clone().add(7, 'days');

        sYear = nextDate._d.getFullYear();
        sMonth = nextDate._d.getMonth() + 1;
        sDate = nextDate._d.getDate();

        sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
        sDate  = sDate > 9 ? sDate : "0" + sDate;

        // console.log(sYear + '-' + sMonth + '-' + sDate);

        document.getElementById('enddatepick').setAttribute('style', 'display:none');
        document.getElementById('enddate').setAttribute('style', 'display:inline-block');
        
        document.getElementById('enddate').value = sYear + '-' + sMonth + '-' + sDate;

        
    }

    oneMonth = (e) => {
        this.setState({
            eDate:1
        })

        const startDay = document.getElementById('startdatepick').value;

        var sYear = startDay.substring(0,4);
        var sMonth = startDay.substring(5,7);
        var sDate = startDay.substring(8,10);

        const nowDate = moment(sYear + '-' + sMonth + '-' + sDate);
        const nextDate = nowDate.clone().add(1, 'months');

        sYear = nextDate._d.getFullYear();
        sMonth = nextDate._d.getMonth() + 1;
        sDate = nextDate._d.getDate();

        sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
        sDate  = sDate > 9 ? sDate : "0" + sDate;

        // console.log(sYear + '-' + sMonth + '-' + sDate);

        document.getElementById('enddatepick').setAttribute('style', 'display:none');
        document.getElementById('enddate').setAttribute('style', 'display:inline-block');
        
        document.getElementById('enddate').value = sYear + '-' + sMonth + '-' + sDate;
        
    }

    Free = (e) => {
        this.setState({
            eDate:2
        })
        
        document.getElementById('enddatepick').setAttribute('style', 'display:inline-block');
        document.getElementById('enddate').setAttribute('style', 'display:none');
    }

    handleFileInput(e) {
        this.setState({
            selectedFile : e.target.files[0],
        })
        var filename;
        if(window.FileReader){
            filename = e.target.files[0].name;
        } else {
            filename = e.target.val().split('/').pop().split('\\').pop();
        }
        // console.log(e.target.files[0]);
        // console.log(filename);

        document.getElementById('upload-name').value = filename;
        
        var file = e.target.files[0];
        // console.log(this.state.startDay);
        // console.log(file);
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
            // console.log(this.state.thumb);
        }).catch(err => {
            // console.log(err);
        })
    }

    writeClick = (e) => {
        e.preventDefault();
        let sId = sessionStorage.getItem('id');

        // console.log(document.getElementById("datepick").value);
        this.setState({
            sDate:document.getElementById("startdatepick").value
        })

        var enddate = "";

        if (this.state.eDate === 0) {
            enddate = document.getElementById("startdatepick").value;    
        }
        else if (this.state.eDate === 1) {
            enddate = document.getElementById("enddate").value;
        } else {
            enddate = document.getElementById("enddatepick").value;
        }

        axios.post("http://127.0.0.1:8080/myapp/meeting/enrollmeeting", {
            hostid: sId,
            maintitle: this.state.mainTit,
            subtitle: this.state.subTit,
            date: document.getElementById("startdatepick").value,
            detail: this.state.content,
            categoryno: this.state.categoryno,
            file: this.state.thumb,
            enddate: enddate
        }).then(res => {
            if (res.data === "SUCESS") {
                console.log("성공");
                alert("글 작성이 완료되었습니다.");
                if (this.state.categoryno === 1)
                    window.location.replace('/meeting/exercise');
                else if (this.state.categoryno === 2)
                    window.location.replace('/meeting/music');
                else if (this.state.categoryno === 3)
                    window.location.replace('/meeting/game');
                else if (this.state.categoryno === 4)
                    window.location.replace('/meeting/diy');
                else if (this.state.categoryno === 5)
                    window.location.replace('/meeting/lans');
                else
                    window.location.replace('/meeting/study');
            }
            else {
                console.log("실패");
                alert("글 작성에 실패하셨습니다. 다시 작성해 주세요!");
                window.location.replace('/meeting/write');
            }
        })


    }

    
    render() {
        const { location } = this.props;
        return (
            <div className="writeWrap">
                <div className="titleset">
                    <p className="mainTit">Leeting 등록</p>
                    <p className="subTit">당신이 원하는 Leeting!</p>
                </div>
                <div className="writeInputWrap">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">카테고리</th>
                                <td colSpan="5">
                                    <select id="category" value={this.state.value} onChange={this.selectChange}>
                                        <option value="1" defaultValue>운  동</option>
                                        <option value="2">음  악</option>
                                        <option value="3">게  임</option>
                                        <option value="4">D.I.Y</option>
                                        <option value="5">Lan's Meeting</option>
                                        <option value="6">스터디</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">제목</th>
                                <td colSpan="2">
                                    <input type="text" onChange={this.mainTitChange}></input>
                                </td>
                                <th scope="row">부제목</th>
                                <td colSpan="2">
                                    <input type="text" onChange={this.subTitChange}></input>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">썸네일</th>
                                <td colSpan="5">
                                <form className="filebox bs3-primary"  encType="multipart/form-data">
                                    <input className="upload-name" id="upload-name"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_filename">업로드</label> 
                                    <input type="file" accept="image/*"id="ex_filename" className="upload-hidden" onChange={e => this.handleFileInput(e)}/> 
                                </form>
                                    {/* <input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
                                    <button type="button" onClick={this.uploadImage}>업로드</button> */}
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">기간</th>
                                <td colSpan="5">
                                    <button id="oneDay" onClick={this.oneDay}>하루</button>
                                    <button id="oneWeek" onClick={this.oneWeek}>1주</button>
                                    <button id="oneMonth" onClick={this.oneMonth}>1달</button>
                                    <button id="Free" onClick={this.Free}>자유</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">시작일</th>
                                <td colSpan="2">
                                    <StartDay
                                        startDates = {location.state.date}
                                    />
                                </td>
                                <th scope="row">종료일</th>
                                <td colSpan="2">
                                    <input id="enddate" disabled></input>
                                    <EndDay
                                        endDates = {location.state.date}
                                    />
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
                        </tbody>
                    </table>
                    <div className="btndiv">
                        <button id="join" onClick={this.writeClick}>등록하기</button>
                    </div>
                </div>
                
            </div>
        );
    }
}

function StartDay({ startDates }){
    // 달력 날짜 변경 시 기준점이 되는 날짜 
    const [startDate, setStartDate] = useState(new Date(startDates));

    const tomorrow = moment().add(1, 'd')._d;
            
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
                id="startdatepick"
                locale="ko" // 달력 한글화
                dateFormat="yyyy-MM-dd"
                selected={startDate} // 날짜 state
                onChange={setStartDate} // 날짜 설정 콜백 함수 
                minDate={tomorrow} // 과거 날짜 disable
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

function EndDay({ endDates }){
    // 달력 날짜 변경 시 기준점이 되는 날짜 
    const [startDate, setStartDate] = useState(new Date(endDates));

    const tomorrow = moment().add(1, 'd')._d;
            
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
                id="enddatepick"
                locale="ko" // 달력 한글화
                dateFormat="yyyy-MM-dd"
                selected={startDate} // 날짜 state
                onChange={setStartDate} // 날짜 설정 콜백 함수 
                minDate={tomorrow} // 과거 날짜 disable
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