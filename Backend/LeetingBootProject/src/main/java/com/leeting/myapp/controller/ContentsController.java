package com.leeting.myapp.controller;

import com.leeting.myapp.model.ContentsDto;
import com.leeting.myapp.model.ContentsInfoDto;
import com.leeting.myapp.service.ContentsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Iterator;
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

    @ApiOperation(value = "좋아요", notes = "좋아요", response = Map.class)
    @PutMapping("/setlike")
    public ResponseEntity<String> setLikeStatus(@RequestBody ContentsInfoDto contentsInfoDto, HttpServletRequest req) throws SQLException {
        HttpStatus status = HttpStatus.ACCEPTED;
        String conclusion;
        Map<String, Object> resultMap = new HashMap<>();
        ContentsDto contentsDto = new ContentsDto();
        contentsDto.setContentsno(contentsInfoDto.getContentsno());
        contentsDto.setWriter(contentsInfoDto.getUserid());
        System.out.println("contentsInfoDto = " + contentsInfoDto);
        try {
            if (contentsInfoDto.isLikestatus()) { // no, contentsno, userid, likestatus
                contentsDto.setContentslike(1);
                contentsService.setcontentslike(contentsDto);
            } else {
                contentsDto.setContentslike(-1);
                contentsService.setcontentslike(contentsDto);
            }
            conclusion = "SUCCESS";
        } catch (SQLException throwables){
            conclusion = "FAIL";
        }
        System.out.println("conclusion = " + conclusion);
        return new ResponseEntity<>(conclusion, status);
    }

    @ApiOperation(value="컨텐츠 조회", notes="컨텐츠 전체 조회", response = Map.class)
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listcontents(@RequestParam("userid") String id, HttpServletRequest req) {
        HttpStatus httpStatus = HttpStatus.ACCEPTED;
        System.out.println("get / : 컨텐츠 조회");
        
        List<HashMap<String, Object>>  hashMapList = contentsService.listContents(id);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        for(int i=0; i<hashMapList.size(); i++){
            for (String key : hashMapList.get(i).keySet()) {
                if(key.equals("date")) {
                    Object value = hashMapList.get(i).get(key);
                    HashMap<String, Object> hashMap = hashMapList.get(i);
                    hashMap.put(key, sdf.format(value));
                    hashMapList.set(i, hashMap);
                    System.out.println("key/value = " + key + "/" + (hashMapList.get(i)).get(key));
                    break;
                }
            }
        }
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("size", hashMapList.size());
        resultMap.put("contentsList", hashMapList);
//        System.out.println(resultMap);
        return new ResponseEntity<Map<String, Object>>(resultMap, httpStatus);
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
