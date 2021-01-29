package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.ReviewDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.MemberDto;
import com.leeting.myapp.model.ParticipationDto;

@Repository
public class MeetingDaoImpl implements MeetingDao {

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void enrollMeeting(MeetingDto meeting,Map<String, Object> meetingmap)  throws SQLException{
		sqlSession.insert("meeting.enrollMeeting",meeting);
		meetingmap.put("title", meeting.getMaintitle());
		sqlSession.update("meeting.putImage",meetingmap);
	}
	
	@Override
    public List<MeetingDto> listMeeting(int categoryno)  throws SQLException{
		if(categoryno==0) return sqlSession.selectList("meeting.listMeeting");
		else return sqlSession.selectList("meeting.listMeetingCategory",categoryno);
	}
	
	@Override
	public MeetingDto meetinginfo(int meetingno) throws SQLException {
		return sqlSession.selectOne("meeting.meetinginfo",meetingno);
	}
	
	@Override
	public void delete(int meetingno) throws SQLException{
		 sqlSession.delete("meeting.meetingdelete",meetingno);
	}
	
	@Override
	public void update(MeetingDto meeting) throws SQLException {
		sqlSession.update("meeting.meetingmodify",meeting);
	}
	@Override
	public List<ParticipationDto> listparticipants(int meetingno){
		return sqlSession.selectList("meeting.listparticipants",meetingno);
	}

	// 미팅 참여자 중복 검사
	@Override
	public ParticipationDto participationinfo(ParticipationDto participationDto) {
		return sqlSession.selectOne("meeting.participationinfo", participationDto);
	}

	@Override
	public void setlikestatus(ParticipationDto participationDto) {
		sqlSession.update("meeting.setlikestatus", participationDto);
	}
	@Override
	public void setmeetinglike(Map<String,Double>scoremap) {
		sqlSession.update("meeting.setmeetinglike", scoremap);
	}

	@Override
	public void clickmeeting(ParticipationDto participationDto) {
		sqlSession.insert("meeting.clickmeeting", participationDto);
		sqlSession.update("meeting.plusparticipant",participationDto);
	}
	@Override
	public void exitmeeting(ParticipationDto participationDto) {
		sqlSession.delete("meeting.exitmeeting", participationDto);
		sqlSession.update("meeting.minusparticipant",participationDto);
	}

	@Override
	public List<MeetingDto> searchbytitle(String keyword) {
		return sqlSession.selectList("meeting.searchbytitle", keyword);
	}

	@Override
	public List<MeetingDto> searchbyid(String keyword) {
		return sqlSession.selectList("meeting.searchbyid", keyword);
	}

	@Override
	public List<ReviewDto> getReview(int meetingno) {
		return sqlSession.selectList("meeting.getreview", meetingno);
	}

	@Override
	public boolean postReview(ReviewDto reviewDto) {
		int insert = sqlSession.insert("meeting.postreview", reviewDto);
		if(insert==0)
			return false;
		return true;
	}

	@Override
	public boolean updateReview(ReviewDto reviewDto) {
		int update = sqlSession.update("meeting.updatereview", reviewDto);
		if(update==0)
			return false;
		return true;
	}

	@Override
	public boolean deleteReview(int no) {
		int delete = sqlSession.delete("meeting.deletereview", no);
		if(delete==0)
			return false;
		return true;
	}

	@Override
	public void enrollPhoto(Map<String, Object> meetingmap) {
		sqlSession.update("meeting.putImage",meetingmap);
		
	}
}