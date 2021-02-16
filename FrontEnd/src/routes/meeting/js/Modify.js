import React, { useState } from "react";
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


class Modify extends React.Component {
    
    editorRef = React.createRef();
    dateRef = React.createRef();
    
    constructor() {
        super();
        this.state = {
            thumb: "https://leeting.s3.ap-northeast-2.amazonaws.com/static/noimage.png",
        }
    }

    state = {
        value:"1",
        id : "1",
        maintitle : "1",
        subtitle : "1",
        date : "1",
        hostid : "1",
        detail : "1",
        categoryno : "1",
        file: "1",  
        enddate:"",
        thumb: "https://leeting.s3.ap-northeast-2.amazonaws.com/static/noimage.png",
        
        selectedFile: null, //썸네일 파일 첨부
    }
    
    componentDidMount() {
        const { location, history } = this.props;
        var subtit = location.state.subtitle;
        var subtitarray = subtit.split("#");
        subtit = subtitarray[1];
        if (location.state === undefined) {
            history.push("/");
        }

        if (sessionStorage.getItem('id') === null || sessionStorage.getItem('id')!==location.state.hostid) {
            document.getElementById('root').setAttribute('style', 'display:none');
            window.location.replace("/WrongPage");
        }
        
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
        if (location.state.enddate === undefined) {
            this.setState({
                enddate: location.state.date
            })
            console.log("test");
        }
        this.setState({
            id : location.state.id,
            maintitle : location.state.maintitle,
            subtitle : location.state.subtitle,
            date : location.state.date,
            hostid : location.state.hostid,
            detail : location.state.detail,
            categoryno : location.state.categoryno,
            value : location.state.categoryno,
            file: location.state.file,
            thumb : location.state.thumb
        })

        document.getElementById('category').value = location.state.categoryno;
        document.getElementById('mainTit').value = location.state.maintitle;
        document.getElementById('subTit').value = subtit;
        document.getElementById('m_mainTit').value = location.state.maintitle;
        document.getElementById('m_subTit').value = subtit;
    }


    /*Change 관련 메소드*/

    selectChange = (event) => {
        this.setState({
            categoryno: event.target.value,
            value:event.target.value
        })
        document.getElementById('category').value = event.target.value;
        // console.log(this.state.categoryno);
    }

    mainTitChange = (event) => {
        this.setState({
            maintitle: event.target.value
        })
        // console.log(this.state.mainTit);
    }

    subTitChange = (event) => {
        this.setState({
            subtitle: "#"+event.target.value
        })
        // console.log(this.state.subTit);
    }

    setStartDate = (event) => { 
        this.setState({
            date: event.target.value,
        })
        // console.log(this.state.sDate);
    }

    editorChange = (e) => { 
        this.setState({
            detail: this.editorRef.current.getInstance().getHtml()
        })
        // console.log(this.state.content);
    }

    /* Click 관련 메소드*/

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
        formData.append('hostid', this.state.hostid);
        formData.append('dirNum', 1);
        axios.post('http://127.0.0.1:8080/myapp/gallery/upload', formData,{
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then(res => {
            this.setState({
                file: res.data
            })
            // console.log(this.state.thumb);
        }).catch(err => {
            // console.log(err);
        })
    }

    writeClick = (e) => {
        e.preventDefault();

        console.log(this.state.file);
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
        axios.put("http://127.0.0.1:8080/myapp/meeting/", {
            meetingno : this.state.id,
            hostid: this.state.hostid,
            maintitle: this.state.maintitle,
            subtitle: this.state.subtitle,
            date: document.getElementById("startdatepick").value,
            detail: this.state.detail,
            categoryno: this.state.categoryno,
            file: this.state.file,
            enddate : enddate,
        }).then(res => {
            if (res.data === "SUCCESS") {
                console.log("성공");
                alert("수정 완료되었습니다.");
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
                alert("수정 실패하셨습니다. 다시 작성해 주세요!");
                var url = "/meeting/modify/" + this.state.id;
                window.location.replace(url);
            }
        })
    }

    deleteClick = (e) => { 
        e.preventDefault();
        let no = this.state.id;
        var url = "http://127.0.0.1:8080/myapp/meeting/" + no;
        axios.delete(url, {
            meetingno: this.state.id,
            no:this.state.id
        }).then(res => {
            alert("삭제 성공");
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
        })
    }
    
    render() {
        const { location } = this.props;
        return (
            
      <div id="main_content">
            <div className="writeWrap">
                <div className="titleset">
                    <p className="mainTit">Leeting 관리</p>
                    <p className="subTit">당신이 원하는 Leeting!</p>
                </div>
                <div className="writeInputWrap">
                    <table>
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
                            <tr className="M_PC">
                                <th scope="row">제목</th>
                                <td colSpan="2">
                                    <input id="mainTit" type="text" onChange={this.mainTitChange}></input>
                                </td>
                                <th scope="row">부제목</th>
                                <td colSpan="2">
                                    <input id="subTit" type="text" onChange={this.subTitChange}></input>
                                </td>
                            </tr>
                            <tr className="M_Mobile">
                                <th scope="row">제목</th>
                                <td colSpan="5">
                                    <input id="m_mainTit" type="text" onChange={this.mainTitChange}></input>
                                </td>
                            </tr> 
                            <tr className="M_Mobile">
                                <th scope="row">부제목</th>
                                <td colSpan="5">
                                    <input id="m_subTit" type="text" onChange={this.subTitChange}></input>
                                </td>
                            </tr>    
                            <tr>
                                <th scope="row">썸네일</th>
                                <td colSpan="5">
                                <div className="filebox bs3-primary">
                                    <input className="upload-name" id="upload-name"placeholder="파일선택" disabled="disabled"/>
                                    <label htmlFor="ex_filename">업로드</label> 
                                    <input type="file" accept="image/*" id="ex_filename" className="upload-hidden" onChange={e => this.handleFileInput(e)}/> 
                                </div>
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
                            <tr className="M_PC">
                                <th scope="row">시작일</th>
                                <td colSpan="2">
                                    <StartDay
                                        startDates={location.state.date}
                                    />
                                </td>
                                <th scope="row">종료일</th>
                                <td className="onModified" colSpan="2">
                                    <input id="enddate" className="displaynone" disabled></input>
                                    <EndDay
                                        startDates={location.state.enddate}
                                    />
                                </td>
                            </tr>
                            <tr className="M_Mobile">
                                <th scope="row">시작일</th>
                                <td colSpan="5">
                                    <StartDay
                                        startDates={location.state.date}
                                    />
                                </td>
                            </tr>
                            <tr className="M_Mobile">
                                <th scope="row">종료일</th>
                                <td className="onModified" colSpan="5">
                                    <input id="m_enddate" className="displaynone" disabled></input>
                                    <EndDay
                                        startDates={location.state.enddate}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">내 용</th>
                                <td colSpan="5">
                                    <Editor
                                        id="editor"
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
                        </tbody>
                    </table>
                <div className="btndiv">
                    <button id="join" onClick={this.writeClick}>수정하기</button>
                    <button id="delete" onClick={this.deleteClick}>삭제하기</button>
                </div>
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

function EndDay({ startDates }){
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

export default Modify;