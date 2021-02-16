package com.leeting.myapp.service;

import com.leeting.myapp.dao.ContentsDao;
import com.leeting.myapp.model.ContentsDto;
import com.leeting.myapp.model.ContentsInfoDto;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ContentsServiceImpl implements ContentsService {

    private final ContentsDao contentsDao;
    public ContentsServiceImpl(ContentsDao contentsDao) {
        this.contentsDao = contentsDao;
    }

    @Override
    public boolean enrollContent(ContentsDto contentsDto) {
        try {
            System.out.println("등록");
            System.out.println(contentsDto);
            contentsDao.enrollContents(contentsDto);
            return true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }

    @Override
    public List<HashMap<String, Object>> listContents(String id) {
        List<HashMap<String, Object>> hashMap = null;
        try {
            System.out.println("조회");
            hashMap = contentsDao.listContents(id);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return hashMap;
    }

    @Override
    public boolean deleteContent(int contentno) {
        try {
            System.out.println("삭제");
            contentsDao.deleteContents(contentno);
            return true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean updateContent(ContentsDto contentsDto) {
        try {
            System.out.println("업데이트");
            contentsDao.updateContents(contentsDto);
            return true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }

    @Override
    public void setcontentslike(ContentsDto contentsDto) throws SQLException {
        contentsDao.setcontentslike(contentsDto);
        if(contentsDto.getContentslike()==1)
            contentsDao.setlike(contentsDto);
        else
            contentsDao.dellike(contentsDto);
    }
}
