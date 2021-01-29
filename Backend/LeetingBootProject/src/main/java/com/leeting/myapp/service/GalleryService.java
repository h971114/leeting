package com.leeting.myapp.service;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

public interface GalleryService {
    String upload(MultipartFile multipartFile, String dirName) throws IOException, SQLException;

    String uploadFile(File uploadFile, String dirName) throws SQLException;

    String insertAWS(File uploadFile, String fileName);

    Optional<File> convert(MultipartFile file) throws IOException;
}
