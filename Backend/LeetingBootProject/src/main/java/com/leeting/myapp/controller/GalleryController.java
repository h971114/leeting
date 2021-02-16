package com.leeting.myapp.controller;

import com.leeting.myapp.service.GalleryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiOperation;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/gallery")
public class GalleryController {
    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @ApiOperation(value = "데이터 등록", notes = "데이터 등록")
    @RequestMapping(value=("/upload"), headers = ("content-type=multipart/form-data"), method=RequestMethod.POST)
    public String uploadGallery(@RequestParam("data") MultipartFile multipartFile,
                                @RequestParam("hostid") String id,
                                @RequestParam("dirNum") int dirNum) throws IOException, SQLException {
        // 현재 dirName: "static", 이후 페이지별 디렉토리 추가 가능
        String dirName = "";
        if(dirNum == 1){
            dirName = "meeting";
        }else if(dirNum == 2){
            dirName = "member";
        }else if(dirNum == 0) {
           dirName = "notice";
        }
        return galleryService.upload(dirName, id, multipartFile);
    }
}