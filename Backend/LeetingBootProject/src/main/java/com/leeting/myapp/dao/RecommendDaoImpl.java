package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leeting.myapp.model.MemberDto;

@Repository
public class RecommendDaoImpl implements RecommendDao{
	
	@Autowired
	private SqlSession sqlSession;


	@Override
	public List<String> usermeet(String userid) throws SQLException {
		Map<String,String> map = new HashMap<>();
		map.put("userid", userid);
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		String date = simpleDateFormat.format(new Date());
		map.put("today", date);
		return sqlSession.selectList("recommend.userinmeet",map);
	}


	@Override
	public String meetgetlikes(String meetingno, String userid) throws SQLException {
		Map<String,String> map = new HashMap<>();
		map.put("id", userid);
		map.put("meetingno", meetingno);
		return sqlSession.selectOne("recommend.meetinuser", map);
	}


	@Override
	public List<String> getusers(String meetingno) throws SQLException {
		return sqlSession.selectList("recommend.findmeetuser",meetingno);
	}

}
