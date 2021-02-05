package com.leeting.myapp.controller;


import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.leeting.myapp.model.ReviewDto;
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

	  //미팅 등록
	  @ApiOperation(value = "미팅 등록", notes = "미팅 등록", response = Map.class)
	  @PostMapping("/enrollmeeting")
	  public ResponseEntity<String> enrollMeeting(@RequestBody MeetingDto meeting, HttpServletRequest req) throws IOException {
	    System.out.println(req);
	    Map<String, Object> resultMap = new HashMap<>();
	    String conclusion = "";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    if(meetingService.enrollMeeting(meeting)) {
	    	conclusion = "SUCCESS";
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
		    return new ResponseEntity<List<MeetingDto>>(list, status);
	  }
	  //미팅 참여자 정보
	  @ApiOperation(value = "미팅 참여자 정보", notes = "미팅 참여자 정보", response = List.class)
	  @GetMapping("/{category}/{meetingno}")
	  public ResponseEntity <Map<String, Object>> listparticipants(@PathVariable(value="meetingno") int meetingno,HttpServletRequest req) throws SQLException {
		   Map<String, Object> conclusionmap = new HashMap<String, Object>();
		    HttpStatus status = HttpStatus.ACCEPTED;		    
		    List<ParticipationDto> list = new ArrayList<>();
		    list = meetingService.listparticipants(meetingno);
		    if(!list.isEmpty()) {
		    	conclusionmap.put("message", "SUCCESS");
		    	conclusionmap.put("list", list);
		    }
		    else conclusionmap.put("message", "FAIL");
		    return new ResponseEntity<Map<String, Object>>(conclusionmap, status);
	  }
	  //미팅 상세정보
	  @ApiOperation(value = "미팅 상세정보", notes = "미팅 상세정보", response = Map.class)
	  @GetMapping("data/{no}")
	  public ResponseEntity<MeetingDto> getMeetingInfo(@PathVariable(value="no") int meetingno, HttpServletRequest req) throws SQLException {
		  System.out.println(meetingno); 
		  System.out.println(req);
		    MeetingDto meetingtmp = meetingService.getMeetingInfo(meetingno);
		    HttpStatus status = HttpStatus.ACCEPTED;
		    System.out.println(meetingtmp.toString());
		    System.out.println("get to /meetingdetail done");
		    System.out.println("미팅상세정보");
		    return new ResponseEntity<MeetingDto>(meetingtmp, status);
	  }
	  //미팅정보수정
	  @ApiOperation(value = "미팅수정", notes = "미팅수정")
	  @PutMapping("")
	  public ResponseEntity<String> updateMeeting(@RequestBody MeetingDto meeting, HttpServletRequest req) {
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    meetingService.update(meeting);
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  //미팅삭제
	  @ApiOperation(value = "미팅삭제", notes = "미팅삭제", response = Map.class)
	  @DeleteMapping("/{no}")
	  public ResponseEntity<Map<String, Object>> deleteMeeting(@PathVariable(value="no") int meetingno, HttpServletRequest req) {
	    Map<String, Object> resultMap = new HashMap<>();
	    HttpStatus status = HttpStatus.ACCEPTED;
	    meetingService.delete(meetingno);
	    return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }

	  // 좋아요 클릭
	  @ApiOperation(value = "좋아요", notes = "좋아요", response = Map.class)
	  @PutMapping("/setlike")
	  public ResponseEntity<Map<String, Object>> setLikeStatus(@RequestBody ParticipationDto participationDto, HttpServletRequest req) throws SQLException {
		  Map<String, Object> resultMap = new HashMap<>();
		  HttpStatus status = HttpStatus.ACCEPTED;
		  Map<String, Double> scoremap = new HashMap<>();
		  meetingService.setlikestatus(participationDto);
		  MeetingDto meetingdto = meetingService.getMeetingInfo(participationDto.getMeetingno());
		  double score = RecommendController.calculatescore(meetingdto);
		  if(participationDto.getLikestatus())
			  scoremap.put("score",(double)(1.0));
		  else
			  scoremap.put("score",(double)(-1.0));
		  scoremap.put("meetingno",(double) participationDto.getMeetingno());
		  meetingService.setmeeinglike(scoremap);
		  return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }

	// 미팅 참여
	@ApiOperation(value = "미팅참여", notes = "미팅참여")
	@PostMapping("/participation")
	public ResponseEntity<String> clickMeeting(@RequestBody ParticipationDto participationDto, HttpServletRequest req) throws SQLException {
		String conclusion = "";
		HttpStatus status = HttpStatus.ACCEPTED;
		if(meetingService.clickmeeting(participationDto)){
			conclusion = "SUCESS";
		}else{
			conclusion = "FAIL";
		}
		return new ResponseEntity<String>(conclusion, status);
	}

	// 미팅 검색
	@ApiOperation(value="미팅검색", notes="키워드로 미팅 검색", response = Map.class)
	@GetMapping("/search")
	public ResponseEntity<Map<String, Object>> searchMeeting( @RequestParam(value = "condition", defaultValue = "0") int num,
												 @RequestParam(value = "keyword", defaultValue = "") String keyword,
												 HttpServletRequest req) throws SQLException {
		HttpStatus status = HttpStatus.ACCEPTED;
		Map<String, Object> conclusionMap = new HashMap<>();
		List<MeetingDto> list = new ArrayList<>();
		if(num==0){//전체검색
			list = meetingService.searchAll(keyword);
		}
		else if(num==1){ // 제목으로 검색
			list = meetingService.searchByTitle(keyword);
		}else { // 아이디로 검색
			list = meetingService.searchById(keyword);
		}
		conclusionMap.put("list", list);
		if(list.size() != 0) conclusionMap.put("message", "SUCCESS");
		else conclusionMap.put("message", "FAIL");
		System.out.println(conclusionMap.get("message"));
		for(MeetingDto MeetingDto : list)
			System.out.println(MeetingDto.toString());
		return new ResponseEntity<Map<String, Object>>(conclusionMap, status);
	}
	// 리뷰 목록
	@ApiOperation(value="리뷰목록", notes="리뷰목록", response = Map.class)
	@GetMapping("/review")
	public ResponseEntity<Map<String, Object>> getReview(@RequestParam int meetingno, HttpServletRequest req) throws SQLException {
		Map<String, Object> map = new HashMap<>();
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		List<ReviewDto> list = meetingService.getReview(meetingno);
		System.out.println("get /review");
		if(list.size()>0) {
			for(ReviewDto reviewDto : list)
				System.out.println("reviewDto.getReview() = " + reviewDto.getReview());
			map.put("list", list);
			map.put("conclusion", "SUCCESS");
		}
		else {
			map.put("list", null);
			map.put("conclusion", "FAIL");
		}
		return new ResponseEntity<>(map, httpStatus);
	}
	// 리뷰 쓰기
	@ApiOperation(value="리뷰쓰기", notes="리뷰쓰기")
	@PostMapping("/review")
	public ResponseEntity<String> postReview(@RequestBody ReviewDto reviewDto, HttpServletRequest req) throws SQLException {
		String conclusion = "";
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		System.out.println("post /review");
		if(meetingService.postReview(reviewDto))
			conclusion = "SUCCESS";
		else
			conclusion = "FAIL";
		return new ResponseEntity<>(conclusion, httpStatus);
	}
	// 리뷰 수정
	@ApiOperation(value="리뷰수정", notes="리뷰수정")
	@PutMapping("/review")
	public ResponseEntity<String> updateReview(@RequestBody ReviewDto reviewDto, HttpServletRequest req) throws SQLException {
		String conclusion = "";
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		System.out.println("put /review");
		if(meetingService.updateReview(reviewDto))
			conclusion = "SUCCESS";
		else
			conclusion = "FAIL";
		return new ResponseEntity<>(conclusion, httpStatus);
	}
	// 리뷰 삭제
	@ApiOperation(value="리뷰삭제", notes="리뷰삭제")
	@DeleteMapping("/review")
	public ResponseEntity<String> deleteReview(@RequestParam(value = "no") int no, HttpServletRequest req) throws SQLException {
		String conclusion = "";
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		System.out.println("del /review");
		if(meetingService.deleteReview(no))
			conclusion = "SUCCESS";
		else
			conclusion = "FAIL";
		return new ResponseEntity<>(conclusion, httpStatus);
	}
	// 호스트가 연 미팅 목록 조회
	@ApiOperation(value="호스트가 연 미팅 목록 조회", notes="호스트가 연 미팅 목록 조회")
	 @GetMapping("/{meetingno}/hostmeeting/{hostid}")
	  public ResponseEntity <List<MeetingDto>> hostMeetinglist(@PathVariable(value="hostid") String hostid,HttpServletRequest req) throws SQLException {
		    HttpStatus status = HttpStatus.ACCEPTED;		    
		    List<MeetingDto> list = new ArrayList<>();
		    list = meetingService.hostMeetinglist(hostid);
		    return new ResponseEntity<List<MeetingDto>>(list, status);
	  }

	  
}