package com.leeting.myapp.controller;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.ParticipationDto;
import com.leeting.myapp.service.MeetingService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/meeting")
public class MeetingController {
	
	// service
	  private final MeetingService meetingService;
	  
	  @Autowired
	  public MeetingController(MeetingService meetingService) {
	    this.meetingService = meetingService;
	  }

	  //운동 미팅 등록
	  @ApiOperation(value = "미팅 등록", notes = "미팅 등록", response = Map.class)
	  @PostMapping("/enrollmeeting")
	  public ResponseEntity<String> enrollMeeting(@RequestBody MeetingDto meeting, HttpServletRequest req) {
	    System.out.println(req);
	    Map<String, Object> resultMap = new HashMap<>();
	    String conclusion = "";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("post to /meeting done");
	    System.out.println(" 미팅 등록");

//	    MeetingDto meeting = new MeetingDto();
//
//	    meeting.setCategoryno(1);
//	    meeting.setDate("2021-01-19");
//	    meeting.setDetail("test");
//	    meeting.setFile("http");
//	    meeting.setHostid("sujinn");
//	    meeting.setMaintitle("testtitle");
//	    meeting.setSubtitle("testsub");
//
//	    if(meetingService.enrollMeeting(meeting)) {
//	    	System.out.println("Success");
//	    };

	    if(meetingService.enrollMeeting(meeting)) {
	    	conclusion = "SUCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  //미팅 목록
	  @ApiOperation(value = "미팅 목록", notes = "미팅 목록", response = List.class)
	  @GetMapping("/{category}")
	  public ResponseEntity<List<MeetingDto>> listMeeting(@PathVariable(value="category") String category,HttpServletRequest req) throws SQLException {
		   System.out.println(req);
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;
		    int categoryno = 0;
		    switch(category) {
		    case "exercise":
		    	categoryno = 1;
		    	break;
		    case "music":
		    	categoryno = 2;
		    	break;
		    case "game":
		    	categoryno = 3;
		    	break;
		    case "diy":
		    	categoryno = 4;
		    	break;
		    case "lans":
		    	categoryno = 5;
		    	break;
		    case "study":
		    	categoryno = 6;
		    	break; 
		    default : break;
		    }
		    List<MeetingDto> list = new ArrayList<>();
		    list = meetingService.listMeeting(categoryno);
		    System.out.println("get to /meetinglist done");
		    System.out.println("미팅 목록");
		    System.out.println(list.get(0).toString());
		    return new ResponseEntity<List<MeetingDto>>(list, status);
	  }
	  //미팅 참여자 정보
	  @ApiOperation(value = "미팅 참여자 정보", notes = "미팅 참여자 정보", response = List.class)
	  @GetMapping("/{category}/{meetingno}")
	  public ResponseEntity<List<ParticipationDto>> listMeeting(@PathVariable(value="meetingno") int meetingno,HttpServletRequest req) throws SQLException {
		   System.out.println(req);
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;		    
		    List<ParticipationDto> list = new ArrayList<>();
		    list = meetingService.listparticipants(meetingno);
		    System.out.println("get to /participantslist done");
		    System.out.println("미팅  참여자 목록");
		    System.out.println(list.get(0).toString());
		    return new ResponseEntity<List<ParticipationDto>>(list, status);
	  }
//	  //미팅 상세정보
//	  @ApiOperation(value = "미팅 상세정보", notes = "미팅 상세정보", response = Map.class)
//	  @GetMapping("/{no}")
//	  public ResponseEntity<MeetingDto> getMeetingInfo(@PathVariable(value="no") int meetingno, HttpServletRequest req) throws SQLException {
//		  System.out.println(meetingno); 
//		  System.out.println(req);
//		    MeetingDto meetingtmp = meetingService.getMeetingInfo(meetingno);
//		    HttpStatus status = HttpStatus.ACCEPTED;
//		    System.out.println(meetingtmp.toString());
//		    System.out.println("get to /meetingdetail done");
//		    System.out.println("미팅상세정보");
//		    return new ResponseEntity<MeetingDto>(meetingtmp, status);
//	  }
	  //미팅정보수정
	  @ApiOperation(value = "미팅수정", notes = "미팅수정", response = Map.class)
	  @PutMapping("")
	  public ResponseEntity<String> updateMeeting(@RequestBody MeetingDto meeting, HttpServletRequest req) {
	    System.out.println(req);
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("put to /meeting done");
	    System.out.println("미팅수정");
	    meetingService.update(meeting);
	    System.out.println(meeting.toString());
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  //미팅삭제
	  @ApiOperation(value = "미팅삭제", notes = "미팅삭제", response = Map.class)
	  @DeleteMapping("/{no}")
	  public ResponseEntity<Map<String, Object>> deleteMeeting(@PathVariable(value="no") int meetingno, HttpServletRequest req) {
	    System.out.println(req);
	    Map<String, Object> resultMap = new HashMap<>();
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("delete to /meeting done");
	    System.out.println("미팅삭제");
	    meetingService.delete(meetingno);
	    return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }
}