package com.leeting.myapp.dao;

import com.leeting.myapp.model.ContentsDto;
import com.leeting.myapp.model.ContentsInfoDto;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface ContentsDao {
    void enrollContents(ContentsDto contentsDto) throws SQLException;
    List<HashMap<String, Object>> listContents(String id) throws SQLException; // 컨텐츠 전체 리스트
    void deleteContents(int contentsno) throws SQLException;
    void updateContents(ContentsDto contentsDto) throws SQLException;
    void setcontentslike(ContentsDto contentsDto);
    void setlike(ContentsDto contentsDto);
    void dellike(ContentsDto contentsDto);
}
