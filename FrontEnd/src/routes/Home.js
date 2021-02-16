import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Slider.css";
import "./Home.css";

import Posts from "../components/meeting/my"

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recoPosts, setRecoPosts] = useState([]);
    const [recoLoading, setRecoLoading] = useState(false);
    const [noPosts, setVPost] = useState(false);
    let sId = sessionStorage.getItem('id');

    useEffect(() => {
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
        const fetchPosts = async () => {
            setLoading(true);
            let data = await axios.get('http://127.0.0.1:8080/myapp/member/usermeet', {
                params: {
                    id : sId
                }
            });
            data = data.data;

            if (data.length === 0) {
                setVPost(true);
                setLoading(false);
            } else {
                setPosts(data);
                setLoading(false);
            }
        }

        const recoPosts = async () => {
            setRecoLoading(true);
            console.log(sId);
            if (sId === null) {
                // eslint-disable-next-line
                sId = "";
            }
            let data = await axios.get('http://127.0.0.1:8080/myapp/recommend/reco', {
                params: {
                    id: sId
                }
            });
            data = data.data;
            console.log(data);
            setRecoPosts(data);
            setRecoLoading(false);
        }

        if (sId !== null) {
            fetchPosts();
        } else {
            document.getElementById('myleetingTit').setAttribute('style', 'display:none');
            document.getElementById('myleetingList').setAttribute('style', 'display:none');
        }
        recoPosts();
        
    }, []);

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
                <div id="myleetingList">
                    <Posts posts={posts} loading={loading} noPosts={noPosts} />
                </div>
                <div className="quicktit">
                    <h3>추천하는 리팅 👍</h3>
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
                    <Posts posts={recoPosts} loading={recoLoading}/>
                </div>
            </div>
    )
}
  
  export default Home;