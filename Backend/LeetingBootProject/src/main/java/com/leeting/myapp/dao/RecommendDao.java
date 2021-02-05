package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;

import com.leeting.myapp.model.MemberDto;

public interface RecommendDao {
	public List<String> usermeet(String userid) throws SQLException;
	public String meetgetlikes(String meetingno, String userid) throws SQLException;
	public List<String> getusers(String meetingno) throws SQLException;
}
