package com.leeting.myapp.service;

import com.leeting.myapp.dao.MemberDao;
import com.leeting.myapp.dao.RecommendDao;
import com.leeting.myapp.model.MemberDto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RecommendServiceImpl implements RecommendService{
    
	private final RecommendDao recommendDao;
	public RecommendServiceImpl(RecommendDao recommendDao){
	    this.recommendDao = recommendDao;
    }


	@Override
	public List<String> findmeet(String userid) {
	    List<String> meets = null;
        try {
            meets =recommendDao.usermeet(userid);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return meets;
	}

	@Override
	public List<String> meetinuser(String meetingno) {
		List<String> users = null;
        try {
            users =recommendDao.getusers(meetingno);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return users;
	}

	@Override
	public String likestatus(String userid, String meetingno) {
		String likes = null;
        try {
            likes =recommendDao.meetgetlikes(meetingno, userid);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return likes;
	}

}
