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
import org.springframework.web.bind.annotation.*;

import com.leeting.myapp.model.NoticeDto;
import com.leeting.myapp.model.QuestionDto;
import com.leeting.myapp.service.NoticeService;
import com.leeting.myapp.service.QuestionService;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/question")
public class QuestionController {

	private final QuestionService questionService;
	
	@Autowired
	public QuestionController(QuestionService questionService) {
		this.questionService = questionService;
	}
	
	 @ApiOperation(value = "문의사항 등록", notes = "문의사항 등록", response = Map.class)
	  @PostMapping("/writequestion")
	 public ResponseEntity<String> writeQuestion(@RequestBody QuestionDto question, HttpServletRequest req) throws IOException {
		 String conclusion = "";
		    HttpStatus status = HttpStatus.ACCEPTED;
		    System.out.println("post to /question done");
		    System.out.println("문의사항 등록");
		    Map<String, Object> questionmap = new HashMap<String, Object>();
//		    NoticeDto notice = new NoticeDto();
//		    notice.setDetail("test");
//		    notice.setTitle("test");
//		    notice.setWriter("test");
		    if(question.getFile1()!=null) questionmap.put("file1", question.getFile1().getBytes());
		    System.out.println(questionmap.get("file1"));
		    if(question.getFile2()!=null)questionmap.put("file2", question.getFile2().getBytes());
		    if(question.getFile3()!=null) questionmap.put("file3", question.getFile3().getBytes());
		    if(questionService.writeQuestion(question,questionmap)) {
		    	conclusion = "SUCCESS";
		    }
		    else {
		    	conclusion = "FAIL";
		    }
		    return new ResponseEntity<String>(conclusion, status);
	 }
	 @ApiOperation(value = "문의사항 목록", notes = "문의사항 목록", response = List.class)
	  @GetMapping("/listquestion")
	  public ResponseEntity<Map<String, Object>> listquestion(@RequestParam("writer") String writer, HttpServletRequest req) throws SQLException {
			System.out.println(req);
			Map<String, Object> resultMap = new HashMap<>();
			HttpStatus status = HttpStatus.ACCEPTED;
			System.out.println("get to /questionlist done");
			System.out.println("문의사항 목록");
		 	List<QuestionDto> list = questionService.listQuestion(writer);
		 	if(list.size()>0) {
				for (QuestionDto questionDto : list)
					System.out.println("questionDto.toString() = " + questionDto.toString());
				resultMap.put("list", list);
				resultMap.put("conclusion", "SUCCESS");
			}else{
		 		resultMap.put("list",null);
		 		resultMap.put("conclusion", "FAIL");
			}
			return new ResponseEntity<>(resultMap, status);
	  }
	 @ApiOperation(value = "문의사항 전체목록", notes = "문의사항 전체목록", response = List.class)
	  @GetMapping("/listAllquestion")
	  public ResponseEntity<Map<String, Object>> listAllquestion(HttpServletRequest req) throws SQLException {
			System.out.println(req);
			Map<String, Object> resultMap = new HashMap<>();
			HttpStatus status = HttpStatus.ACCEPTED;
		 	List<QuestionDto> list = questionService.listAllQuestion();
		 	if(list.size()>0) {
				for (QuestionDto questionDto : list)
					System.out.println("questionDto.toString() = " + questionDto.toString());
				resultMap.put("list", list);
				resultMap.put("conclusion", "SUCCESS");
			}else{
		 		resultMap.put("list",null);
		 		resultMap.put("conclusion", "FAIL");
			}
			return new ResponseEntity<>(resultMap, status);
	  }
	  //문의사항 상세정보
	  @ApiOperation(value = "문의사항 상세정보", notes = "문의사항 상세정보", response = Map.class)
	  @GetMapping("/{no}")
	  public ResponseEntity<QuestionDto> getQuestionInfo(@PathVariable(value="no") int questionno, HttpServletRequest req) throws SQLException {
		  System.out.println(questionno); 
		  System.out.println(req);
		  QuestionDto questiontmp = questionService.getQuestionInfo(questionno);
		    HttpStatus status = HttpStatus.ACCEPTED;
		    System.out.println(questiontmp.toString());
		    System.out.println("get to /questiondetail done");
		    System.out.println("문의사항상세정보");
		    return new ResponseEntity<QuestionDto>(questiontmp, status);
	  }
	  //문의사항정보수정
	  @ApiOperation(value = "문의사항 수정", notes = "문의사항 수정", response = Map.class)
	  @PutMapping("")
	  public ResponseEntity<String> updateQuestion(@RequestBody QuestionDto question, HttpServletRequest req) throws SQLException, IOException {
	    System.out.println(req);
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("put to /question done");
	    System.out.println("문의사항수정");
	    System.out.println(question.toString());
	    Map<String, Object> questionmap = new HashMap<String, Object>();
	    if(question.getFile1()!=null) questionmap.put("file1", question.getFile1().getBytes());
	    System.out.println(questionmap.get("file1"));
	    if(question.getFile2()!=null)questionmap.put("file2", question.getFile2().getBytes());
	    if(question.getFile3()!=null) questionmap.put("file3", question.getFile3().getBytes());
	    if(questionService.update(question,questionmap)) {
	    	conclusion = "SUCCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<String>(conclusion, status);
	  }
	  
	  //공지사항삭제
	  @ApiOperation(value = "문의사항삭제", notes = "문의사항삭제", response = Map.class)
	  @DeleteMapping("/delete/{no}")
	  public ResponseEntity<String> deletequestion(@PathVariable(value="no") int questionno, HttpServletRequest req) {
	    String conclusion = "SUCCESS";
	    HttpStatus status = HttpStatus.ACCEPTED;
	    System.out.println("delete to /question done");
	    System.out.println("문의사항삭제");
	    if(questionService.delete(questionno)) {
	    	conclusion = "SUCCESS";
	    }
	    else {
	    	conclusion = "FAIL";
	    }
	    return new ResponseEntity<String>(conclusion, status);
	  }
}
