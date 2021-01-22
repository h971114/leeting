package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.MemberDto;
import com.leeting.myapp.model.ParticipationDto;

@Repository
public class MeetingDaoImpl implements MeetingDao{

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void enrollMeeting(MeetingDto meeting)  throws SQLException{
		sqlSession.insert("meeting.enrollMeeting",meeting);
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
}