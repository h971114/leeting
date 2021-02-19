import React from "react";
import "./Join.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

class Join extends React.Component {
  constructor(props) {
      super(props);
    this.state = {
      value: '선택하세요',
      checkId: false,
      checkPw: false,
      checkName: false,
      checkNickname: false,
      checkEmail: false,
      checkMobile: false,
      photo:""
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
    auth: "",
    photo:"",
  }

  componentDidMount() {
    if (sessionStorage.getItem('id') !== null) {
      document.getElementById('root').setAttribute('style', 'display:none');
      window.location.replace("/WrongPage");
    }
    if (document.getElementById('side_wrap').classList.contains('open')) {
      document.getElementById('side_wrap').classList.remove('open');
      document.getElementById('side_wrap').classList.add('close');
      document.getElementById('side_wrap').setAttribute('style', 'right:-400px');
      document.getElementById('bg').setAttribute('style', 'display:none');
    }
    
    document.getElementById('checkNickName').disabled = true;
    document.getElementById('checkId').disabled = true;
  }
  
  handleChange = (event) => {
    if (event.target.value !== '직접입력') {
      this.setState({
        value: event.target.value,
        domain: event.target.value,
        checkEmail: true
      });
      // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
      //   document.getElementById('joinbtn').disabled = false;
      // }
      // // console.log(event.target.value);
      document.getElementById('validateDomain').textContent = "";
          document.getElementById('writedomain').value = event.target.value;
          document.getElementById('writedomain').readOnly=true;
      }
    else {
      this.setState({
        value: event.target.value,
        checkEmail: false
      });
      // document.getElementById('joinbtn').disabled = true;
          document.getElementById('writedomain').readOnly = false;
          document.getElementById('writedomain').value = "";
          document.getElementById('writedomain').placeholder = "입력하세요";
      }
  }
  idChange = (e) => {
    var idReg = /^[a-z]+[a-z0-9|\S]{5,19}$/g;
    if (!idReg.test(e.target.value)) {
      document.getElementById('checkId').disabled = true;
      document.getElementById('validateId').textContent = "아이디는 영어 소문자로 시작하는 6~20자 영어 소문자 또는 숫자이어야 합니다.";
      document.getElementById('validateId').setAttribute('style', 'color: #ff3535');
    }
    else {
      document.getElementById('validateId').textContent = "";
      document.getElementById('checkId').disabled = false;
      this.setState({
          id: e.target.value,
      });
    }
  };
  
  pwChange = (e) => {
    var pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&|\S]{8,}$/g;
    
    if (!pwReg.test(e.target.value)) {
      this.setState({
        checkPw:false
    }); 
    // document.getElementById('joinbtn').disabled = true;
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
    // document.getElementById('joinbtn').disabled = true;
      document.getElementById('validateCPw').textContent = "비밀번호가 다릅니다.";
      document.getElementById('validateCPw').setAttribute('style', 'color: #ff3535');
    }
    else{
      this.setState({
        checkPw:true
      })
      // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
        // document.getElementById('joinbtn').disabled = false;
      // }
      document.getElementById('validateCPw').textContent = "확인되었습니다.";
      document.getElementById('validateCPw').setAttribute('style', 'color:blue');
    }

    // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
    //   document.getElementById('joinbtn').disabled = false;
    // }
    // // console.log(this.state.checkPw);
  };

  cpwChange = (e) => {
    if (e.target.value === '') {
      this.setState({
        checkPw: false
      });
      // document.getElementById('joinbtn').disabled = true;
      document.getElementById('validateCPw').textContent = "";
    }
    else if (document.getElementById('inputPw').value === e.target.value) {
      this.setState({
        checkPw:true
      })
      // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
      //   document.getElementById('joinbtn').disabled = false;
      // }
      document.getElementById('validateCPw').textContent = "확인되었습니다.";
      document.getElementById('validateCPw').setAttribute('style', 'color:blue');
    }
    else {
      this.setState({
        checkPw: false
      });
      
      // document.getElementById('joinbtn').disabled = true;
      document.getElementById('validateCPw').textContent = "비밀번호가 다릅니다.";
      document.getElementById('validateCPw').setAttribute('style', 'color: #ff3535');
    }
    // // console.log(this.state.checkPw);
  };

  nameChange = (e) => {
    var nameReg = /^[가-힣|\S]{2,4}$/g;
    if (!nameReg.test(e.target.value)) {
      this.setState({
        checkName: false
      });
      // document.getElementById('joinbtn').disabled = true;
      document.getElementById('validateName').textContent = "이름은 2~4자 사이의 한국어 입니다.";
      document.getElementById('validateName').setAttribute('style', 'color: #ff3535');
    }
    else {
      document.getElementById('validateName').textContent = "";
      this.setState({
        name: e.target.value,
        checkName:true
      });
      // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
      //   document.getElementById('joinbtn').disabled = false;
      // }
    }
  };

  nicknameChange = (e) => {
    var nickNameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\S]{2,10}$/g;
    if (!nickNameReg.test(e.target.value)) {
      this.setState({
        checkNickname: false
      });
      // document.getElementById('joinbtn').disabled = true;
      document.getElementById('checkNickName').disabled = true;
      document.getElementById('validateNickName').textContent = "닉네임은 2~10자 사이의 한국어, 영어, 숫자로 이루어져 있습니다.";
    }
    else {
      document.getElementById('validateNickName').textContent = "";
      document.getElementById('checkNickName').disabled = false;
      this.setState({
        nickname: e.target.value,
      });
      // // console.log(e.target.value);
      // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
      //   document.getElementById('joinbtn').disabled = false;
      // }
      // // console.log(this.state.checkNickname);
    }
  };
  emailChange = (e) => {
    this.setState({
        email: e.target.value,
    });
  };
  domainChange = (e) => {
    var domainReg = /^([0-9a-zA-Z_-|\S]+)(\.[0-9a-zA-Z_-|\S]+){2,3}$/g;
    if (!domainReg.test(e.target.value)) {
      this.setState({
        domain:e.target.value,
        checkEmail: false
      });
      // document.getElementById('joinbtn').disabled = true;
      // document.getElementById('validateDomain').textContent = "정확한 도메인을 입력해주세요";
      // document.getElementById('validateDomain').setAttribute('style', 'color: #ff3535');
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
      // document.getElementById('joinbtn').disabled = true;
      document.getElementById('validatePhone').textContent = "휴대폰 번호는 010-1234-5678 형식으로 입력해주세요.";
      document.getElementById('validatePhone').setAttribute('style', 'color: #ff3535');
    }
    else {
      // // console.log(this.state.checkMobile);
      this.setState({
        mobile: e.target.value,
        checkMobile:true
      });
      // // console.log('test1 : ' + e.target.value);
      document.getElementById('validatePhone').textContent = "";
      // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
      //   document.getElementById('joinbtn').disabled = false;
      // }
      // // console.log(this.state.checkMobile);
    }
    
  };
  sameClick = (e) => {
    e.preventDefault();
    
    var idReg = /^[a-z|\S]+[a-z0-9|\S]{5,19}$/g;
    if (!idReg.test(e.target.value)) {
      axios.post('http://127.0.0.1:8080/myapp/member/same', {
        id: this.state.id
      }).then(res => {
        // // console.log(res.data);
        if (res.data === "SUCESS") {
          this.setState({
            checkId: true
          });
          document.getElementById('validateId').textContent = "사용가능한 아이디입니다.";
          document.getElementById('validateId').setAttribute('style', 'color:blue');
          // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
          //   document.getElementById('joinbtn').disabled = false;
          // }
        }
        else {
          this.setState({
            checkId: false
          });
          // document.getElementById('joinbtn').disabled = true;
          document.getElementById('validateId').textContent = "이미 존재하는 아이디입니다.";
          document.getElementById('validateId').setAttribute('style', 'color: #ff3535');
        }
      });
    }
  };

  sameNickClick = (e) => {
    e.preventDefault();
    // // console.log(this.state.id);
    
    // if()
    var nickNameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\S]{2,10}$/g;
    if (!nickNameReg.test(e.target.value)) {
      axios.post('http://127.0.0.1:8080/myapp/member/samenick', {
        nickname: this.state.nickname
      }).then(res => {
        // console.log(res.data);
        if (res.data === "SUCESS") {
          document.getElementById('validateNickName').textContent = "사용가능한 닉네임입니다.";
          document.getElementById('validateNickName').setAttribute('style', 'color:blue');
          this.setState({
            checkNickname: true
          });
          // if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
          //   document.getElementById('joinbtn').disabled = false;
          // }
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

  /*인증번호 전송*/
  authCheck = (e) => {
    e.preventDefault();
    // console.log(this.state.email + "@" + this.state.domain);
    axios.post('http://127.0.0.1:8080/myapp/member/email', {
      samecheck:"",
        email: this.state.email + "@" + this.state.domain,
      }).then(res => {
        // console.log(res);
        // console.log(res.data);
        alert('인증 메일이 발송되었습니다!!');
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
  emailtokenCheck = (e) => {
    e.preventDefault();

    // console.log(this.state.auth);
    // console.log(this.state.token);

    axios.post('http://127.0.0.1:8080/myapp/member/auth', {
      token: this.state.token,
      auth: this.state.auth,      
      }).then(res => {
        // console.log(res);
        // console.log(res.data);
        if (res.data === "SUCCESS") {
          this.setState({
            checkEmail: true
          });
          document.getElementById('auth').disabled = true;
          document.getElementById('sendtoken').setAttribute('style', 'display:none');
          document.getElementById('checktoken').setAttribute('style', 'display:none');
        
          document.getElementById('validateDomain').textContent = "인증번호가 확인되었습니다.";
          document.getElementById('validateDomain').setAttribute('style', 'color: blue');
        } else {
          document.getElementById('sendtoken').setAttribute('style', 'display:inline-block');
          document.getElementById('validateDomain').textContent = "인증번호를 재확인해주세요";
          document.getElementById('validateDomain').setAttribute('style', 'color: #ff3535');
        }
      })
  };

  handleClick = (e) => {
    e.preventDefault();
    // // console.log(this.state);


    if (this.state.checkId === true && this.state.checkEmail === true && this.state.checkMobile === true && this.state.checkName === true && this.state.checkNickname === true && this.state.checkPw === true) {
      axios.post('http://127.0.0.1:8080/myapp/member/join', {
        id: this.state.id,
        pw: this.state.pw,
        nickname: this.state.nickname,
        name: this.state.name,
        email: this.state.email + "@" + this.state.domain,
        mobile: this.state.mobile,
        photo: this.state.photo
      }).then(res => {
        //// console.log(res);
        // // console.log(res.data);
        if (res.data === "SUCCESS") {
          alert("환영합니다~ 로그인 페이지로 이동합니다.");
          // console.log("회원가입 완료");
          // window.location.replace("/login");
        }
        else {
          alert("회원가입에 실패하였습니다. 메인 페이지로 이동합니다.");
          // console.log("회원가입 실패");
          // window.location.replace("/");
        }
      })
    }
    else {
      alert("입력 정보를 확인해주세요!");
      // console.log("미입력여부");
    }
  };

  goBack = (e) => {
    this.props.history.goBack();
  }

  handlePhotoInput(e) {
    this.setState({
        selectedFile : e.target.files[0],
    })      
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append('data', file);
    formData.append('hostid', sessionStorage.getItem('id'));
    formData.append('dirNum', 2);
    axios.post('http://127.0.0.1:8080/myapp/gallery/upload', formData,{
        headers: {
            'content-type': 'multipart/form-data',
        },
    }).then(res => {
      this.setState({
        photo: res.data
      })
      // console.log(this.state.photo);
      
    })
  }

  render() {
    return (
      
      <div id="main_content">
      <div className="joinContainer">
        <h1 className="tit">회 원 가 입</h1>
        <hr />
        <div className="formcenter">
          <div>
            {/* <form action="submit" className="signupcustom" > */}
              
            <div className="form-group">
                <div className="col-9">
                  <label className="font-weight-bold" >프로필 사진</label>
                  <form className="user row align-items-end filebox"  encType="multipart/form-data">
                    <div className="user row align-items-end">
                      {this.state.photo ? (
                          <img src={this.state.photo} alt="프로필사진"></img>
                      ) : (<img src="../img\noProfile.png" alt="프로필사진"></img>)}                      
                      </div>
                    <label className="forProfile"  htmlFor="ex_filename">사진 변경</label> 
                    <input type="file" accept="image/*"id="ex_filename" className="upload-hidden" onChange={e => this.handlePhotoInput(e)}/> 
                  </form>
                </div>
              </div>
              <div className="form-group">
                <div className="col-12">
                  <label id="labelId" className="font-weight-bold" htmlFor="inputId">아이디</label>
                <input type="text" name="uid" id="inputId" className="col-9 form-control margin-bottom-20" placeholder="아이디를 입력해주세요" onChange={this.idChange}></input>
                <button id="checkId" className="btn" onClick={this.sameClick}>중복 확인</button>
                </div>
                <label id="validateId"></label>
              </div>
              <div className="form-group">
                <div className="col-9">
                  <label id="labelPw" className="font-weight-bold" htmlFor="inputPw">비밀번호</label>
                  <input type="password" id="inputPw" className="form-control margin-bottom-20" placeholder="비밀번호를 입력해주세요" onChange={this.pwChange}></input>
                </div>
                <label id="validatePw"></label>
              </div>
              <div className="form-group">
                <div className="col-9">
                  <label className="font-weight-bold" id="labelCPw" htmlFor="inputCPw">비밀번호 확인</label>
                  <input type="password" id="inputCPw" className="form-control margin-bottom-20" placeholder="확인용 비밀번호를 입력해주세요" onChange={this.cpwChange}></input>
                </div>
                <label id="validateCPw"></label>
              </div>
              <div className="form-group">
                <div className="col-9">
                  <label className="font-weight-bold" id="labelName" htmlFor="inputName">성명</label>
                  <input type="text" id="inputName" className="form-control margin-bottom-20" placeholder="한글 이름을 입력해주세요" onChange ={this.nameChange}></input>
                </div>
                <label id="validateName"></label>
              </div>
              <div className="form-group">
                <div className="col-12">
                  <label className="font-weight-bold" id="labelNickName" htmlFor="inputNickName">닉네임</label>
                <input type="text" id="inputNickName" className="col-9 form-control margin-bottom-20" placeholder="닉네임을 입력해주세요" onChange={this.nicknameChange}></input>
                <button id="checkNickName" className="btn" onClick={this.sameNickClick}>중복 확인</button>
                </div>
                <label id="validateNickName"></label>
              </div>
            <div className="form-group">
                <div className="col-12">
                  <label id="labelEmail" className="font-weight-bold foremail" htmlFor="email">이메일</label>
                  <input type="text" id="email" name="inputEmail" className="form-control col-4 margin-bottom-20" placeholder="이메일을 입력해주세요" onChange={this.emailChange}></input>
                  &nbsp;<label id="at">@</label>&nbsp;
                  <input id="writedomain" name="inputdomain" className="form-control col-4 margin-bottom-20 inputdomain" placeholder="선택하세요" onChange={this.domainChange} readOnly></input>&nbsp;
                  <select id="domain" name="selectdomain" className="form-control col-3 margin-bottom-20" value={this.state.value} onChange={this.handleChange}>
                          <option value="선택하세요" defaultValue>선택하세요</option>
                          <option value="kakao.com" >kakao.com</option>
                          <option value="naver.com">naver.com</option>
                          <option value="daum.net">daum.net</option>
                          <option value="직접입력">직접입력</option>
                  </select>
              </div>
              <div className="col-12">
                <input type="text" id="auth" className="form-control col-4 margin-bottom-20" onChange={this.authChange} disabled></input>
                <button id="checktoken" className="btn" onClick={this.emailtokenCheck}>인증번호 확인</button>
                <button id="sendtoken" className="btn" onClick={this.authCheck}>인증번호 전송</button>
              </div>
                <label id="validateDomain"></label>
              </div>
              <div className="form-group">
                <div className="col-9">
                  <label className="font-weight-bold" id="labelPhone" htmlFor="inputPhone">휴대전화 번호</label>
                  <input type="tel" id="inputPhone" className="form-control margin-bottom-20" placeholder="휴대폰 번호를 입력해주세요" onChange={this.mobileChange}></input>
                </div>
                <label id="validatePhone"></label>
              </div>
              <br />
              {/* <div className="form-group">
                <div className="col-12 text-center">
                  <input type="checkbox" id="checkjoin"></input>&nbsp;
                    <label htmlFor="checkjoin"><span></span> Leeting의 이용약관, 개인정보취급방침 및 개인정보3자제공에 동의합니다.</label>
                </div>
              </div> */}
              <div className="row form-group">
                <div className="col-6 text-right">
                  <button onClick={this.goBack} className="btn btn-light">돌아가기</button>
                </div>
                <div className="col-6">
                  <button type="submit" id="joinbtn" className="btn btn-primary" onClick={this.handleClick}>가입하기</button>
                </div>
              </div>
              
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
    );
  }
}


export default Join;