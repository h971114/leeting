package com.leeting.myapp.controller;

import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.MemberDto;
import com.leeting.myapp.service.MeetingService;
import com.leeting.myapp.service.MemberService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/recommend")
public class RecommendController {

  // service
  private final MemberService memberService;
  
  private final MeetingService meetingService;
  

  @Autowired
  public RecommendController(MeetingService meetingService, MemberService memberService) {
    this.memberService = memberService;
    this.meetingService = meetingService;
  }
  @ApiOperation(value = "추천미팅", notes = "추천미팅", response = Map.class)
  @GetMapping("/cate/{categoryno}")
  public ResponseEntity<Map<Integer, MeetingDto>> recommendmeets(@PathVariable(value = "categoryno") int categoryno, HttpServletRequest req) throws SQLException {
    System.out.println(req);
    HttpStatus status = HttpStatus.ACCEPTED;
    System.out.println("get to /recommend/cate done");
    System.out.println("참여미팅");
    List<MeetingDto> meetslist =  meetingService.listMeeting(categoryno);
    Map<Double, MeetingDto> meetingrecommendmap = new TreeMap<Double, MeetingDto>();
    for(MeetingDto k : meetslist) {
    	double cal = calculatescore(k);
    	while(meetingrecommendmap.containsKey(cal)) {
    		cal += 0.000000000001;
    	}
    	meetingrecommendmap.put(cal, k);
    }
    int i = 1;
    Map<Integer, MeetingDto> returnmap = new TreeMap<Integer, MeetingDto>();
    for(Double k : meetingrecommendmap.keySet()) {
    	if(i<=5) {
    		returnmap.put(i, meetingrecommendmap.get(k));
    		System.out.println(k);
    	}
    	else {
    		break;
    	}
    	i++;
    }
    System.out.println(returnmap.toString());
    return new ResponseEntity<Map<Integer, MeetingDto>>(returnmap, status);
  }
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
  private Double calculatescore(MeetingDto k) {
	int likes = k.getmeetinglike();
	int participants = k.getParticipants();
	String date = k.getDate();
	SimpleDateFormat format = new SimpleDateFormat("yyyy-mm-dd");
	Date input;
	try {
		input = format.parse(date);
	} catch (ParseException e) {
		System.out.println("날짜에 문제가 있습니다");
		System.out.println(date.toString());
		e.printStackTrace();
		return Double.MAX_VALUE;
	}
	Date current = new Date();
	long calDate = current.getTime() - input.getTime();
	long calDatedays = calDate / (24*60*60*1000);
	double score = likes* 10 + participants * 10;
	long aging = (long) Math.pow(calDatedays, 2);
	score = score/ aging;
	return score;
  }
}
