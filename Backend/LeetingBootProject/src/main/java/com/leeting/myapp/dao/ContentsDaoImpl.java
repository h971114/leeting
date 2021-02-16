package com.leeting.myapp.dao;

import com.leeting.myapp.model.ContentsDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class ContentsDaoImpl implements ContentsDao{

    @Autowired
    private SqlSession sqlSession;

    @Override
    public void enrollContents(ContentsDto contentsDto) throws SQLException {
        sqlSession.insert("contents.enrollcontents", contentsDto);
    }

    @Override
    public List<ContentsDto> findContents() throws SQLException {
        return sqlSession.selectList("contents.listcontents");
    }

    @Override
    public List<ContentsDto> listContents() throws SQLException {
        return sqlSession.selectList("contents.listcontents");
    }

    @Override
    public void deleteContents(int contentsno) throws SQLException {
        sqlSession.delete("contents.deletecontents", contentsno);
    }

    @Override
    public void updateContents(ContentsDto contentsDto) throws SQLException {
        sqlSession.update("updatecontents", contentsDto);
    }
}
