import React from "react";
import "../css/meeting.css"
import axios from "axios";
import Study from "../../../components/meeting/study"

class study extends React.Component {

    state = {
        isLoading: true,
        data:[]
    }
    getLeeting = async () => {
        let data = await axios.get('http://127.0.0.1:8080/myapp/meeting/study');
        data = data.data;
        // console.log(data);
        this.setState({ data, isLoading: false });
    }
    componentDidMount() {
        let sId = sessionStorage.getItem('id');

        if (sId === null) {
            document.getElementById('writeBtn').setAttribute('style', 'display:none');
        }

        this.getLeeting();
        // console.log(this.state.data);
    }

    exercisePage = (e) => {
        this.props.history.push('/meeting/exercise');
     }

    musicPage = (e) => {
        this.props.history.push('/meeting/music');
    }

    gamePage = (e) => {
        this.props.history.push('/meeting/game');
    }

    diyPage = (e) => {
        this.props.history.push('/meeting/diy');
    }

    lansPage = (e) => {
        this.props.history.push('/meeting/lans');
    }

    studyPage = (e) => {
        this.props.history.push('/meeting/study');
    }

    writeBtn = (e) => {
        e.preventDefault();
        
        this.props.history.push("/meeting/write");
    }

    render() {
        const { isLoading, data } = this.state;
        return (
            <div id="meeting_list">
                <div id="sub_wrap">
                    <div id="sub_menu">
                        <ul>
                            <li id="exercise" onClick={this.exercisePage}>운 동</li>
                            <li id="music" onClick={this.musicPage}><a>음 악</a></li>
                            <li id="game" onClick={this.gamePage}><a>게 임</a></li>
                            <li id="diy" onClick={this.diyPage}><a>D.I.Y</a></li>
                            <li id="lans" onClick={this.lansPage}><a>랜선 모임</a></li>
                            <li id="study" className="onPage" onClick={this.studyPage}><a>스터디</a></li>
                        </ul>
                    </div>
                </div>
                <div className="titles">
                    <h1 className="tit">스 터 디</h1>
                    <p className="subtit">지금 자면 꿈을 꾸지만, 지금 공부하면 꿈을 이룬다.<br/>- 하버드대학 도서관</p>
                </div>
                

                {/*<div className="loading_view">
                        <div className="loader loader-7">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <span className="loader_text">Loading...</span>
                        </div>
                </div>*/}
                

                {isLoading ? (
                    <div className="loading_view">
                        <div className="loader loader-7">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <span className="loader_text">Loading...</span>
                        </div>
                    </div>
                ) : (
                        <div className="list_view">
                            {
                                data.map((leeting, idx) => (
                                    <Study
                                        key={idx}
                                        idx={idx}
                                        id={leeting.meetingno}
                                        maintitle={leeting.maintitle}
                                        subtitle={leeting.subtitle}
                                        date={leeting.date}
                                        hostid={leeting.hostid}
                                        detail={leeting.detail}
                                        categoryno={leeting.categoryno}
                                        file={leeting.file}
                                        meetinglike={leeting.meetinglike}
                                        enddate={leeting.enddate}
                                        participants={leeting.participants}
                                    />
                            ))}
                        </div>
                )}
                
                <div id="writeBtn" className="writeBtn">
                    <button onClick={this.writeBtn}>등록하기</button>
                </div>
            </div>
        );
    }
}

export default study;