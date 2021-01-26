import React from "react";
import "../css/meeting.css"
import axios from "axios";

import { Link } from "react-router-dom";
import propTypes  from "prop-types";

class Detail extends React.Component {

    constructor() {
        super();
        this.state = {
            meetinglike:0,
            likes: false,
            checkJoin: false,
            btnText : "미팅 참가하기",
        }
    }

    componentDidMount() {
        const { location, history } = this.props;
        let sId = sessionStorage.getItem('id');
        if (location.state === undefined) {
            history.push("/");
        }
        if (sId === null) {
            document.getElementById('likebtn').disabled = true;
            document.getElementById('joinBtn').disabled = true;
            console.log('test');
        }
        else {
            document.getElementById('likebtn').disabled = false;
            document.getElementById('joinBtn').disabled = false;
            document.getElementById('jointab').setAttribute('style', 'display:none');
            this.checkLike();
            this.checkJoin();
            this.checkHost();
            // console.log(this.state.likes);
        }
    }

    checkHost = async () => {
        const { location } = this.props;

        let sId = sessionStorage.getItem('id');

        if (location.state.hostid === sId) {
            document.getElementById('likebtn').disabled = true;
            document.getElementById('joinBtn').setAttribute("style", "display:none");
            // document.getElementById('joinOutBtn').setAttribute("style", "display:none");
            document.getElementById('modifyBtn').setAttribute("style", "display:block");
        }
        
    }

    checkLike = async () => {
        const { location } = this.props;
        let category;
        let sId = sessionStorage.getItem('id');
        if (location.state.categoryno === 1)
            category = 'exercise';
        else if (location.state.categoryno === 2)
            category = 'music';
        else if (location.state.categoryno === 3)
            category = 'game';
        else if (location.state.categoryno === 4)
            category = 'diy';
        else if (location.state.categoryno === 5)
            category = 'lans';
        else
            category = 'study';
            
        let url = 'http://127.0.0.1:8080/myapp/meeting/' + category + '/' + location.state.id;
        let data = await axios.get(url);
        if (data.data.message === "SUCCESS") {
            data = data.data.list;
            for (let i = 0; i < data.length; i++) {
                if (sId === data[i].userid) {
                    if (data[i].likestatus) {
                        this.setState({
                            likes: true
                        })
                        document.getElementById('likebtn').classList.add('ilike');
                    }
                }
            }
            // data = data.data;
            // this.setState({ data, isLoading: false });    
        }
    }

    checkJoin = async () => {
        const { location } = this.props;
        let category;
        let sId = sessionStorage.getItem('id');
        if (location.state.categoryno === 1)
            category = 'exercise';
        else if (location.state.categoryno === 2)
            category = 'music';
        else if (location.state.categoryno === 3)
            category = 'game';
        else if (location.state.categoryno === 4)
            category = 'diy';
        else if (location.state.categoryno === 5)
            category = 'lans';
        else
            category = 'study';
        
        let url = 'http://127.0.0.1:8080/myapp/meeting/' + category + '/' + location.state.id;
        let data = await axios.get(url);
        // console.log(data.data.message);
        if (data.data.message === "SUCCESS") {
            data = data.data.list;
            for (let i = 0; i < data.length; i++) {
                // console.log(data[i].userid);
                if (sId === data[i].userid) {
                    // this.state.checkJoin = true;
                    this.setState({
                        checkJoin: true,
                        btnText:"미팅 나가기"
                    })
                }
            }
            // console.log(this.state.checkJoin);
            if (this.state.checkJoin === true) {
                // document.getElementById('joinBtn').value="미팅 나가기";
                // document.getElementById('joinOutBtn').setAttribute("style", "display:block");
            } else
                document.getElementById('likebtn').disabled = true;
            // data = data.data;
            // this.setState({ data, isLoading: false });
        }
    }
    
    likeClick = (e) => {
        e.preventDefault();
        const { location } = this.props;

        let sId = sessionStorage.getItem('id');

        axios.put('http://127.0.0.1:8080/myapp/meeting/setlike', {
            likestatus: !(this.state.likes),
            userid: sId,
            meetingno: location.state.id
        }).then(res => {
            this.setState({
                likes: !(this.state.likes)
            })
            if (document.getElementById('likebtn').classList.contains('ilike') === true) {
                document.getElementById('likebtn').classList.remove('ilike');
            } else {
                document.getElementById('likebtn').classList.add('ilike');
            }
        })
    }

    profileClick = (e) => {

    }

    joinMeetingClick = (e) => {
        e.preventDefault();

        const { location } = this.props;
        let sId = sessionStorage.getItem('id');
        
        axios.post('http://127.0.0.1:8080/myapp/meeting/participation', {
            meetingno: location.state.id,
            userid: sId
        }).then(res => {
            if (res.data === "SUCESS") {
                console.log("미팅 참여");
                this.setState({
                    btnText:"미팅 나가기",
                    checkJoin:true
                })
                // document.getElementById('joinBtn').setAttribute("style", "display:none");
                // document.getElementById('joinOutBtn').setAttribute("style", "display:block");
                document.getElementById('likebtn').disabled = false;
            } else {
                console.log("미팅 나감");
                this.setState({
                    btnText:"미팅 참가하기",
                    checkJoin:false
                })
                document.getElementById('likebtn').disabled = true;
            }
        })
    }

    // goModify = (e) => {
    //     e.preventDefault();

    //     const { location, history } = this.props;

    //     let modifyurl = '/meeting/modify/' + location.state.id;
    //     // console.log(modifyurl);
    //     history.push(modifyurl);
    // }

  render() {
      const { location } = this.props;
      let codes = location.state.detail;
    if (location.state) {
        return (
            <div id="meeting_detail">
                <div className="titleset">
                    <img src={location.state.file} alt={location.state.maintitle}></img>
                    <div className="titleswrap">
                        <div className="titles">
                            <h1 className="tit">{location.state.maintitle}</h1>
                            <p className="subtit">{location.state.subtitle}</p>
                        </div>
                        <div className="like">
                            <button id="likebtn" className="likebtn" onClick={this.likeClick}></button>
                            {/* <p className="likecnt">1</p> */}
                            </div>
                        <div className="joinMeeting" >
                            <button id="joinBtn" onClick={ this.joinMeetingClick }>{this.state.btnText}</button>
                            {/* <button id="joinOutBtn">미팅 나가기</button> */}
                            <GoModify
                                key={location.state.id}
                                id={location.state.id}
                                maintitle={location.state.maintitle}
                                subtitle={location.state.subtitle}
                                date={location.state.date}
                                hostid={location.state.hostid}
                                detail={location.state.detail}
                                categoryno={location.state.categoryno}
                                file={location.state.file}
                            />
                            <p id="jointab">로그인 하시면 미팅에 참여 및 리뷰가 가능합니다.</p>
                        </div>
                            <hr className="hosthr"/>
                        <div className="host">
                            <img className="hostProfile" onClick={this.profileClick} src="../img\noProfile.png" alt="프로필사진"></img>
                            <p className="hostNickname">{location.state.hostid} </p>
                        </div>
                    </div>
                </div>
                <hr className="detail_hr"/>
                <div className="detail_view">
                    <p className="detail_subtit">Leeting 소개</p>
                    <div className="detail_content" dangerouslySetInnerHTML={{ __html: codes} }></div>
                    </div>
                
            </div>
            // 
        );            
    } else {
      return null;
    }
  }
}

function GoModify({ id, maintitle, subtitle, date, hostid, detail, categoryno, file }) {
    return (
        <div id="modifyBtn">
            <Link
                to={{
                    pathname: `/meeting/modify/${id}`,
                    state: {
                        id,
                        maintitle,
                        subtitle,
                        date,
                        hostid,
                        detail,
                        categoryno,
                        file
                    }
                }}
            >미팅 관리하기
                {/* <button id="modifyBtn" ></button> */}
            </Link>
        </div>
    )
}

GoModify.propTypes = {
    id: propTypes.number.isRequired,
    maintitle: propTypes.string.isRequired,
    subtitle: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    hostid: propTypes.string.isRequired,
    detail: propTypes.string.isRequired,
    categoryno: propTypes.number.isRequired,
    file: propTypes.string.isRequired
};
    
export default Detail;