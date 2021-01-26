package com.leeting.myapp.controller;


import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.leeting.myapp.model.MemberDto;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	  public ResponseEntity<String> enrollMeeting(@RequestBody MeetingDto meeting, HttpServletRequest req) throws IOException {
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
	  public ResponseEntity <Map<String, Object>> listparticipants(@PathVariable(value="meetingno") int meetingno,HttpServletRequest req) throws SQLException {
		   System.out.println(req);
		   String conclusion ="";
		   Map<String, Object> conclusionmap = new HashMap<String, Object>();
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;		    
		    List<ParticipationDto> list = new ArrayList<>();
		    list = meetingService.listparticipants(meetingno);
		    if(!list.isEmpty()) {
		    	conclusion = "SUCESS";
		    	conclusionmap.put("message", "SUCCESS");
		    	conclusionmap.put("list", list);
		    }
		    else conclusionmap.put("message", "FAIL");
		    System.out.println("get to /participantslist done");
		    System.out.println("미팅  참여자 목록");
		    System.out.println(conclusionmap.get("message"));
		  //  System.out.println(conclusionmap.get("list").toString());
		    return new ResponseEntity<Map<String, Object>>(conclusionmap, status);
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

	  // 좋아요 클릭
	  @ApiOperation(value = "좋아요", notes = "좋아요", response = Map.class)
	  @PutMapping("/setlike")
	  public ResponseEntity<Map<String, Object>> setLikeStatus(@RequestBody ParticipationDto participationDto, HttpServletRequest req) throws SQLException {
		  System.out.println(req);
		  Map<String, Object> resultMap = new HashMap<>();
		  HttpStatus status = HttpStatus.ACCEPTED;
		  Map<String, Double> scoremap = new HashMap<>();
		  System.out.println("update to /setlike done");
		  System.out.println("좋아요클릭");
		  System.out.println(participationDto.getUserid());
		  System.out.println(participationDto.getLikestatus());
		  meetingService.setlikestatus(participationDto);
		  MeetingDto meetingdto = meetingService.getMeetingInfo(participationDto.getMeetingno());
		  double score = RecommendController.calculatescore(meetingdto);
		  if(participationDto.getLikestatus())
			  scoremap.put("score",(double)(1.0));
		  else
			  scoremap.put("score",(double)(-1.0));
		  scoremap.put("meetingno",(double) participationDto.getMeetingno());
		  System.out.println(score);
		  meetingService.setmeeinglike(scoremap);
		  return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }

	// 미팅 참여
	@ApiOperation(value = "미팅참여", notes = "미팅참여", response = Map.class)
	@PostMapping("/participation")
	public ResponseEntity<String> clickMeeting(@RequestBody ParticipationDto participationDto, HttpServletRequest req) throws SQLException {
		System.out.println(req);
		String conclusion = "";
		HttpStatus status = HttpStatus.ACCEPTED;
		System.out.println("post to /participation done");
		if(meetingService.clickmeeting(participationDto)){
			System.out.println("미팅참여");
			conclusion = "SUCESS";
		}else{
			System.out.println("미팅나가기");
			conclusion = "FAIL";
		}
		return new ResponseEntity<>(conclusion, status);
	}

	// 미팅 검색
	@ApiOperation(value="미팅검색", notes="키워드로 미팅 검색", response = Map.class)
	@GetMapping("/searchmeeting")
	public ResponseEntity<Map<String, Object>> searchMeeting( @RequestParam(value = "condition", defaultValue = "1") int num,
												 @RequestParam(value = "keyword", defaultValue = "") String keyword,
												 HttpServletRequest req) throws SQLException {
		System.out.println(req);
		HttpStatus status = HttpStatus.ACCEPTED;
		System.out.println("get to /searchmeeting done");
		Map<String, Object> conclusionMap = new HashMap<>();
		List<MeetingDto> list = new ArrayList<>();
		if(num==1){ // 제목으로 검색
			list = meetingService.searchByTitle(keyword);
			System.out.println("제목 검색");
		}else { // 아이디로 검색
			list = meetingService.searchById(keyword);
			System.out.println("아이디 검색");
		}
		conclusionMap.put("list", list);
		if(list.size() != 0) conclusionMap.put("message", "SUCCESS");
		else conclusionMap.put("message", "FAIL");
		System.out.println(conclusionMap.get("message"));
		for(MeetingDto MeetingDto : list)
			System.out.println(MeetingDto.getHostid());
		return new ResponseEntity<>(conclusionMap, status);
	}
}