package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.leeting.myapp.dao.MeetingDao;
import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.MemberDto;
import com.leeting.myapp.model.ParticipationDto;

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
    public List<MeetingDto> listMeeting(int categoryno) throws SQLException {
		System.out.println("확인");
	    	return meetingDao.listMeeting(categoryno);

    }
	
    @Override
    public MeetingDto getMeetingInfo(int meetingno) {
    	MeetingDto meetingDto = null;
        try {
            meetingDto = meetingDao.meetinginfo(meetingno);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return meetingDto;
    }
    
    @Override
    public void delete(int meetingno) {
        try {
            meetingDao.delete(meetingno);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    @Override
    public void update(MeetingDto meeting) {
        try {
            meetingDao.update(meeting);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
    
    @Override
    public List<ParticipationDto> listparticipants(int meetingno){
    	return meetingDao.listparticipants(meetingno);

    }
}
