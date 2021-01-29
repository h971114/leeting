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
	public List<QuestionDto> listQuestion() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("notice.listQuestion");
	}

	@Override
	public QuestionDto questioninfo(int questionno) {
		return sqlSession.selectOne("question.noticeinfo",questionno);
	}

	@Override
	public void update(QuestionDto question, Map<String,Object> questionmap) {
		sqlSession.update("question.questionmodify",question);
		sqlSession.update("question.questionfilemodify",questionmap);
	}

	@Override
	public void delete(int questionno) {
		sqlSession.delete("question.questiondelete",questionno);
		
	}
}
