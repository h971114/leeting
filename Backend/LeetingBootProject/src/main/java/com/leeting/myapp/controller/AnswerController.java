package com.leeting.myapp.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leeting.myapp.model.AnswerDto;
import com.leeting.myapp.model.QuestionDto;
import com.leeting.myapp.service.AnswerService;
import com.leeting.myapp.service.QuestionService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/answer")
public class AnswerController {
	private final AnswerService answerService;
	
	@Autowired
	public AnswerController(AnswerService answerService) {
		this.answerService = answerService;
	}
	
	 @ApiOperation(value = "답변 등록", notes = "답변 등록", response = Map.class)
	 @PostMapping("/writeanswer")
	 public ResponseEntity<String> writeAnswer(@RequestBody AnswerDto answer,HttpServletRequest req) throws IOException {
		 	String conclusion = "";
		    HttpStatus status = HttpStatus.ACCEPTED;

		    if(answerService.writeAnswer(answer)) {
		    	conclusion = "SUCCESS";
		    }
		    else {
		    	conclusion = "FAIL";
		    }
		    return new ResponseEntity<String>(conclusion, status);
	 }
	  @ApiOperation(value = "답변 상세정보", notes = "답변 상세정보", response = Map.class)
	  @GetMapping("/{no}")
	  public ResponseEntity<Map<String, Object>>  getAnswerInfo(@PathVariable(value="no") int questionno, HttpServletRequest req) throws SQLException {
		  AnswerDto answertmp = answerService.getAnswerInfo(questionno);
		    HttpStatus status = HttpStatus.ACCEPTED;
		    System.out.println("get to /questiondetail done");
		    System.out.println("문의사항상세정보");
		    Map<String, Object> resultMap = new HashMap<>();
		    if(answertmp!=null) {
				resultMap.put("answer", answertmp);
				resultMap.put("conclusion", "SUCCESS");
			}else{
		 		resultMap.put("answer",null);
		 		resultMap.put("conclusion", "FAIL");
			}
		    return new ResponseEntity<>(resultMap, status);
	  }
	  @ApiOperation(value = "답변 수정", notes = "답변 수정", response = Map.class)
	 @PutMapping("/modify/{no}")
	  public ResponseEntity<String> updateAnswer(@RequestBody AnswerDto answer, HttpServletRequest req) throws SQLException, IOException {
	    System.out.println(req);
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("put to /question done");
	    System.out.println("문의사항수정");
	    System.out.println(answer.toString());
	    if(answerService.updateAnswer(answer)) {
	    	conclusion = "SUCCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  
	  @ApiOperation(value = "답변 삭제", notes = "답변 삭제", response = Map.class)
	  @DeleteMapping("/{no}")
	  public ResponseEntity<Map<String, Object>> deleteAnswer(@PathVariable(value="no") int answerno, HttpServletRequest req) {
	    System.out.println(req);
	    Map<String, Object> resultMap = new HashMap<>();
	    HttpStatus status = HttpStatus.ACCEPTED;
	    String conclusion = "";
	    if(answerService.deleteAnswer(answerno)) {
	    	conclusion = "SUCCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<Map<String, Object>>(resultMap, status);
	  }
}
