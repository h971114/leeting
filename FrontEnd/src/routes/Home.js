import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Slider.css";
import "./Home.css";

import My from "../components/meeting/my"

class Home extends React.Component {

    state = {
        isLoading: true,
        data:[]
    }

    getLeeting = async () => {
        let sId = sessionStorage.getItem('id');
        let data = await axios.get('http://127.0.0.1:8080/myapp/member/usermeet', {
            params: {
                id : sId
            }
        });
        data = data.data;

        this.setState({ data, isLoading: false });
        // document.getElementById('myleetingNo').setAttribute("style", "display:none");

        console.log(data.length);
        if (data.length === 0) {
            document.getElementById('myleetingList').setAttribute("style", "display:none");
            document.getElementById('myleetingNo').setAttribute("style", "display:block");
        } else {
            document.getElementById('myleetingList').setAttribute("style", "display:block");
            document.getElementById('myleetingNo').setAttribute("style", "display:none");
        }
    }
    componentDidMount() {
        let sId = sessionStorage.getItem('id');

        if (sId !== null) {
            this.getLeeting();
        } else {
            document.getElementById('myleetingTit').setAttribute('style', 'display:none');
            document.getElementById('myleetingList').setAttribute('style', 'display:none');
            document.getElementById('myleetingNo').setAttribute('style', 'display:none');
        }

        // console.log(this.state.data);
    }

    render() {
        const { isLoading, data } = this.state;
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div id="main_content">
                <div className="slick_slider">
                    <div className="main_visual">
                        <Slider {...settings}>
                            <div className="slider1">
                            </div>
                            <div className="slider2">
                            </div>
                            <div className="slider3">
                            </div>
                        </Slider>
                    </div>
                </div>
                <div className="shortcut">
                    <ul>
                        <li className="exercise">
                            <Link
                                to={{
                                    pathname: `/meeting/exercise`
                                }}
                            >
                                <img src="img/shortcut1.png" alt="운동"></img>
                                <br />운 동
                            </Link>
                        </li>
                        <li className="music">
                            <Link
                                to={{
                                    pathname: `/meeting/music`
                                }}
                            >
                                <img src="img/shortcut2.png" alt="음악"></img>
                                <br/>음 악
                            </Link>
                        </li>
                        <li className="game">
                            <Link
                                to={{
                                    pathname: `/meeting/game`
                                }}
                            >
                                <img src="img/shortcut3.png" alt="게임"></img>
                                <br/>게 임
                            </Link>
                        </li>
                        <li className="diy">
                            <Link
                                to={{
                                    pathname: `/meeting/diy`
                                }}
                            >
                                <img src="img/shortcut4.png" alt="DIY"></img>
                                <br/>D.I.Y
                            </Link>
                        </li>
                        <li className="leet">
                            <Link
                                to={{
                                    pathname: `/meeting/lans`
                                }}
                            >
                                <img src="img/shortcut5.png" alt="랜선 모임"></img>
                                <br/>랜선 모임
                            </Link>
                        </li>
                        <li className="study">
                            <Link
                                to={{
                                    pathname: `/meeting/study`
                                }}
                            >
                                <img src="img/shortcut6.png" alt="스터디"></img>
                                <br/>스터디
                            </Link>
                        </li>
                    </ul>
                </div>
                <div id="myleetingTit" className="quicktit">
                    <h3>내가 보고 있는 리팅 😎</h3>
                    
                    <Link
                        className="all" 
                        to={{
                            pathname: `/mypage`
                        }}
                    >
                        마이페이지 가기
                    </Link>
                </div>
                <div id="myleetingNo">
                    <Link
                        to={{
                            pathname: `/meeting/exercise`
                        }}
                    >
                        <img src="img/noMyLeeting.png" alt="참여 리팅 없음"></img>
                    </Link>
                </div>
                <div id="myleetingList">
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
                                        <My
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
                </div>
                <div className="quicktit">
                    <h3>지금 가장 인기 있는 리팅 🥇</h3>
                    <Link
                        className="all" 
                        to={{
                            pathname: `/meeting/exercise`
                        }}
                    >
                        전체보기
                    </Link>
                </div>
                <div className="favoriteleet">
                    
                    <div className="favorite">
                        <div className="favimg">
                            <a href="/"><img src="img/favimg.png" alt="인기있는 리팅 이미지"></img></a>
                        </div>
                        <div className="favtit">
                            <p className="subtit"><a href="/">#카테고리</a></p>
                            <p className="maintit"><a href="/">테스트 제목1</a></p>
                        </div>
                    </div>
                    <div className="favorite">
                        <div className="favimg">
                            <a href="/"><img src="img/favimg.png" alt="인기있는 리팅 이미지"></img></a>
                        </div>
                        <div className="favtit">
                            <p className="subtit"><a href="/">#카테고리</a></p>
                            <p className="maintit"><a href="/">테스트 제목1</a></p>
                        </div>
                    </div>
                    <div className="favorite">
                        <div className="favimg">
                            <a href="/"><img src="img/favimg.png" alt="인기있는 리팅 이미지"></img></a>
                        </div>
                        <div className="favtit">
                            <p className="subtit"><a href="/">#카테고리</a></p>
                            <p className="maintit"><a href="/">테스트 제목1</a></p>
                        </div>
                    </div>
                    <div className="favorite">
                        <div className="favimg">
                            <a href="/"><img src="img/favimg.png" alt="인기있는 리팅 이미지"></img></a>
                        </div>
                        <div className="favtit">
                            <p className="subtit"><a href="/">#카테고리</a></p>
                            <p className="maintit"><a href="/">테스트 제목1</a></p>
                        </div>
                    </div>
                    <div className="favorite">
                        <div className="favimg">
                            <a href="/"><img src="img/favimg.png" alt="인기있는 리팅 이미지"></img></a>
                        </div>
                        <div className="favtit">
                            <p className="subtit"><a href="/">#카테고리</a></p>
                            <p className="maintit"><a href="/">테스트 제목1</a></p>
                        </div>
                    </div>


                </div>
            </div>
    );
    }
}
  
  export default Home;