import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
    
    state = {
        token: ''
    }
    constructor() {
        super();
        
        this.state = {
            selectoption: "1",
            keyWord: "",
            sideKeyWord:"",
        }
    }
    componentDidMount() {
        // nologin = React.createRef();
    if (sessionStorage.getItem("token") != null) {
        console.log("로그인");
        // this.nologin.Attribute('style', 'display:none');
        document.getElementById('nologin').setAttribute('style', 'display:none');
        document.getElementById('login').setAttribute('style', 'display:block');
        document.getElementById('nologinSide').setAttribute('style', 'display:none');
        document.getElementById('loginSide').setAttribute('style', 'display:block'); 
    }
    else {
        console.log("노로그인");
        document.getElementById('login').setAttribute('style', 'display:none');
        document.getElementById('nologin').setAttribute('style', 'display:block');
        document.getElementById('loginSide').setAttribute('style', 'display:none');
        document.getElementById('nologinSide').setAttribute('style', 'display:block');
    }
    }

    selectChange = (event) => {
        this.setState({
            selectoption: event.target.value
        })
        document.getElementById('selectoption').value = event.target.value;
        // console.log(this.state.categoryno);
    }

    keyWordChange = (event) => {
        this.setState({
            keyWord: event.target.value,
        })
    }

    sideSearch = (event) => {
        this.setState({
            sideKeyWord : event.target.value, 
        })
    }

    login = (e) => {
        window.location.replace("/Login");
    }

    logout = (e) => {
        window.sessionStorage.clear();
        window.location.replace("/");
    };

    sidebtn = (e) => {
        e.preventDefault();
        document.getElementById('side_wrap').classList.remove('close');
        document.getElementById('side_wrap').classList.add('open');
        document.getElementById('side_wrap').setAttribute('style', 'right:0px');
        document.getElementById('bg').setAttribute('style', 'display:block');
    }

    sideout = (e) => {
        e.preventDefault();
        document.getElementById('side_wrap').classList.remove('open');
        document.getElementById('side_wrap').classList.add('close');
        document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
        document.getElementById('bg').setAttribute('style', 'display:none');
    }

    searchOpen = (e) => {
        e.preventDefault();
        
        document.getElementById('searchBar').classList.remove('searchClose');
        document.getElementById('searchBar').classList.add('searchOpen');
        document.getElementById('beforeSearchNo').setAttribute('style', 'display:none');
        document.getElementById('afterSearchNo').setAttribute('style', 'display:inline-block');
        document.getElementById('beforeSearch').setAttribute('style', 'display:none');
        document.getElementById('afterSearch').setAttribute('style', 'display:inline-block');
        document.getElementById('searchBar').setAttribute('style', 'top:102px');
        
    }

    searchClose = (e) => {
        e.preventDefault();
        
        document.getElementById('searchBar').classList.remove('searchOpen');
        document.getElementById('searchBar').classList.add('searchClose');
        document.getElementById('afterSearchNo').setAttribute('style', 'display:none');
        document.getElementById('beforeSearchNo').setAttribute('style', 'display:inline-block');
        document.getElementById('afterSearch').setAttribute('style', 'display:none');
        document.getElementById('beforeSearch').setAttribute('style', 'display:inline-block');
        document.getElementById('searchBar').setAttribute('style', 'top:0px');
    }

    render(){
        return (
            <div className="header_wrap">
                <div className="header wide_con cb">
                    <div className="dvwrap">
                    <h1 className="logo_wrap cb ani">
                        <a href="/" className="ani logo">리팅입니다.
                            {/* <img className="ani logo" src="img/pclogo.png" alt="Leeting입니다" title=""/> */}
                        </a>
                    </h1>                        
                        <div className="nav_wrap cb">
                            {/* <div className="gnb cB" id="gnb"> */}
                                <ul className="topmenu nav cb" id="head-menu">
                                    <li className="lnb1">
                                        <Link
                                            to={{
                                                pathname: `/Leeting`
                                            }}
                                        >
                                            LEETING
                                        </Link>
                                    </li>
                                    <li className="lnb2">
                                        <Link
                                            to={{
                                                pathname: `/meeting/exercise`
                                            }}
                                        >
                                            SHOW LEETINGS
                                        </Link>
                                    </li>
                                    <li className="lnb3">
                                        <Link
                                            to={{
                                                pathname: `/timeline`
                                            }}
                                        >
                                            TIMELINES
                                        </Link>
                                    </li>
                                    <li className="lnb4">
                                        <Link
                                            to={{
                                                pathname: `/notice`
                                            }}
                                        >
                                            NOTICE
                                        </Link>
                                </li>
                                <li className="lnb4">
                                        <Link
                                            to={{
                                                pathname: `/sc/faq`
                                            }}
                                        >
                                            SERVICE CENTER
                                        </Link>
                                </li>
                                <li className="report">
                                        <Link
                                            to={{
                                                pathname: `/report`
                                            }}
                                        >
                                            REPORT 119
                                        </Link>
                                    </li>
                                </ul>
                            {/* </div> */}
                        </div>


                        <div id="nologin" className="login_nav">
                            <ul>
                                <li id="beforeSearchNo" onClick={this.searchOpen}>
                                    <div className="searchico">검색열기</div>
                                    {/* <img className="searchico" src="./img/ico-search.png" alt="검색"></img> */}
                                </li>
                                <li id="afterSearchNo" onClick={this.searchClose}>
                                    <div className="searchico">검색닫기</div>
                                    {/* <img className="searchico"src="./img/ico-search-active.png" alt="검색"></img> */}
                                </li>
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
                        <div id="login" className="login_nav">
                            <ul>
                                <li id="beforeSearch" onClick={this.searchOpen}>
                                    {/* eslint-disable-next-line*/}
                                    <a className="searchico">검색열기</a>
                                    {/* <img className="searchico" src="./img/ico-search.png" alt="검색"></img> */}
                                </li>
                                <li id="afterSearch" onClick={this.searchClose}>
                                    {/* eslint-disable-next-line*/}
                                    <a className="searchico">검색닫기</a>
                                    {/* <img className="searchico"src="./img/ico-search-active.png" alt="검색"></img> */}
                                </li>
                                <li>
                                    <Link
                                        to={{
                                            pathname: `/mypage`
                                        }}
                                        >
                                            {sessionStorage.getItem("nickname")}님 환영합니다
                                    </Link>
                                </li>
                                <li><button className="logoutBtn" onClick={this.logout}>로그아웃</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <hr className="hr"/> */}
                <div id="searchBar">
                    <div className="searchWrap wide_con">
                        <select id="selectoption" onChange={this.selectChange}>
                            <option value="1">제목</option>
                            <option value="2">작성자</option>
                        </select>
                        <input type="text" onChange={this.keyWordChange} id="keyWord" placeholder="검색어를 입력해주세요" className="searchTxt"></input>
                        <Link
                            to={{
                                pathname: `/result/${this.state.keyWord}`,
                                state: {
                                    selectoption: this.state.selectoption,
                                    keyWord: this.state.keyWord
                                }
                            }}
                        >
                            <button>검색</button>
                        </Link>
                        <div className="searchCloseBtn" onClick={this.searchClose}>검색창 닫기</div>
                        {/* <img onClick={this.searchClose} src="./img/btn-close-black.png" alt="검색창 닫기"></img> */}
                    </div>
                </div>
                {/* side menu */}
                <div className="btn_side" onClick={this.sidebtn}>
                    {/* eslint-disable-next-line*/}
                    <a href="#" >
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
                <div id="side_wrap" className="">
                    <ul className="side_menu cb">
                        <li>
                            <Link
                                to={{
                                    pathname: `/leeting`
                                }}
                            >
                                LEETING
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: `/meeting/exercise`
                                }}
                            >
                                SHOW LEETINGS</Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: `/timeline`
                                }}
                            >
                                TIMELINES
                                </Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: `/notice`
                                }}
                            >
                                NOTICE
                                </Link>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: `/sc/faq`
                                }}
                            >
                                SERVICE CENTER
                                </Link>
                        </li>
                        <li className="report">
                            <Link
                                to={{
                                    pathname: `/report`
                                }}
                            >
                                REPORT 119
                            </Link>
                        </li>
                    </ul>
                    <div id="searchBox">
                        <input type="text" onChange={this.sideSearch} className="sideSearch"></input>
                        
                        <Link
                            to={{
                                pathname: `/result/${this.state.sideKeyWord}`,
                                state: {
                                    keyWord: this.state.sideKeyWord,
                                    selectoption: 0
                                }
                            }}
                        >
                            <button className="sideSearchBtn" ></button>
                        </Link>
                    </div>
                    <div id="nologinSide" className="login_nav">
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
                                <button className="loginBtn" onClick={this.login}>로그인</button>
                            </li>
                        </ul>
                    </div>
                    <div id="loginSide" className="login_nav">
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
                            <li><button className="logoutBtn" onClick={this.logout}>로그아웃</button></li>
                        </ul>
                    </div>
                </div>
                <div id="bg" onClick={this.sideout}></div>
            </div>
        );
    }
  
}

export default Header;