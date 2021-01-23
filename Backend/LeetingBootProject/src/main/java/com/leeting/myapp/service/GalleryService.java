package com.leeting.myapp.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

public interface GalleryService {
    String upload(MultipartFile multipartFile, String dirName) throws IOException, SQLException;

    String uploadFile(File uploadFile, String dirName) throws SQLException;

    String insertAWS(File uploadFile, String fileName);

    Optional<File> convert(MultipartFile file) throws IOException;
}