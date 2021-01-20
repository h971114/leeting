import React, {Component } from "react";
import "../css/meeting.css"
import axios from "axios";
import Music from "../../../components/meeting/music"

class music extends React.Component {

    state = {
        isLoading: true,
        data:[]
    }
    getLeeting = async () => {
        let data = await axios.get('http://127.0.0.1:8080/myapp/meeting/listmeeting');
        data = data.data;
        // console.log('data is ' + JSON.stringify(data.categories));
        this.setState({ data, isLoading: false });
    }
    componentDidMount() {
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

    render() {
        const { isLoading, data } = this.state;
        return (
            <div id="meeting_list">
                <div id="sub_wrap">
                    <div id="sub_menu">
                        <ul>
                            <li id="exercise" onClick={this.exercisePage}>운 동</li>
                            <li id="music" className="onPage" onClick={this.musicPage}><a>음 악</a></li>
                            <li id="game" onClick={this.gamePage}><a>게 임</a></li>
                            <li id="diy" onClick={this.diyPage}><a>D.I.Y</a></li>
                            <li id="lans" onClick={this.lansPage}><a>랜선 모임</a></li>
                            <li id="study" onClick={this.studyPage}><a>스터디</a></li>
                        </ul>
                    </div>
                </div>
                <div className="titles">
                    <h1 className="tit">음 악</h1>
                    <p className="subtit">음악은 우리에게 사랑을 가져다주는 분위기 좋은 음식이다.<br/>- 셰익스피어</p>
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
                            {data.map(leeting => (
                                <Music
                                    key={leeting.meetingno}
                                    id={leeting.meetingno}
                                    maintitle={leeting.maintitle}
                                    subtitle={leeting.subtitle}
                                    date={leeting.date}
                                    hostid={leeting.hostid}
                                    detail={leeting.detail}
                                    categoryno={leeting.categoryno}
                                    file={leeting.file}
                                />
                            ))}
                        </div>
                )}
                
            </div>
        );
    }
}

export default music;