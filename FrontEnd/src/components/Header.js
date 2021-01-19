import React, { Component } from 'react';
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
                            <a href="#">검색</a>
                        </form>
                    </div>
                    <div id="nologin">
                        <ul>
                            <li><a href="/join">회원가입</a></li>
                            <li><a href="/Login">로그인</a></li>
                        </ul>
                    </div>
                    <div id="login">
                        <ul>
                            <li><a href="/">{sessionStorage.getItem("nickname")}님 환영합니다</a></li>
                            <li><a onClick={this.logout}>로그아웃</a></li>
                        </ul>
                    </div>
                </div>
                </div>
                <div className="headerWrap">
                    <div className="gnb cB" id="gnb">
                        <ul className="topmenu" id="head-menu">
                            <li className="lnb1">
                                <a href="/Leeting">Leeting</a>
                            </li>
                            <li className="lnb2">
                                <a href="#" >메뉴2</a>
                            </li>
                            <li className="lnb3">
                                <a href="#" >메뉴3</a>
                            </li>
                            <li className="lnb4">
                                <a href="#" >메뉴4</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
  
}

export default Header;