import React from "react";
import axios from 'axios';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLogin } from 'react-google-login';
import  KaKaoLogin  from 'react-kakao-login';

const responseGoogle = (response) => {
  console.log(response);
}


class Login extends React.Component {
    state ={
        id: "",
        pw: "",
    }
    google(result) {
        axios.post('http://127.0.0.1:8080/myapp/member/google', {
            result
        }).then(res => {
            // console.log(res);
            console.log(this.state.id);
            console.log(this.state.pw);
            console.log(res.data.message);
            if (res.data.message === "SUCCESS") {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("nickname", res.data.nickname);
                sessionStorage.setItem("id", res.data.id);
                window.location.replace("/");
            } else {
                alert("아이디와 비밀번호를 확인해주세요.");
            }
        })
    }
    kakao(result) {
        console.log(result);
        axios.post('http://127.0.0.1:8080/myapp/member/kakao', {
            result
        }).then(res => {
            // console.log(res);
            console.log(this.state.id);
            console.log(this.state.pw);
            console.log(res.data.message);
            if (res.data.message === "SUCCESS") {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("nickname", res.data.nickname);
                sessionStorage.setItem("id", res.data.id);
                window.location.replace("/");
            } else {
                alert("아이디와 비밀번호를 확인해주세요.");
            }
        })
    }
    Naver = () => {
        var location = this.state.currentLocation;
            var link = 'http://127.0.0.1:8080/myapp/member/naver'
            window.location.assign(link);
        };
    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const code = params.get('code');
        const state = params.get('state');
        console.log(code);
        console.log(state);
        if (code != null && state != null) {
            axios.get('http://127.0.0.1:8080/myapp/member/naver/callback1', {
                params: {
                    code: code,
                    state : state
                }
            }).then(res => {
                console.log(res.data);
                if (res.data.message === "SUCCESS") {
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("nickname", res.data.nickname);
                    sessionStorage.setItem("id", res.data.id);
                    window.location.replace("/");
                } else {
                    alert("아이디와 비밀번호를 확인해주세요.");
                }
            })
        }
    };
    handleClick = (e) => {
        // e.preventDefault();
        axios.post('http://127.0.0.1:8080/myapp/member/login', {
            id: this.state.id,
            pw: this.state.pw
        }).then(res => {
            // console.log(res);
            console.log(this.state.id);
            console.log(this.state.pw);
            console.log(res.data.message);
            if (res.data.message === "SUCCESS") {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("nickname", res.data.nickname);
                sessionStorage.setItem("id", res.data.id);
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

    handleKeyPress = (e) => {
        // if(e.charCode === 13) { //  deprecated
        //   this.handleClick();
        // }
    
        if (e.key === "Enter") {
          this.handleClick();
        }
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
                            <input type="password" className="form-control col-9 margin-bottom-20 passinput" placeholder="비밀번호를 입력해주세요" onChange={this.pwChange} onKeyPress={this.handleKeyPress}></input>
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
                            <div className="col-9 naverlogin" onClick={this.Naver}>네이버 로그인</div>
                            <GoogleLogin
                                clientId="214779194973-13gfcp2vgimelc91u2dpop5j3oo788qb.apps.googleusercontent.com"
                                render={renderProps => (
                                    <div className="col-9 googlelogin" onClick={renderProps.onClick}> 구글 로그인</div>
                                  )}
                            buttonText="Login"
                            onSuccess={result => this.google(result)}
                            onFailure={result => console.log(result)}
                            cookiePolicy={'single_host_origin'}
                            />
                                <KaKaoLogin
                                    token={'e3cd9e3a0f32bc890bacfd0ca81c18e7'}
                                    onSuccess={result =>this.kakao(result)}
                                getProfile={true}
                                render={({ onClick }) => {
                                    return (
                                        <div className="col-9 kakaologin" onClick={(e) => {
                                            e.preventDefault();
                                            onClick();
                                          }}>카카오 계정 로그인</div>
                                        
                                    )
                                }}
                                    >
                                    
                                </KaKaoLogin>
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