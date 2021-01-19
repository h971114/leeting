package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.leeting.myapp.model.MeetingDto;

@Repository
public class MeetingDaoImpl implements MeetingDao{

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void enrollMeeting(MeetingDto meeting)  throws SQLException{
		sqlSession.insert("meeting.enrollMeeting",meeting);
	}
	
	@Override
    public List<MeetingDto> listMeeting()  throws SQLException{
		return sqlSession.selectList("meeting.listMeeting");
	}
}