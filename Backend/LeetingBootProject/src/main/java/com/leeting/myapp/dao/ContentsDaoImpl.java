package com.leeting.myapp.dao;

import com.leeting.myapp.model.ContentsDto;
import com.leeting.myapp.model.ContentsInfoDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class ContentsDaoImpl implements ContentsDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public void enrollContents(ContentsDto contentsDto) throws SQLException {
        sqlSession.insert("contents.enroll", contentsDto);
    }

    @Override
    public List<HashMap<String, Object>> listContents(String id) throws SQLException {
        return sqlSession.selectList("contents.list", id);
    }

    @Override
    public void deleteContents(int contentsno) throws SQLException {
        sqlSession.delete("contents.delete", contentsno);
    }

    @Override
    public void updateContents(ContentsDto contentsDto) throws SQLException {
        sqlSession.update("contents.update", contentsDto);
    }

    @Override
    public void setcontentslike(ContentsDto contentsDto) {
        sqlSession.update("contents.setcontentslike", contentsDto);
    }

    @Override
    public void setlike(ContentsDto contentsDto) {
        sqlSession.insert("contents.setlike", contentsDto);
    }

    @Override
    public void dellike(ContentsDto contentsDto) {
        sqlSession.delete("contents.dellike", contentsDto);
    }


}
