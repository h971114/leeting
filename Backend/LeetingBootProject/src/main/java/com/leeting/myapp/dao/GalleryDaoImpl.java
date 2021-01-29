package com.leeting.myapp.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Repository
public class GalleryDaoImpl implements GalleryDao {

    @Autowired
    private SqlSession sqlSession;

    @Override
    public void insertGallery(String title, String filePath) throws SQLException {
        Map<String, String> map = new HashMap<>();
        map.put("title", title);
        map.put("filepath", filePath);
        sqlSession.insert("gallery.insertgallery", map);
    }

    @Override
    public String getPath(String title) throws SQLException {
        return sqlSession.selectOne("gallery.getpath", title);
    }
}
