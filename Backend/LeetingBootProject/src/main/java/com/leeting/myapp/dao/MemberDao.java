package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;

import com.leeting.myapp.model.MemberDto;

public interface MemberDao {
	public void join(MemberDto member) throws SQLException;
	public int login(String id, String pw) throws SQLException;
	public MemberDto userinfo(String id) throws SQLException;
	public void delete(String id) throws SQLException;
	public int sameId(String id) throws SQLException;
	public void modify(MemberDto member) throws SQLException;
	int sameNick(String Nickname) throws SQLException;
	public String findid(MemberDto member) throws SQLException;
	public String findpw(MemberDto member) throws SQLException;
	int sameEmail(String email) throws SQLException;
	List<Object> userMeetingFive(String userid) throws SQLException;
	void start();
}
