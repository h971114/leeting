import React, { Fragment } from "react";
import "./Mypage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import My from "../components/common/myleetinglist"

class Mypage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '선택하세요',
        checkPw: false,
        checkName: true,
        checkNickname: true,
        checkEmail: true,
        checkMobile: true,
        data: [],
      };
    }
    state ={
      id: "",
      pw: "",
      name: "",
      nickname: "",
      email: "",
      domain: "",
      mobile: "",
      token:"",
      auth:"",
      isLoading: true,
      data:[],
      tab: 0,
      reconfirm: false,
      backupname: "",
      backupnickname: "",
      backuppw: "",
      backupmobile: "",
    }

    getUserInfo = (e) => {
      // e.preventDefault();
      axios.get(`http://127.0.0.1:8080/myapp/member/${sessionStorage.getItem("id")}`, {
        id: sessionStorage.getItem("id")
      }).then(res => {
        console.log(res);
        this.setState({
          id: res.data.id,
          pw: res.data.pw,
          name: res.data.name,
          nickname: res.data.nickname,
          email: res.data.email,
          mobile: res.data.mobile,
        })
      });
    };
    
    getLeeting = async () => {
      
      let sId = sessionStorage.getItem('id');
      let data = await axios.get('http://127.0.0.1:8080/myapp/member/usermeet', {
        params: {
          id : sId
        }
      });
      data = data.data;
      this.setState({ data, isLoading: false });
    }
    
    componentDidMount() {
      let sId = sessionStorage.getItem('id');

      if (sId !== null) {
          
        this.getLeeting();
        this.getUserInfo();

      } else {
          document.getElementById('myleetingTit').setAttribute('style', 'display:none');
          document.getElementById('myleetingList').setAttribute('style', 'display:none');
      }
    }

    tabZero = (e) => {
      this.getLeeting();
      this.setState({
        tab: 0,
      })
    }
    tabOne = (e) => { this.setState({tab: 1,}) }
    tabTwo = (e) => { 
      this.backupUserInfo();
      this.setState({tab: 2,}) 
    }

    pwReconfirm = (e) => {
      if (document.getElementById('reconfirmPw').value === this.state.pw) {
        this.setState({
          reconfirm: true,
          checkPw: true,
        })
      }
      else {
        document.getElementById('checkPwBeforeEditProfile').textContent = "비밀번호를 잘못 입력하셨습니다.";
        document.getElementById('checkPwBeforeEditProfile').setAttribute('style', 'color: #ff3535');
      };
    }

    backupUserInfo = (e) => {
      this.setState({
        backuppw: this.state.pw,
        backupname: this.state.name,
        backupnickname: this.state.nickname,
        backupmobile: this.state.mobile,
      })
    }

    // Join.js
    pwChange = (e) => {
      var pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;
      
      if (!pwReg.test(e.target.value)) {
        this.setState({
          checkPw:false
      }); 
        document.getElementById('validatePw').textContent = "비밀번호는 8자 이상의 문자, 숫자, 특수 문자 조합이어야 합니다.";
        document.getElementById('validatePw').setAttribute('style', 'color: #ff3535');
      }
      else {
        document.getElementById('validatePw').textContent = "사용가능한 비밀번호 입니다.";
        document.getElementById('validatePw').setAttribute('style', 'color:blue');
        this.setState({
            pw: e.target.value,
            checkPw:true
        }); 
      }
      
      if (document.getElementById('inputCPw').value !== e.target.value) {
        this.setState({
          checkPw:false
      }); 
        document.getElementById('validateCPw').textContent = "비밀번호가 다릅니다.";
        document.getElementById('validateCPw').setAttribute('style', 'color: #ff3535');
      }
      else{
        this.setState({
          checkPw:true
        })
        document.getElementById('validateCPw').textContent = "확인되었습니다.";
        document.getElementById('validateCPw').setAttribute('style', 'color:blue');
      }
    };

    cpwChange = (e) => {
      if (e.target.value === '') {
        this.setState({
          checkPw: false
        });
        document.getElementById('validateCPw').textContent = "";
      }
      else if (document.getElementById('inputPw').value === e.target.value) {
        this.setState({
          checkPw:true
        })
        document.getElementById('validateCPw').textContent = "확인되었습니다.";
        document.getElementById('validateCPw').setAttribute('style', 'color:blue');
      }
      else {
        this.setState({
          checkPw: false
        });
        
        document.getElementById('validateCPw').textContent = "비밀번호가 다릅니다.";
        document.getElementById('validateCPw').setAttribute('style', 'color: #ff3535');
      }
    };
 
    nameChange = (e) => {
      var nameReg = /^[가-힣]{2,4}$/g;
      if (!nameReg.test(e.target.value)) {
        this.setState({
          checkName: false
        });
        document.getElementById('validateName').textContent = "이름은 2~4자 사이의 한국어 입니다.";
        document.getElementById('validateName').setAttribute('style', 'color: #ff3535');
      }
      else {
        document.getElementById('validateName').textContent = "";
        this.setState({
          name: e.target.value,
          checkName:true
        });
      }
    };

    nicknameChange = (e) => {
      var nickNameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,10}$/g;
      if (!nickNameReg.test(e.target.value)) {
        
        this.setState({
          checkNickname: false
        });
        document.getElementById('validateNickName').textContent = "닉네임은 2~10자 사이의 한국어, 영어, 숫자로 이루어져 있습니다.";
      }
      else {
        document.getElementById('validateNickName').textContent = "";
        this.setState({
          nickname: e.target.value,
        });
      }
    };
  
    emailChange = (e) => {
      this.setState({
          email: e.target.value,
      });
    };
    domainChange = (e) => {
      var domainReg = /^([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){2,3}$/g;
      if (!domainReg.test(e.target.value)) {
        this.setState({
          checkEmail: false
        });
      }
      else {
        document.getElementById('validateDomain').textContent = "";
      }
    };

    mobileChange = (e) => {
      var phoneReg = /^\d{3}-\d{3,4}-\d{4}$/;
      if (!phoneReg.test(e.target.value)) {
        this.setState({
          checkMobile: false
        });
        document.getElementById('validatePhone').textContent = "휴대폰 번호는 010-1234-5678 형식으로 입력해주세요.";
        document.getElementById('validatePhone').setAttribute('style', 'color: #ff3535');
      }
      else {
        this.setState({
          mobile: e.target.value,
          checkMobile:true
        });
        document.getElementById('validatePhone').textContent = "";
      };
    };

    sameNickClick = (e) => {
      e.preventDefault();
      
      var nickNameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{2,10}$/g;
      console.log(e.target.value)
      if (e.target.value !== this.backupnickname) {
        document.getElementById('validateNickName').textContent = "사용가능한 닉네임입니다.";
        document.getElementById('validateNickName').setAttribute('style', 'color:blue');
      }
      else if (!nickNameReg.test(e.target.value)) {
        axios.post('http://127.0.0.1:8080/myapp/member/samenick', {
          nickname: this.state.nickname
        }).then(res => {
          if (res.data === "SUCESS") {
            this.setState({
              checkNickname: true
            });
            document.getElementById('validateNickName').textContent = "사용가능한 닉네임입니다.";
            document.getElementById('validateNickName').setAttribute('style', 'color:blue');
          }
          else {
            this.setState({
              checkNickname: false
            });
            document.getElementById('validateNickName').textContent = "이미 존재하는 닉네임입니다.";
            document.getElementById('validateNickName').setAttribute('style', 'color: #ff3535');
          }
        });
      }
    };

    authCheck = (e) => {
      e.preventDefault();
      console.log(this.state.email + "@" + this.state.domain);
      axios.post('http://127.0.0.1:8080/myapp/member/email', {
        samecheck:"",
          email: this.state.email + "@" + this.state.domain,
        }).then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            token: res.data
          })
          if (res.data === "FAIL") {
            document.getElementById('validateDomain').textContent = "이미 가입된 이메일입니다.";
            document.getElementById('validateDomain').setAttribute('style', 'color: #ff3535');
          } else {
            document.getElementById('auth').disabled = false;
            // document.getElementById('sendtoken').setAttribute('style', 'display:none');
            document.getElementById('checktoken').setAttribute('style', 'display:inline-block'); 
          }
        })
    };
  
    authChange = (e) => {
      this.setState({
        auth: e.target.value
      });
    }
  
  
    logout = (e) => {
      window.sessionStorage.clear();
      window.location.replace("/Login");
    };

    handleClick = (e) => {
      e.preventDefault();
      console.log(this.state);
      if (this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
        axios.put('http://127.0.0.1:8080/myapp/member', {
          id: this.state.id,
          pw: this.state.pw,
          nickname: this.state.nickname,
          name: this.state.name,
          email: this.state.email,
          mobile : this.state.mobile
        }).then(res => {
          if (res.data === "SUCCESS") {
            alert("회원정보 수정이 완료되었습니다.");
            console.log("회원정보수정 완료<br/>재 로그인 해주세요!");
            this.logout();
          }
          else {
            console.log(res.data)
            alert("회원정보 수정에 실패하였습니다.");
            console.log("회원가입 실패");
          }
        })
      }
      else {
        alert("입력 정보를 확인해주세요!");
        console.log("미입력여부");
      }
    };

    // Join End

    returnUserInfo = (e) => {
      this.setState({
        pw: this.state.backuppw,
        name: this.state.backupname,
        nickname: this.state.backupnickname,
        mobile: this.state.backupmobile,
      })
      this.tabZero();
    };

  render() {
    const { isLoading, data, reconfirm } = this.state
    // let emailDomain = this.state.email ? this.state.email.split('@') : null 

    return (
      <div className="joinContainer">
        <h1 className="tit">마이페이지</h1>
        <hr />
        <div className="d-flex">
            <div className="tabcenter col-4">
                <div className="list-group">
                    <p className="list-group-item list-group-item-action" onClick={this.tabZero}>프로필</p> {/*aria-current="true"*/}
                    <p className="list-group-item list-group-item-action" onClick={this.tabOne}>일정</p>
                    <p className="list-group-item list-group-item-action" onClick={this.tabTwo}>계정 설정</p>
                </div>
            </div>
            <div className="formcenter col-8">
                <div>
                  {!this.state.tab && (
                    <Fragment>
                    <div className="user row align-items-end">
                            <img onClick={this.profileClick} src="../img\noProfile.png" alt="프로필사진"></img>
                            <div>
                            <p className="userNickname"> {this.state.nickname} </p>
                            <p>{this.state.id}</p>
                            </div>
                    </div>
                    <hr />
                    <div className="form-group">
                        <div className="col-9">
                        <label className="font-weight-bold" id="labelName" htmlFor="inputName">성명</label>
                        <p>{this.state.name}</p>
                        </div>
                        <label id="validateName"></label>
                    </div>
                    <div className="form-group">
                        <div className="col-12">
                        <label id="labelEmail" className="font-weight-bold foremail" htmlFor="email">이메일</label>
                        <p>{this.state.email}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-9">
                        <label className="font-weight-bold" id="labelPhone" htmlFor="inputPhone">휴대전화 번호</label>
                        <p>{this.state.mobile}</p>
                        <label id="validatePhone"></label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-9">
                          <p className="font-weight-bold">참여 중인 Leeting</p>
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
                                {data.map((leeting, idx) => (
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
                    </div>
                    </Fragment>)}
                  {this.state.tab === 1 && (
                    <Fragment>
                      <p>달력을 넣고 싶다</p>
                    </Fragment>
                  )}
                  {this.state.tab === 2 && (
                    <Fragment>
                      {!reconfirm ? (
                        <Fragment>
                          <div className="col-9">
                            <label id="labelReconfirmPw" className="font-weight-bold" htmlFor="reconfirmPw">비밀번호 확인</label>
                            <input type="password" id="reconfirmPw" className="form-control mb-2" placeholder="비밀번호를 입력해주세요"></input>
                            <button id="checkPw" className="btn btn-primary mt-2 mr-2" onClick={this.pwReconfirm}>확인</button>
                            <label id="checkPwBeforeEditProfile"></label><br/>
                          </div>
                        </Fragment>
                      ) : (
                        <div>
                          <div className="form-group">
                            <div className="form-group">
                              <div className="col-9">
                                <label className="font-weight-bold" id="labelName" htmlFor="inputName">성명</label>
                                <input type="text" id="inputName" className="form-control margin-bottom-20" placeholder="한글 이름을 입력해주세요" onChange ={this.nameChange} defaultValue={this.state.name}></input>
                              </div>
                              <label id="validateName"></label>
                            </div>
                            <div className="form-group">
                              <div className="col-12">
                                <label className="font-weight-bold" id="labelNickName" htmlFor="inputNickName">닉네임</label>
                              <input type="text" id="inputNickName" className="col-9 form-control margin-bottom-20" placeholder="닉네임을 입력해주세요" onChange={this.nicknameChange} defaultValue={this.state.nickname}></input>
                              <button id="checkNickName" className="btn" onClick={this.sameNickClick}>중복 확인</button>
                              </div>
                              <label id="validateNickName"></label>
                            </div>
                              <div className="col-9">
                                <label id="labelPw" className="font-weight-bold" htmlFor="inputPw">비밀번호</label>
                                <input type="password" id="inputPw" className="form-control margin-bottom-20" placeholder="비밀번호를 입력해주세요" onChange={this.pwChange} defaultValue={this.state.pw}></input>
                              </div>
                              <label id="validatePw"></label>
                            </div>
                            <div className="form-group">
                              <div className="col-9">
                                <label className="font-weight-bold" id="labelCPw" htmlFor="inputCPw">비밀번호 확인</label>
                                <input type="password" id="inputCPw" className="form-control margin-bottom-20" placeholder="확인용 비밀번호를 입력해주세요" onChange={this.cpwChange} defaultValue={this.state.pw}></input>
                              </div>
                              <label id="validateCPw"></label>
                            </div>
                            <div className="form-group">
                              <div className="col-12">
                                <label id="labelEmail" className="font-weight-bold foremail" htmlFor="email">이메일</label>
                                <p>{this.state.email}</p>
                            </div>
                            </div>
                            <div className="form-group">
                              <div className="col-9">
                                <label className="font-weight-bold" id="labelPhone" htmlFor="inputPhone">휴대전화 번호</label>
                                <input type="tel" id="inputPhone" className="form-control margin-bottom-20" placeholder="휴대폰 번호를 입력해주세요" onChange={this.mobileChange} defaultValue={this.state.mobile}></input>
                              </div>
                              <label id="validatePhone"></label>
                            </div>
                            <br />
                            <div className="row form-group">
                              <div className="col-12 text-center">
                                <button type="button" id="cancelbtn" className="btn" onClick={this.returnUserInfo}>수정취소</button>
                                <button type="submit" id="joinbtn" className="btn btn-primary" onClick={this.handleClick}>수정완료</button>
                              </div>
                            </div>
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
            </div>
        </div>
    </div>
    );
  }
}


export default Mypage;