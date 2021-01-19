package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.leeting.myapp.dao.MeetingDao;
import com.leeting.myapp.model.MeetingDto;

@Service
public class MeetingServiceImpl implements MeetingService{

	private final MeetingDao meetingDao;
	
	public MeetingServiceImpl(MeetingDao meetingDao){
	    this.meetingDao = meetingDao;
    }

	
	@Override
    public boolean enrollMeeting(MeetingDto meeting) {
	      try {
				System.out.println("확인");
				meetingDao.enrollMeeting(meeting);
	            return true;
	        } catch (SQLException throwables) {
	            throwables.printStackTrace();
	            return false;
	        }
    }
	
	@Override
    public List<MeetingDto> listMeeting() throws SQLException {
		System.out.println("확인");
	    	return meetingDao.listMeeting();

    }
	
}
