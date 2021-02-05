package com.leeting.myapp.dao;

import java.sql.SQLException;
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
		return sqlSession.selectList("recommend.userinmeet",userid);
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
