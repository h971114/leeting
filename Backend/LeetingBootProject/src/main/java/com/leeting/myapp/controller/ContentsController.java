package com.leeting.myapp.controller;

import com.leeting.myapp.model.ContentsDto;
import com.leeting.myapp.service.ContentsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/contents")
public class ContentsController {

    private final ContentsService contentsService;

    @Autowired
    public ContentsController(ContentsService contentsService) {
        this.contentsService = contentsService;
    }

    @ApiOperation(value = "컨텐츠 등록", notes = "컨텐츠 등록", response = Map.class)
    @PostMapping("/")
    public ResponseEntity<String> enrollcontents(@RequestBody ContentsDto contentsDto, HttpServletRequest req) {
        String conclusion;
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        System.out.println("post /enroll : 컨텐츠 등록");
        if(contentsService.enrollContent(contentsDto)) {
            System.out.println("등록 성공");
            conclusion = "SUCCESS";
        }else{
            System.out.println("등록 실패");
            conclusion = "FAIL";
        }
        return new ResponseEntity<>(conclusion, httpStatus);
    }

    @ApiOperation(value="컨텐츠 조회", notes="컨텐츠 키워드 조회", response = Map.class)
    @GetMapping("/{keyword}") // 특정 컨텐츠 조회에 필요한 파라미터 추가 필요!
    public ResponseEntity<List<ContentsDto>> listcontents(@PathVariable(value = "keyword") String keyword, HttpServletRequest req) {
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        System.out.println("get / : 컨텐츠 키워드 조회");
        List<ContentsDto> contentsDtos = contentsService.listContents(keyword);
        for(ContentsDto contentsDto : contentsDtos) {
            System.out.println("contentsDto = " + contentsDto);
        }
        return new ResponseEntity<>(contentsDtos, httpStatus);
    }

    @ApiOperation(value="컨텐츠 조회", notes="컨텐츠 전체 조회", response = Map.class)
    @GetMapping("/")
    public ResponseEntity<List<ContentsDto>> listcontents(HttpServletRequest req) {
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        System.out.println("get / : 컨텐츠 조회");
        List<ContentsDto> contentsDtos = contentsService.listContents();
        for(ContentsDto contentsDto : contentsDtos) {
            System.out.println("contentsDto = " + contentsDto);
        }
        return new ResponseEntity<>(contentsDtos, httpStatus);
    }

    @ApiOperation(value="컨텐츠 삭제", notes="컨텐츠 삭제", response = Map.class)
    @DeleteMapping("/{no}")
    public ResponseEntity<String> deletecontents(@PathVariable(value = "no") int contentsno , HttpServletRequest req) {
        String conclusion;
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        System.out.println("delete /id : 컨텐츠 삭제");
        if(contentsService.deleteContent(contentsno)) {
            System.out.println("삭제 성공");
            conclusion = "SUCCESS";
        }else{
            System.out.println("삭제 실패");
            conclusion = "FAIL";
        }
        return new ResponseEntity<>(conclusion, httpStatus);
    }

    @ApiOperation(value="컨텐츠 업데이트", notes="컨텐츠 업데이트", response = Map.class)
    @PutMapping("/")
    public ResponseEntity<String> updatecontents(@RequestBody ContentsDto contentsDto, HttpServletRequest req) {
        String conclusion;
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        System.out.println("put / : 컨텐츠 수정");
        if(contentsService.updateContent(contentsDto)) {
            System.out.println("수정 성공");
            conclusion = "SUCCESS";
        }else{
            System.out.println("수정 실패");
            conclusion = "FAIL";
        }
        return new ResponseEntity<>(conclusion, httpStatus);
    }
}
