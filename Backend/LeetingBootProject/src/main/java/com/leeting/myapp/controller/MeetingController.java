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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.service.MeetingService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/exercise")
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
	  //움동 미팅 목록
	  @ApiOperation(value = "미팅 목록", notes = "미팅 목록", response = List.class)
	  @GetMapping("/listmeeting")
	  public ResponseEntity<List<MeetingDto>> listMeeting(@RequestBody MeetingDto meeting, HttpServletRequest req) throws SQLException {
		   System.out.println(req);
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;
		    List<MeetingDto> list = new ArrayList<>();
		    list = meetingService.listMeeting();
		    System.out.println("get to /meetinglist done");
		    System.out.println("미팅 목록");
//		    System.out.println(list.get(1).toString());
		    return new ResponseEntity<List<MeetingDto>>(meetingService.listMeeting(), status);
	  }
}