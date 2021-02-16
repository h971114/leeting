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


import com.leeting.myapp.model.ReportDto;
import com.leeting.myapp.service.ReportService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/report")
public class ReportController {
	
	private final ReportService reportService;
	
	@Autowired
	public ReportController(ReportService reportService) {
		this.reportService = reportService;
	}
	
	@ApiOperation(value = "신고 등록", notes = "신고 등록", response = Map.class)
	  @PostMapping("/writereport")
	 public ResponseEntity<String> writeReport(@RequestBody ReportDto report,HttpServletRequest req) throws IOException {
		 String conclusion = "";
		    HttpStatus status = HttpStatus.ACCEPTED;
		    System.out.println("post to /report done");
		    System.out.println("신고 등록");
		    if(reportService.writeReport(report)) {
		    	conclusion = "SUCCESS";
		    }
		    else {
		    	conclusion = "FAIL";
		    }
		    return new ResponseEntity<String>(conclusion, status);
	 }
	 @ApiOperation(value = "신고 목록", notes = "신고 목록", response = List.class)
	  @GetMapping("/listreport")
	  public ResponseEntity<Map<String, Object>> listReport(HttpServletRequest req) throws SQLException {
		 	String conclusion = "";
		    Map<String, Object> resultMap = new HashMap<>();
		    HttpStatus status = HttpStatus.ACCEPTED;
		    List<ReportDto> list = new ArrayList<>();
		    list = reportService.listReport();
		    System.out.println("get to /reportlist done");
		    System.out.println("신고 목록");
		    if(!list.isEmpty()) {
		    	resultMap.put("message","SUCCESS");
			    resultMap.put("list",list);
		    }
		    else resultMap.put("message","FAIL");
		    System.out.println(resultMap.get("message"));
		    return new ResponseEntity<Map<String, Object>>(resultMap,status);
	  }
	  //신고 상세정보
	  @ApiOperation(value = "신고 상세정보", notes = "신고 상세정보", response = Map.class)
	  @GetMapping("/{no}")
	  public ResponseEntity<ReportDto> getQuestionInfo(@PathVariable(value="no") int reportno, HttpServletRequest req) throws SQLException {
		  System.out.println(reportno); 
		  System.out.println(req);
		  ReportDto reporttmp = reportService.getReportInfo(reportno);
		    HttpStatus status = HttpStatus.ACCEPTED;
		    System.out.println(reporttmp.toString());
		    System.out.println("get to /reportdetail done");
		    System.out.println("신고상세정보");
		    return new ResponseEntity<ReportDto>(reporttmp, status);
	  }
	  //신고 정보수정
	  @ApiOperation(value = "신고 수정", notes = "신고 수정", response = Map.class)
	  @PutMapping("")
	  public ResponseEntity<String> updateReport(@RequestBody ReportDto report, HttpServletRequest req) throws SQLException, IOException {
	    System.out.println(req);
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("put to /report done");
	    System.out.println("신고수정");
	    System.out.println(report.toString());
//	    ReportDto report = new ReportDto();
//	    report.setId("sujinn");
//	    report.setReportid("test");
//	    report.setDetail("test");
	    if(reportService.update(report)) {
	    	conclusion = "SUCCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  
	  //신고삭제
	  @ApiOperation(value = "신고삭제", notes = "신고삭제", response = Map.class)
	  @DeleteMapping("/{no}")
	  public ResponseEntity<Map<String, Object>> deletequestion(@PathVariable(value="no") int reportno, HttpServletRequest req) {
	    System.out.println(req);
	    Map<String, Object> resultMap = new HashMap<>();
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("delete to /report done");
	    System.out.println("문의사항삭제");
	    reportService.delete(reportno);
	    return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }
}
