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
public class MemberDaoImpl implements MemberDao{
	
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void join(MemberDto member)  throws SQLException{
		sqlSession.insert("member.join",member);
	}
	@Override
	public int login(String id, String pw)  throws SQLException{
		Map<String,String> map = new HashMap<>();
		map.put("id", id);
		map.put("pw", pw);
		return sqlSession.selectOne("member.login",map);
	}
	@Override
	public MemberDto userinfo(String id) throws SQLException {
		return sqlSession.selectOne("member.userinfo",id);
	}
	@Override
	public void delete(String id) throws SQLException{
		 sqlSession.delete("member.delete",id);
	}
	@Override
	public int sameId(String id)  throws SQLException{
		return sqlSession.selectOne("member.sameId",id);
	}
	@Override
	public int sameNick(String Nickname)  throws SQLException{
		return sqlSession.selectOne("member.sameNick",Nickname);
	}
	@Override
	public void modify(MemberDto member) throws SQLException {
		sqlSession.update("member.modify",member);
	}
	@Override
	public String findid(MemberDto member) throws SQLException {
		// TODO Auto-generated method stub
		Map<String,String> map = new HashMap<>();
		map.put("name", member.getName());
		map.put("email", member.getEmail());
		return sqlSession.selectOne("member.findid", map);
	}
	@Override
	public String findpw(MemberDto member) throws SQLException {
		// TODO Auto-generated method stub
		Map<String,String> map = new HashMap<>();
		map.put("name", member.getName());
		map.put("email", member.getEmail());
		map.put("id", member.getId());
		return sqlSession.selectOne("member.findpw", map);
	}
	@Override
	public int sameEmail(String email)  throws SQLException{
		return sqlSession.selectOne("member.sameEmail",email);
	}
	@Override
	public List<Object> userMeetingFive(String userid)  throws SQLException{
		return sqlSession.selectList("member.usermeet",userid);
	}
}
