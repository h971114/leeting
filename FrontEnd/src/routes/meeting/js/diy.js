import React from "react";
import "../css/meeting.css"
import axios from "axios";
import Diy from "../../../components/meeting/diy"

class diy extends React.Component {

    state = {
        isLoading: true,
        data:[]
    }
    getLeeting = async () => {
        let data = await axios.get('http://127.0.0.1:8080/myapp/meeting/diy');
        data = data.data;
        // console.log('data is ' + JSON.stringify(data.categories));
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
                            <li id="diy" className="onPage" onClick={this.diyPage}><a>D.I.Y</a></li>
                            <li id="lans" onClick={this.lansPage}><a>랜선 모임</a></li>
                            <li id="study" onClick={this.studyPage}><a>스터디</a></li>
                        </ul>
                    </div>
                </div>
                <div className="titles">
                    <h1 className="tit">D.I.Y</h1>
                    <p className="subtit">자세히 보아야 예쁘다 오래 보아야 사랑스럽다 너도 그렇다.<br/>- 나태주</p>
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
                        {data.map((leeting, idx)=> (
                            <Diy
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

export default diy;