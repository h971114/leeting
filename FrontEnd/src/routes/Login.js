import React from "react";
import axios from 'axios';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
    state ={
        id: "",
        pw: "",
    }
    handleClick = (e) => {
        e.preventDefault();
        
        console.log(this.state);
        axios.post('http://127.0.0.1:8080/myapp/member/login', {
            id: this.state.id,
            pw: this.state.pw
        }).then(res => {
            // console.log(res);
            console.log(res.data.message);
            if (res.data.message == "SUCCESS") {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("nickname", res.data.nickname);
                window.location.replace("/");
            } else {
                alert("아이디와 비밀번호를 확인해주세요.");
            }
        })
    };
    idChange = (e) => {
        this.setState({
            id: e.target.value,
        });
    };
    pwChange = (e) => {
        this.setState({
            pw: e.target.value,
        });
    };
    render() {

        return (
            <div className="logincontainer">
                <h1 className="tit">로 그 인</h1>
                <hr />
                <div className="formcenter">
                    <form action="get" className="loginform">
                        <div className="id">
                            <p>아이디 </p>
                            <input type="text" className="form-control col-9 margin-bottom-20 logininput" placeholder="아이디를 입력해주세요" onChange={this.idChange}></input>
                        </div>
                        <div className="password">
                            <p>비밀번호 </p>
                            <input type="password" className="form-control col-9 margin-bottom-20 passinput" placeholder="비밀번호를 입력해주세요" onChange={this.pwChange}></input>
                        </div>
                        <div className="col-9 chkbox">
                            <div className="idstore">
                                <input type="checkbox" id="idcheck"></input>&nbsp;
                            <label htmlFor="idcheck"><span></span>아이디 저장</label>
                            </div>
                            <div className="autologin">
                                <input type="checkbox" id="autocheck"></input>&nbsp;
                            <label htmlFor="autocheck"><span></span>자동 로그인</label>
                            </div>
                        </div>
                        <div className="loginset">
                            <div className="col-9 defaultlogin" onClick ={this.handleClick}>로 그 인</div>
                            <div className="col-9 naverlogin">네이버 로그인</div>
                            <div className="col-9 googlelogin" >구글 로그인</div>
                            <div className="col-9 kakaologin" >카카오 계정 로그인</div>
                        </div>
                        <div className="col-9 usermenu">
                            <ul>
                                <li>
                                    <a href="/find">
                                        <img src="img/find.png" alt="아이디 찾기"></img><br />
                                    아이디 / 비밀번호 찾기
                                </a>
                                </li>
                                <li>
                                    <a href="/join">
                                        <img src="img/join.png" alt="회원 가입"></img><br />
                                    회원 가입
                                </a>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;