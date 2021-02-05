package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.ReviewDto;
import org.apache.ibatis.jdbc.SQL;
import org.springframework.stereotype.Service;

import com.leeting.myapp.dao.MeetingDao;
import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.MemberDto;
import com.leeting.myapp.model.NoticeDto;
import com.leeting.myapp.model.ParticipationDto;

@Service
public class MeetingServiceImpl implements MeetingService {

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

    @Override
    public void setlikestatus(ParticipationDto participationDto) throws SQLException {
        meetingDao.setlikestatus(participationDto);
    }
    @Override
    public void setmeeinglike(Map<String,Double> scoremap) throws SQLException {
    	meetingDao.setmeetinglike(scoremap);
    }

    @Override
    public boolean clickmeeting(ParticipationDto participationDto) throws SQLException {
	    ParticipationDto partDto = meetingDao.participationinfo(participationDto);
	    if(partDto==null) {
            meetingDao.clickmeeting(participationDto);
            return true;
        }else{
        	meetingDao.exitmeeting(participationDto);
	        return false;
        }
    }
    @Override
    public List<MeetingDto> searchAll(String keyword) throws SQLException {
        return meetingDao.searchall(keyword);
    }

    @Override
    public List<MeetingDto> searchAll(String keyword) throws SQLException {
        return meetingDao.searchall(keyword);
    }

    @Override
    public List<MeetingDto> searchByTitle(String keyword) throws SQLException {
        return meetingDao.searchbytitle(keyword);
    }

    @Override
    public List<MeetingDto> searchById(String keyword) throws SQLException {
        return meetingDao.searchbyid(keyword);
    }

    @Override
    public List<ReviewDto> getReview(int meetingno) throws SQLException {
        return meetingDao.getReview(meetingno);
    }

    @Override
    public boolean postReview(ReviewDto reviewDto) throws SQLException {
        return meetingDao.postReview(reviewDto);
    }

    @Override
    public boolean updateReview(ReviewDto reviewDto) throws SQLException {
        return meetingDao.updateReview(reviewDto);
    }

    @Override
    public boolean deleteReview(int no) throws SQLException {
        return meetingDao.deleteReview(no);
    }


	@Override
	public boolean enrollPhoto(Map<String, Object> meetingmap) {
		System.out.println("확인");
		meetingDao.enrollPhoto(meetingmap);
		return false;
	}


	@Override
	public List<MeetingDto> hostMeetinglist(String hostid) {
		// TODO Auto-generated method stub
		return meetingDao.hostMeetinglist(hostid);
	}
	@Override
	public List<NoticeDto> meetingnoticelist(int meetingno) {
		// TODO Auto-generated method stub
		return meetingDao.meetingnoticelist(meetingno);
	}


	@Override
	public boolean meetingnoticewrite(NoticeDto notice, Map<String, Object> noticemap) {
		System.out.println("확인");
		meetingDao.meetingnoticewrite(notice,noticemap);
		return true;
	}


	@Override
	public NoticeDto getNoticeInfo(int meetingnoticeno) {
		NoticeDto noticeDto = null;
        noticeDto = meetingDao.noticeinfo(meetingnoticeno);
        return noticeDto;
	}


	@Override
	public boolean updatenotice(NoticeDto notice, Map<String, Object> noticemap) {
		 meetingDao.updatenotice(notice,noticemap);
		 return true;
	}


	@Override
	public void deletenotice(int noticeno) {
		 meetingDao.deletenotice(noticeno);
		
	}
}
