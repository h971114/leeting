package com.leeting.myapp.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.model.S3DataSource.Utils;
import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.NoticeDto;
import com.leeting.myapp.service.NoticeService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/notice")
public class NoticeController {
	
	
	private final NoticeService noticeService;
	
	@Autowired
	public NoticeController(NoticeService noticeService) {
		this.noticeService = noticeService;
	}
	
	 @ApiOperation(value = "공지사항 등록", notes = "공지사항 등록", response = Map.class)
	  @PostMapping(value = ("/writenotice"))
	 public ResponseEntity<String> writeNotice(@RequestBody NoticeDto notice,HttpServletRequest req) throws IOException {
		 String conclusion = "";
		    HttpStatus status = HttpStatus.ACCEPTED;
		    Map<String, Object> noticemap = new HashMap<String, Object>();
		     if(noticeService.writeNotice(notice,noticemap)) {
		    	conclusion = "SUCCESS";
		    }
		    else {
		    	conclusion = "FAIL";
		    }
		    return new ResponseEntity<String>(conclusion, status);
	 }
	 @ApiOperation(value = "공지사항 목록", notes = "공지사항 목록", response = List.class)
	  @GetMapping("/listnotice")
	  public ResponseEntity<List<NoticeDto>> listnotice(HttpServletRequest req) throws SQLException {
		   System.out.println(req);
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;
		    List<NoticeDto> list = new ArrayList<>();
		    list = noticeService.listNotice();
		    return new ResponseEntity<List<NoticeDto>>(list,status);
	  }
	  //공지사항 상세정보
	  @ApiOperation(value = "공지사항 상세정보", notes = "공지사항 상세정보", response = Map.class)
	  @GetMapping("/{no}")
	  public ResponseEntity<NoticeDto> getNoticeInfo(@PathVariable(value="no") int noticeno, HttpServletRequest req) throws SQLException, IOException {
		  NoticeDto noticetmp = noticeService.getNoticeInfo(noticeno);
		    HttpStatus status = HttpStatus.ACCEPTED;
		    return new ResponseEntity<NoticeDto>(noticetmp, HttpStatus.OK);
	  }
	  //공지사항정보수정
	  @ApiOperation(value = "공지사항 수정", notes = "공지사항 수정", response = Map.class)
	  @PutMapping("")
	  public ResponseEntity<String> updateNotice(@RequestBody NoticeDto notice, HttpServletRequest req) throws SQLException, IOException {
	    System.out.println(req);
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("put to /meeting done");
	    System.out.println("미팅수정");
	    System.out.println(notice.toString());
	    Map<String, Object> noticemap = new HashMap<String, Object>();
	    if(noticeService.update(notice,noticemap)) {
	    	conclusion = "SUCCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  
	  //공지사항삭제
	  @ApiOperation(value = "공지사항삭제", notes = "공지사항삭제", response = Map.class)
	  @DeleteMapping("/{no}")
	  public ResponseEntity<Map<String, Object>> deletenotice(@PathVariable(value="no") int noticeno, HttpServletRequest req) {
	    System.out.println(req);
	    Map<String, Object> resultMap = new HashMap<>();
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("delete to /notice done");
	    System.out.println("공지사항삭제");
	    noticeService.delete(noticeno);
	    return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }
	  
}
