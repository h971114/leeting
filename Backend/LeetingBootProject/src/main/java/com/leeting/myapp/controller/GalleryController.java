package com.leeting.myapp.controller;

import com.leeting.myapp.service.GalleryService;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public String uploadGallery(@RequestParam("data") MultipartFile multipartFile) throws IOException, SQLException {
        // 현재 dirName: "static", 이후 페이지별 디렉토리 추가 가능
        return galleryService.upload(multipartFile, "static");
    }
}