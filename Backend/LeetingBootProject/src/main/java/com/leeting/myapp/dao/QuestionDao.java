package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.QuestionDto;

public interface QuestionDao {
	public void writeQuestion(QuestionDto question,Map<String, Object> questionmap)  throws SQLException;

	public List<QuestionDto> listQuestion(String writer);

	public QuestionDto questioninfo(int questionno);

	public void update(QuestionDto question, Map<String,Object> questionmap);

	public void delete(int questionno);
}
