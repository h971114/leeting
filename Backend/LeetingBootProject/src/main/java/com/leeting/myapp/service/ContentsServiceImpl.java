package com.leeting.myapp.service;

import com.leeting.myapp.dao.ContentsDao;
import com.leeting.myapp.model.ContentsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

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
            contentsDao.enrollContents(contentsDto);
            return true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ContentsDto> findContent() {
        List<ContentsDto> contentsDtos = null;
        try {
            System.out.println("조회");
            contentsDtos = contentsDao.listContents();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return contentsDtos;
    }

    @Override
    public List<ContentsDto> listContent() {
        List<ContentsDto> contentsDtos = null;
        try {
            System.out.println("조회");
            contentsDtos = contentsDao.listContents();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return contentsDtos;
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
}
