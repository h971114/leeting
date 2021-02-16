package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leeting.myapp.model.QuestionDto;

@Repository
public class QuestionDaoImpl implements QuestionDao{
	
	@Autowired
	private SqlSession sqlSession;
	@Override
	public void writeQuestion(QuestionDto question,Map<String, Object> questionmap)  throws SQLException{

		sqlSession.insert("question.writeQuestion",question);
		if(questionmap.get("file1") != null) sqlSession.insert("question.putImage",questionmap);
	}
	@Override
	public List<QuestionDto> listQuestion(String writer) {
		// TODO Auto-generated method stub
		List<QuestionDto> objects = sqlSession.selectList("question.listQuestion", writer);
		System.out.println("objects.size() = " + objects.size());
		return objects;
	}

	@Override
	public QuestionDto questioninfo(int questionno) {
		return sqlSession.selectOne("question.questioninfo",questionno);
	}

	@Override
	public void update(QuestionDto question, Map<String,Object> questionmap) {
		sqlSession.update("question.questionmodify",question);
		sqlSession.update("question.questionfilemodify",questionmap);
	}

	@Override
	public void delete(int questionno) throws SQLException{
		sqlSession.delete("question.nquestionldelete",questionno);
		
	}
	@Override
	public List<QuestionDto> listAllQuestion() {
		List<QuestionDto> objects = sqlSession.selectList("question.listAllQuestion");
		return objects;
	}
}
