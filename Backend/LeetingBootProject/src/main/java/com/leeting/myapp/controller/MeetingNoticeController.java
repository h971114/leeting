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
	  public ResponseEntity<List<NoticeDto>> meetingnoticelist(@PathVariable(value="meetingno") int meetingno, HttpServletRequest req) throws SQLException {
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;
		    List<NoticeDto> list = new ArrayList<>();
		    list = meetingService.meetingnoticelist(meetingno);
		    return new ResponseEntity<List<NoticeDto>>(list,status);
	  }
	  @ApiOperation(value = "미팅게시판 등록", notes = "미팅게시판 등록", response = Map.class)
	  @GetMapping(value = ("/{meetingno}"), headers = ("content-type=multipart/form-data"))
	 public ResponseEntity<String> meetingnoticewrite(@PathVariable(value="meetingno") int meetingno,@RequestBody NoticeDto notice, HttpServletRequest req) throws IOException {
		 String conclusion = "";
		    HttpStatus status = HttpStatus.ACCEPTED;
		    Map<String, Object> noticemap = new HashMap<String, Object>();
		    notice.setMeetingno(meetingno);
//		    File file = new File("C:/Users/multicampus/Desktop/AKR20201201068200005_01_i_P2.jpg");
//		     byte[] fileContent = Files.readAllBytes(file.toPath());
//		    noticemap.put("file1", fileContent);
		    if(notice.getFile1()!=null)noticemap.put("file1", notice.getFile1().getBytes());
		    if(notice.getFile2()!=null)noticemap.put("file2", notice.getFile2().getBytes());
		    if(notice.getFile3()!=null) noticemap.put("file3", notice.getFile3().getBytes());
		    
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
//		    Map<String, Object> map = noticeService.getByteImage();
//		       byte[] imageContent = (byte[]) map.get("file1");
//	    		byte[] encodeBase64 = Base64.encodeBase64(imageContent);
//	    		String base64DataString = new String(encodeBase64 , "UTF-8");
//		    System.out.println(imageContent);
//		    System.out.println(base64DataString);
//		    final HttpHeaders headers = new HttpHeaders();
//		       headers.setContentType(MediaType.IMAGE_PNG);
		    return new ResponseEntity<NoticeDto>(noticetmp, HttpStatus.OK);
	  }
	  //미팅게시판정보수정
	  @ApiOperation(value = "미팅게시판 수정", notes = "미팅게시판 수정")
	  @PutMapping("")
	  public ResponseEntity<String> updatemeetingNotice(@RequestBody NoticeDto notice, HttpServletRequest req) throws SQLException, IOException {
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    Map<String, Object> noticemap = new HashMap<String, Object>();
	    if(notice.getFile1()!=null) noticemap.put("file1", notice.getFile1().getBytes());
	    if(notice.getFile2()!=null)noticemap.put("file2", notice.getFile2().getBytes());
	    if(notice.getFile3()!=null) noticemap.put("file3", notice.getFile3().getBytes());
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
