package com.leeting.myapp.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.leeting.myapp.dao.GalleryDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;

@Service
public class GalleryServiceImpl implements GalleryService {
    private final AmazonS3Client amazonS3Client;
    private final GalleryDao galleryDao;

    public GalleryServiceImpl(AmazonS3Client amazonS3Client, GalleryDao galleryDao) {
        this.amazonS3Client = amazonS3Client;
        this.galleryDao = galleryDao;
    }

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Override
    public String upload(MultipartFile multipartFile, String dirName) throws IOException, SQLException {
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        return uploadFile(uploadFile, dirName);
    }

    @Override
    public String uploadFile(File uploadFile, String dirName) throws SQLException {
        String fileName = dirName + "/" + uploadFile.getName();
        String uploadImageUrl = insertAWS(uploadFile, fileName); // aws 업로드
        galleryDao.insertGallery(fileName, uploadImageUrl); // db 업로드

        System.out.println("uploadImageUrl = " + uploadImageUrl);
        uploadFile.delete();
        return uploadImageUrl;
    }

    @Override
    public String insertAWS(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    @Override
    public Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}

