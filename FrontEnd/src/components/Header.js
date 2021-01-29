import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
    
    state = {
        token: ''
    }
    componentDidMount() {
        // nologin = React.createRef();
    if (sessionStorage.getItem("token") != null) {
        console.log("로그인");
        // this.nologin.Attribute('style', 'display:none');
        document.getElementById('nologin').setAttribute('style', 'display:none');
        document.getElementById('login').setAttribute('style', 'display:block');
        // document.getElementsByClassName("nologin").setAttribute('style', 'display:none');
        // document.getElementsByClassName("login").setAttribute('style', 'display:block');
    }
    else {
        console.log("노로그인");
        document.getElementById('login').setAttribute('style', 'display:none');
        document.getElementById('nologin').setAttribute('style', 'display:block');
    }
    }
    logout = (e) => {
        window.sessionStorage.clear();
        window.location.replace("/");
    };
    render(){
        return (
            <div id="header">
                <div className="gtop">
                    <div className="dvwrap">
                    <a className="logo" href="/">
                        Leeting입니다
                    </a>
                    <div className="topsearch">
                            <form name="searchForm">
                            <input type="text" name="searchVal" placeholder="검색어를 입력하세요">
                                </input>
                                <Link
                                    to={{
                                        pathname: ``
                                    }}
                                >
                                    검색
                                </Link>
                        </form>
                    </div>
                    <div id="nologin">
                        <ul>
                            <li>
                                <Link
                                    to={{
                                        pathname: `/join`
                                    }}
                                    >
                                        회원가입
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={{
                                        pathname: `/Login`
                                    }}
                                    >
                                        로그인
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div id="login">
                        <ul>
                            <li>
                                <Link
                                    to={{
                                        pathname: `/mypage`
                                    }}
                                    >
                                        {sessionStorage.getItem("nickname")}님 환영합니다
                                </Link>
                            </li>
                            <li><button onClick={this.logout}>로그아웃</button></li>
                        </ul>
                    </div>
                </div>
                </div>
                <div className="headerWrap">
                    <div className="gnb cB" id="gnb">
                        <ul className="topmenu" id="head-menu">
                            <li className="lnb1">
                                <Link
                                    to={{
                                        pathname: `/Leeting`
                                    }}
                                >
                                    Leeting 소개
                                </Link>
                            </li>
                            <li className="lnb2">
                                <Link
                                    to={{
                                        pathname: `/meeting/exercise`
                                    }}
                                >
                                    Leeting's
                                </Link>
                            </li>
                            <li className="lnb3">
                                <Link
                                    to={{
                                        pathname: `/`
                                    }}
                                >
                                    메뉴3
                                </Link>
                            </li>
                            <li className="lnb4">
                                <Link
                                    to={{
                                        pathname: `/notice`
                                    }}
                                >
                                    공지사항
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
  
}

export default Header;