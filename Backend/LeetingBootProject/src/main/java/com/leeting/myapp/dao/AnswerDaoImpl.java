package com.leeting.myapp.dao;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leeting.myapp.model.AnswerDto;

@Repository
public class AnswerDaoImpl implements AnswerDao{

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void writeAnswer(AnswerDto answer) throws SQLException{
		sqlSession.insert("answer.writeAnswer",answer);
		
	}

	@Override
	public AnswerDto getAnswerInfo(int questionno) {
		// TODO Auto-generated method stub
		return sqlSession.selectOne("answer.getAnswerInfo",questionno);
	}

	@Override
	public void updateAnswer(AnswerDto answer) throws SQLException{
		// TODO Auto-generated method stub
		sqlSession.update("answer.updateAnswer",answer);
	}

	@Override
	public void deleteAnswer(int answerno)throws SQLException {
		sqlSession.delete("answer.deleteAnswer",answerno);
		
	}

}
