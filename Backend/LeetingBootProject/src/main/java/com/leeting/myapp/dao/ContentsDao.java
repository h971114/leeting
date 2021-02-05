package com.leeting.myapp.dao;

import com.leeting.myapp.model.ContentsDto;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

public interface ContentsDao {
    void enrollContents(ContentsDto contentsDto) throws SQLException;
    List<ContentsDto> listContents(String keyword) throws SQLException; // 특정 컨텐츠 조회, 파라미터 미정
    List<ContentsDto> listContents() throws SQLException; // 컨텐츠 전체 리스트
    void deleteContents(int contentsno) throws SQLException;
    void updateContents(ContentsDto contentsDto) throws SQLException;
}
