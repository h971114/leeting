import React from "react";
import Slider from "react-slick";
import "./Slider.css";
import "./Home.css";

class Home extends React.Component {
    render() {
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
                            <a href="/">
                                <img src="img/shortcut1.png" alt="운동"></img>
                                <br/>운 동
                            </a>
                        </li>
                        <li className="music">
                            <a href="/">
                                <img src="img/shortcut2.png" alt="음악"></img>
                                <br/>음 악
                            </a>
                        </li>
                        <li className="game">
                            <a href="/">
                                <img src="img/shortcut3.png" alt="게임"></img>
                                <br/>게 임
                            </a>
                        </li>
                        <li className="diy">
                            <a href="/">
                                <img src="img/shortcut4.png" alt="DIY"></img>
                                <br/>D.I.Y
                            </a>
                        </li>
                        <li className="leet">
                            <a href="/">
                                <img src="img/shortcut5.png" alt="랜선 모임"></img>
                                <br/>랜선 모임
                            </a>
                        </li>
                        <li className="study">
                            <a href="/">
                                <img src="img/shortcut6.png" alt="스터디"></img>
                                <br/>스터디
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="favoritetit">
                    <h2>지금 가장 인기 있는 리팅 🥇</h2>
                    <a className="all" href="/">전체보기</a>
                </div>
                <div className="favoriteleet">
                    
                    {/* <div className="favorite">
                        <div className="favimg">
                            <a href="/"><img src="img/favimg.png" alt="인기있는 리팅 이미지"></img></a>
                        </div>
                        <div className="favtit">
                            <p className="subtit"><a href="/">#카테고리</a></p>
                            <p className="maintit"><a href="/">테스트 제목1</a></p>
                        </div>
                    </div> */}
                    
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