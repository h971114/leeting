import React from "react";
import "./Find.css";
import axios from "axios";

class Find extends React.Component {
    constructor(props) {
        super(props);
      this.state = {
        value: '선택하세요',
        checkIdEmail: false,
      };
    }
    state ={
        id: "",
        idname: "",
        idemail: "",
        iddomain: "",
        idtoken:"",
        idauth: "",
        pwid: "",
        pwname: "",
        pwemail: "",
        pwdomain: "",
        pwtoken: "",
        pwauth:""
    }
    componentDidMount() {
        if (document.getElementById('side_wrap').classList.contains('open')) {
            document.getElementById('side_wrap').classList.remove('open');
            document.getElementById('side_wrap').classList.add('close');
            document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
            document.getElementById('bg').setAttribute('style', 'display:none');
        }
    }

    idemailChange = (e) => {
        this.setState({
            idemail:e.target.value
        })
    }
    iddomainChange = (e) => {
        this.setState({
            iddomain:e.target.value
        })
    }

    pwemailChange = (e) => {
        this.setState({
            pwemail:e.target.value
        })
    }
    pwdomainChange = (e) => {
        this.setState({
            pwdomain:e.target.value
        })
    }

    idnamechange = (e) => {
        this.setState({
            idname: e.target.value
        });
    }
    pwnamechange = (e) => {
        this.setState({
            pwname: e.target.value
        });
    }

    pwidChange = (e) => {
        this.setState({
            pwid : e.target.value
        })
    }

    /*인증번호 전송*/
    idauthCheck = (e) => {
        e.preventDefault();
        console.log(this.state.idemail + "@" + this.state.iddomain);
        axios.post('http://127.0.0.1:8080/myapp/member/email', {
            email: this.state.idemail + "@" + this.state.iddomain,
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                idtoken: res.data
            })
            document.getElementById('idauth').disabled = false;
            // document.getElementById('idsendtoken').setAttribute('style', 'display:none');
            document.getElementById('idchecktoken').setAttribute('style', 'display:inline-block');
        })
    };
    /*인증번호 전송*/
    pwauthCheck = (e) => {
        e.preventDefault();
        console.log(this.state.pwemail + "@" + this.state.pwdomain);
        axios.post('http://127.0.0.1:8080/myapp/member/email', {
            email: this.state.pwemail + "@" + this.state.pwdomain,
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({
                pwtoken: res.data
            })
            document.getElementById('pwauth').disabled = false;
            // document.getElementById('idsendtoken').setAttribute('style', 'display:none');
            document.getElementById('pwchecktoken').setAttribute('style', 'display:inline-block');
        })
    };

    idauthChange = (e) => {
        this.setState({
            idauth: e.target.value
        });
    }
    pwauthChange = (e) => {
        this.setState({
            pwauth: e.target.value
        });
    }
    idemailtokenCheck = (e) => {
        e.preventDefault();

        console.log(this.state.idauth);
        console.log(this.state.idtoken);

        axios.post('http://127.0.0.1:8080/myapp/member/auth', {
        token: this.state.idtoken,
        auth: this.state.idauth,      
        }).then(res => {
            console.log(res);
            console.log(res.data);
            if (res.data === "SUCCESS") {
            this.setState({
                checkIdEmail: true
            });
            document.getElementById('idauth').disabled = true;
            document.getElementById('idsendtoken').setAttribute('style', 'display:none');
            document.getElementById('idchecktoken').setAttribute('style', 'display:none');
            
            document.getElementById('idvalidateDomain').textContent = "인증번호가 확인되었습니다.";
            document.getElementById('idvalidateDomain').setAttribute('style', 'color: blue');
            } else {
            document.getElementById('idsendtoken').setAttribute('style', 'display:inline-block');
            document.getElementById('idvalidateDomain').textContent = "인증번호를 재확인해주세요";
            document.getElementById('idvalidateDomain').setAttribute('style', 'color: #ff3535');
            }
        })
    };
    pwemailtokenCheck = (e) => {
        e.preventDefault();

        console.log(this.state.pwauth);
        console.log(this.state.pwtoken);

        axios.post('http://127.0.0.1:8080/myapp/member/auth', {
        token: this.state.pwtoken,
        auth: this.state.pwauth,      
        }).then(res => {
            console.log(res);
            console.log(res.data);
            if (res.data === "SUCCESS") {
            this.setState({
                checkPwEmail: true
            });
            document.getElementById('pwauth').disabled = true;
            document.getElementById('pwsendtoken').setAttribute('style', 'display:none');
            document.getElementById('pwchecktoken').setAttribute('style', 'display:none');
            
            document.getElementById('pwvalidateDomain').textContent = "인증번호가 확인되었습니다.";
            document.getElementById('pwvalidateDomain').setAttribute('style', 'color: blue');
            } else {
            document.getElementById('pwsendtoken').setAttribute('style', 'display:inline-block');
            document.getElementById('pwvalidateDomain').textContent = "인증번호를 재확인해주세요";
            document.getElementById('pwvalidateDomain').setAttribute('style', 'color: #ff3535');
            }
        })
    };


    handleChange = (event) => {
        if (event.target.value !== '직접입력') {
          this.setState({
            value: event.target.value,
            iddomain: event.target.value
          });
          // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
          //   document.getElementById('joinbtn').disabled = false;
          // }
          // console.log(event.target.value);
          document.getElementById('idvalidateDomain').textContent = "";
              document.getElementById('idwritedomain').value = event.target.value;
              document.getElementById('idwritedomain').readOnly=true;
          }
        else {
          this.setState({
            value: event.target.value,
          });
          // document.getElementById('joinbtn').disabled = true;
              document.getElementById('idwritedomain').readOnly = false;
              document.getElementById('idwritedomain').value = "";
              document.getElementById('idwritedomain').placeholder = "입력하세요";
          }
    }

    pwhandleChange = (event) => {
        if (event.target.value !== '직접입력') {
          this.setState({
            value: event.target.value,
            pwdomain: event.target.value
          });
          // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
          //   document.getElementById('joinbtn').disabled = false;
          // }
          // console.log(event.target.value);
          document.getElementById('pwvalidateDomain').textContent = "";
              document.getElementById('pwwritedomain').value = event.target.value;
              document.getElementById('pwwritedomain').readOnly=true;
          }
        else {
          this.setState({
            value: event.target.value,
          });
          // document.getElementById('joinbtn').disabled = true;
              document.getElementById('pwwritedomain').readOnly = false;
              document.getElementById('pwwritedomain').value = "";
              document.getElementById('pwwritedomain').placeholder = "입력하세요";
          }
    }

    findid = (e) => {
        e.preventDefault();

        if (this.state.checkIdEmail === true) {
            axios.get('http://127.0.0.1:8080/myapp/member/findid', {
                params: {
                    name: this.state.idname,
                    email: this.state.idemail + "@" + this.state.iddomain,
                }
            }).then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data === "FAIL") {
                    alert("찾으시는 정보가 없습니다.");
                    window.location.replace("/find");
                }
                else {
                    alert("찾으시는 아이디는 : "+ res.data+" 입니다.");
                }
            })
        }
        else {
            alert("이메일 인증을 완료해주세요!");
        }
    }

    findPw = (e) => {
        e.preventDefault();

        if (this.state.checkPwEmail === true) {
            axios.get('http://127.0.0.1:8080/myapp/member/findpw', {
                params: {
                    name: this.state.pwname,
                    id: this.state.pwid,
                    email: this.state.pwemail + "@" + this.state.pwdomain,
                }
            }).then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data === "FAIL") {
                    alert("찾으시는 정보가 없습니다.");
                    window.location.replace("/find");
                }
                else {
                    alert("찾으시는 비밀번호는 : "+ res.data+" 입니다.");
                }
            })
        }
        else {
            alert("이메일 인증을 완료해주세요!");
        }
    }
    
    render() {
        return (
            
        <div id="main_content">   
            <div className="findcontainer">
                <div className="titles">
                    <h1 className="tit">아이디 / 비밀번호 찾기</h1>
                    <p className="subtit">아이디와 비밀번호는 가입시 입력하신 이메일을 통해 찾을 수 있습니다.</p>
                </div>
                <hr />
                <div className="formcenter">
                    <input id="tab1" type="radio" name="tabs" defaultChecked></input>
                    <label className="forradio" htmlFor="tab1">아이디 찾기</label>
                    <input id="tab2" type="radio" name="tabs"></input>
                    <label className="forradio" htmlFor="tab2">비밀번호 찾기</label>

                    <form id="findids">
                        <div className="col-12">
                            <label className="font-weight-bold forname" htmlFor="idname">이름</label>
                            <input type="text" id="idname" name="inputname" className="form-control col-9 margin-bottom-20" placeholder="이름을 입력해주세요" onChange={this.idnamechange}></input>
                        </div>
                        <div className="col-12">
                            <label id="labelEmail" className="font-weight-bold foremail" htmlFor="idemail">이메일</label>
                            <input type="text" id="idemail" name="inputEmail" className="form-control col-4 margin-bottom-20" placeholder="이메일을 입력해주세요" onChange={this.idemailChange}></input>
                            &nbsp;<label id="at">@</label>&nbsp;
                            <input id="idwritedomain" name="inputdomain" className="form-control col-4 margin-bottom-20 inputdomain" onChange={this.iddomainChange} placeholder="선택하세요" readOnly></input>&nbsp;
                            <select id="iddomain" name="selectdomain" className="form-control col-3 margin-bottom-20" value={this.state.value} onChange={this.handleChange}>
                                    <option value="선택하세요" defaultValue>선택하세요</option>
                                    <option value="kakao.com" >kakao.com</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="직접입력">직접입력</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <input type="text" id="idauth" className="form-control col-4 margin-bottom-20" onChange={this.idauthChange} disabled></input>
                            <button id="idsendtoken" className="btn" onClick={this.idauthCheck}>인증번호 전송</button>
                            <button id="idchecktoken" className="btn" onClick={this.idemailtokenCheck}>인증번호 확인</button>
                        </div>
                        <div className="col-12">
                            <label id="idvalidateDomain"></label>
                        </div>

                    
                        <div className="btndiv">
                            <button className="btn goback">돌아가기</button>
                            <button className="btn find" onClick={this.findid}>아이디 찾기</button>
                        </div>
                    </form>


                    <form id="findpws">
                        <div className="col-12">
                            <label className="font-weight-bold forname" htmlFor="pwname">이름</label>
                            <input type="text" id="pwname" name="inputname" className="form-control col-9 margin-bottom-20" placeholder="이름을 입력해주세요" onChange={this.pwnamechange}></input>
                        </div>
                        
                        <div className="col-12">
                            <label className="font-weight-bold forid" htmlFor="pwid">아이디</label>
                            <input type="text" id="pwid" name="inputid" className="form-control col-9 margin-bottom-20" placeholder="아이디를 입력해주세요" onChange={this.pwidChange}></input>
                        </div>

                        <div className="col-12">
                            <label id="labelEmail" className="font-weight-bold foremail" htmlFor="pwemail">이메일</label>
                            <input type="text" id="pwemail" name="inputEmail" className="form-control col-4 margin-bottom-20" placeholder="이메일을 입력해주세요" onChange={this.pwemailChange}></input>
                            &nbsp;<label id="at">@</label>&nbsp;
                            <input id="pwwritedomain" name="inputdomain" className="form-control col-4 margin-bottom-20 inputdomain" placeholder="선택하세요" readOnly onChange={this.pwdomainChange}></input>&nbsp;
                            <select id="pwdomain" name="selectdomain" className="form-control col-3 margin-bottom-20" value={this.state.value} onChange={this.pwhandleChange}>
                                    <option value="선택하세요" defaultValue>선택하세요</option>
                                    <option value="kakao.com" >kakao.com</option>
                                    <option value="naver.com">naver.com</option>
                                    <option value="daum.net">daum.net</option>
                                    <option value="직접입력">직접입력</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <input type="text" id="pwauth" className="form-control col-4 margin-bottom-20" onChange={this.pwauthChange} disabled></input>
                            <button id="pwsendtoken" className="btn" onClick={this.pwauthCheck}>인증번호 전송</button>
                            <button id="pwchecktoken" className="btn" onClick={this.pwemailtokenCheck}>인증번호 확인</button>
                        </div>
                        <div className="col-12">
                        <label id="pwvalidateDomain"></label>
                        </div>
                    
                        <div className="btndiv">
                            <button className="btn goback">돌아가기</button>
                            <button  className="btn find" onClick={this.findPw}>비밀번호 찾기</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>
        );
    }
}

export default Find;