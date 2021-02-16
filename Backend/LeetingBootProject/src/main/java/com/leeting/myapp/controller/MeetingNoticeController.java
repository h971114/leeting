package com.leeting.myapp.controller;

import java.io.IOException;
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

import com.leeting.myapp.model.NoticeDto;
import com.leeting.myapp.service.MeetingService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/meetingnotice")
public class MeetingNoticeController {
	// service
	  private final MeetingService meetingService;
	  
	  @Autowired
	  public MeetingNoticeController(MeetingService meetingService) {
	    this.meetingService = meetingService;
	  }
	  @ApiOperation(value = "미팅게시판 목록", notes = "공지사항 목록", response = List.class)
	  @GetMapping("/{meetingno}")
	  public ResponseEntity<Map<String, Object>> meetingnoticelist(@PathVariable(value="meetingno") int meetingno, HttpServletRequest req) throws SQLException {
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;
		    List<NoticeDto> list = new ArrayList<>();
		    list = meetingService.meetingnoticelist(meetingno);
		    if(list.size()>0) {
		    	resultMap.put("list", list);
		    	resultMap.put("conclusion", "SUCCESS");
		    }
		    else {
		    	resultMap.put("list",null);
		 		resultMap.put("conclusion", "FAIL");
		    }

		    return new ResponseEntity<>(resultMap,status);
	  }
	  @ApiOperation(value = "미팅게시판 등록", notes = "미팅게시판 등록", response = Map.class)
	  @PostMapping(value = ("/{meetingno}"))
	 public ResponseEntity<String> meetingnoticewrite(@PathVariable(value="meetingno") int meetingno,@RequestBody NoticeDto notice, HttpServletRequest req) throws IOException {
		 String conclusion = "";
		    HttpStatus status = HttpStatus.ACCEPTED;
		    Map<String, Object> noticemap = new HashMap<String, Object>();
		    notice.setMeetingno(meetingno);
		    if(meetingService.meetingnoticewrite(notice,noticemap)) {
		    	conclusion = "SUCCESS";
		    }
		    else {
		    	conclusion = "FAIL";
		    }
		    return new ResponseEntity<String>(conclusion, status);
	 }
	  //미팅게시판 상세정보
	  @ApiOperation(value = "미팅게시판 상세정보", notes = "미팅게시판 상세정보")
	  @GetMapping("/{meetingno}/{no}")
	  public ResponseEntity<NoticeDto> getNoticeInfo(@PathVariable(value="no") int meetingnoticeno, HttpServletRequest req) throws SQLException, IOException {
		  NoticeDto noticetmp = meetingService.getNoticeInfo(meetingnoticeno);
		    HttpStatus status = HttpStatus.ACCEPTED;
		    return new ResponseEntity<NoticeDto>(noticetmp, HttpStatus.OK);
	  }
	  //미팅게시판정보수정
	  @ApiOperation(value = "미팅게시판 수정", notes = "미팅게시판 수정")
	  @PutMapping("")
	  public ResponseEntity<String> updatemeetingNotice(@RequestBody NoticeDto notice, HttpServletRequest req) throws SQLException, IOException {
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    Map<String, Object> noticemap = new HashMap<String, Object>();
	    if(meetingService.updatenotice(notice,noticemap)) {
	    	conclusion = "SUCCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  
	  //미팅게시판삭제
	  @ApiOperation(value = "미팅게시판삭제", notes = "미팅게시판삭제", response = Map.class)
	  @DeleteMapping("/{no}")
	  public ResponseEntity<Map<String, Object>> deletenotice(@PathVariable(value="no") int noticeno, HttpServletRequest req) {
	    Map<String, Object> resultMap = new HashMap<>();
	    HttpStatus status = HttpStatus.ACCEPTED;
	    meetingService.deletenotice(noticeno);
	    return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }
}
