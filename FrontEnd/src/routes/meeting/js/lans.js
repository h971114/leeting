import React from "react";
import "../css/meeting.css"
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/ko';
import Lans from "../../../components/meeting/lans"

class lans extends React.Component {

    state = {
        isLoading: true,
        data:[]
    }
    getLeeting = async () => {
        let data = await axios.get('http://127.0.0.1:8080/myapp/meeting/lans');
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
                            <Link to="/meeting/exercise">
                                <li id="exercise">운 동</li>
                            </Link>
                            <Link to="/meeting/music">
                                <li id="music">음 악</li>
                            </Link>
                            <Link to="/meeting/game">
                                <li id="game">게 임</li>
                            </Link>
                            <Link to="/meeting/diy">
                                <li id="diy">D.I.Y</li>
                            </Link>
                            <Link to="/meeting/lans">
                                <li id="lans" className="onPage">랜선 모임</li>
                            </Link>
                            <Link to="/meeting/study">
                                <li id="study">스터디</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className="titles">
                    <h1 className="tit">Leeting</h1>
                    <p className="subtit">운명에는 우연이 없다 인간은 어떤 운명을 만나기 전에 스스로 그것을 만든다.<br/>- 토마스 윌슨</p>
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
                            <Lans
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
                    <Link
                        to={{
                            pathname: `/meeting/write`,
                            state: {
                                date: moment().add(1, 'd')._d
                            }
                        }}
                    >
                        <button >등록하기</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default lans;