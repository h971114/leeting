package com.leeting.myapp.dao;

import java.sql.SQLException;

public interface GalleryDao {
    public void insertGallery(String title, String filePath) throws SQLException;
    public String getPath(String filePath) throws SQLException;
}
