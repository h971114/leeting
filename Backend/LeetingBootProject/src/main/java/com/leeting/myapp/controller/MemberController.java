package com.leeting.myapp.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leeting.myapp.dao.MemberDao;
import com.leeting.myapp.dao.MemberDaoImpl;
import com.leeting.myapp.model.MemberDto;
import com.leeting.myapp.service.JwtService;
import com.leeting.myapp.service.MemberService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/member")
public class MemberController {

  // service
  private final MemberService memberService;


  @Autowired
  public MemberController(MemberService memberService) {
    this.memberService = memberService;
  }
  @Autowired
  private JwtService jwtService;
  @Autowired
  public JavaMailSender javaMailSender;
  //회원정보
  @ApiOperation(value = "회원정보", notes = "회원정보", response = Map.class)
  @GetMapping("/{id}")
  public ResponseEntity<MemberDto> getMemberInfo(@PathVariable(value="id") String memberid,HttpServletRequest req) throws SQLException {
	  System.out.println(memberid);
    System.out.println(req);
    MemberDto membertmp = memberService.getMemberInfo(memberid);
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /member done");
    System.out.println("회원정보");
    return new ResponseEntity<MemberDto>(membertmp, status);
  }
  
  //로그인
  @ApiOperation(value = "로그인", notes = "로그인", response = Map.class)
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> loginMember(@RequestBody MemberDto memberbody, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    String conclusion ="";
    Map<String, String> conclusionmap = new HashMap<String, String>();
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("post to /member/login done");
    System.out.println("로그인");
    if(memberService.login(memberbody)) {
    	conclusion = "SUCESS";
    	MemberDto tmpmember = memberService.getMemberInfo(memberbody.getId());
    	String token = jwtService.create("id", memberbody.getId(), "id");
    	conclusionmap.put("message", "SUCCESS");
    	conclusionmap.put("token", token);
    	conclusionmap.put("id", tmpmember.getId());
    	conclusionmap.put("nickname", tmpmember.getNickname());
    	conclusionmap.put("name", tmpmember.getName());
    }
    else {
    	conclusionmap.put("message", "FAIL");
    }
    return new ResponseEntity<Map<String, String>>(conclusionmap, status);
  }
  //중복검사
  @ApiOperation(value = "중복검사", notes = "중복검사", response = Map.class)
  @PostMapping("/same")
  public ResponseEntity<String> sameMember(@RequestBody Map<String,String> memberbody, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    String conclusion ="";
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /member/same done");
    System.out.println("중복검사");
    if(memberService.sameId(memberbody.get("id"))) {
    	conclusion = "SUCESS";
    }
    else {
    	conclusion = "FAIL";
    }
    return new ResponseEntity<String>(conclusion, status);
  }
  //중복검사
  @ApiOperation(value = "중복검사", notes = "중복검사", response = Map.class)
  @PostMapping("/samenick")
  public ResponseEntity<String> sameNick(@RequestBody Map<String,String> memberbody, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    String conclusion ="";
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /member/samenick done");
    System.out.println("중복검사");
    if(memberService.sameNick(memberbody.get("nickname"))) {
    	conclusion = "SUCESS";
    }
    else {
    	conclusion = "FAIL";
    }
    return new ResponseEntity<String>(conclusion, status);
  }
  //로그아웃
  @ApiOperation(value = "로그아웃", notes = "로그아웃", response = Map.class)
  @PostMapping("/logout")
  public ResponseEntity<Map<String, Object>> logoutMember(HttpServletRequest req) {
    System.out.println(req);
    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("post to /member/logout done");
    System.out.println("로그아웃");
    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }
  
  //회원가입
  @ApiOperation(value = "회원가입", notes = "회원가입", response = Map.class)
  @PostMapping("join")
  public ResponseEntity<String> joinMember(@RequestBody MemberDto memberbody, HttpServletRequest req) {
    System.out.println(req);
    Map<String, Object> resultMap = new HashMap<>();
    String conclusion = "";
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("post to /member done");
    System.out.println("회원가입");
    if(memberService.join(memberbody)) {
    	conclusion = "SUCESS";
    }
    else {
    	conclusion = "FAIL";
    }
    return new ResponseEntity<String>(conclusion, status);
  }
  
  //회원탈퇴
  @ApiOperation(value = "회원탈퇴", notes = "회원탈퇴", response = Map.class)
  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable(value="id") String memberid, HttpServletRequest req) {
    System.out.println(req);
    Map<String, Object> resultMap = new HashMap<>();
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("delete to /member done");
    System.out.println("회원탈퇴");
    memberService.delete(memberid);
    return new ResponseEntity<Map<String, Object>>(resultMap, status);
  }
  
  //회원수정
  @ApiOperation(value = "회원수정", notes = "회원수정", response = Map.class)
  @PutMapping("")
  public ResponseEntity<String> updateMember(@RequestBody MemberDto memberbody, HttpServletRequest req) {
    System.out.println(req);
    String conclusion = "SUCCESS";
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("put to /member done");
    System.out.println("회원수정");
    memberService.update(memberbody);
    return new ResponseEntity<String>(conclusion, status);
  }
  @ApiOperation(value = "이메일인증", notes = "이메일인증", response = Map.class)
  @PostMapping("/email")
  public ResponseEntity<String> email(@RequestBody Map<String,String> memberbody, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("post to /member/email done");
    System.out.println("이메일 인증");
    String token = "";
    System.out.println(memberbody);
    System.out.println(memberbody.containsKey("samecheck"));
    System.out.println(memberService.sameEmail(memberbody.get("email")));
    if(memberbody.containsKey("samecheck") && !memberService.sameEmail(memberbody.get("email"))) {
    	token = "FAIL";
    }
    else {
	    SimpleMailMessage message = new SimpleMailMessage();
	    message.setTo(memberbody.get("email"));
	    message.setFrom("Leeting@naver.com");
	    message.setSubject("이메일인증입니다");
	    StringBuilder sb = new StringBuilder();
	    String tmp = getTempAuth();
	    sb.append("인증번호는 ");
	    sb.append(tmp);
	    sb.append(" 입니다");
	    message.setText(tmp);
	    javaMailSender.send(message);
	    token = jwtService.create("email", tmp, "email");
    }
    return new ResponseEntity<String>(token, status);
  }
  @ApiOperation(value = "토큰인증", notes = "토큰인증", response = Map.class)
  @PostMapping("/auth")
  public ResponseEntity<String> authToken(@RequestBody Map<String,String> memberbody, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    String conclusion ="";
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /member/auth done");
    System.out.println("토큰인증");
    if(jwtService.get("email", memberbody.get("token")).equals(memberbody.get("auth"))) {
    	conclusion = "SUCCESS";
    }
    else {
    	conclusion = "FAIL";
    }
    return new ResponseEntity<String>(conclusion, status);
  }
  @ApiOperation(value = "아이디찾기", notes = "아이디찾기", response = Map.class)
  @GetMapping("/findid")
  public ResponseEntity<String> findid(@RequestParam("name") String membername,@RequestParam("email") String memberemail,  HttpServletRequest req) throws SQLException {
    System.out.println(req);
    String conclusion ="";
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /member/findid done");
    System.out.println("아이디찾기");
    MemberDto memberbody = new MemberDto();
    memberbody.setName(membername);
    memberbody.setEmail(memberemail);
    System.out.println(memberbody);
    conclusion = memberService.findid(memberbody);
    System.out.println(conclusion);
    if(conclusion == null) {
    	conclusion = "FAIL";
    }
    return new ResponseEntity<String>(conclusion, status);
  }
  @ApiOperation(value = "비밀번호찾기", notes = "비밀번호찾기", response = Map.class)
  @GetMapping("/findpw")
  public ResponseEntity<String> findpw(@RequestParam("name") String membername,@RequestParam("email") String memberemail, @RequestParam("id") String memberid, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    String conclusion ="";
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /member/findpw done");
    System.out.println("비밀번호찾기");
    MemberDto memberbody = new MemberDto();
    memberbody.setName(membername);
    memberbody.setEmail(memberemail);
    memberbody.setId(memberid);
    conclusion = memberService.findpw(memberbody);
    if(conclusion == null) {
    	conclusion = "FAIL";
    }
    return new ResponseEntity<String>(conclusion, status);
  }
  @ApiOperation(value = "참여미팅", notes = "참여미팅메인", response = Map.class)
  @GetMapping("/usermeet")
  public ResponseEntity<List<Object>> usermeet(@RequestParam("id") String memberid, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /member/usermeet done");
    System.out.println("참여미팅");
    List<Object> meetlist = memberService.userMeet(memberid);
    return new ResponseEntity<List<Object>>(meetlist, status);
  }
  public String getTempAuth(){
      char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
              'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

      String str = "";

      int idx = 0;
      for (int i = 0; i < 10; i++) {
          idx = (int) (charSet.length * Math.random());
          str += charSet[idx];
      }
      return str;
  }
}
