package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.QuestionDto;

public interface QuestionService {
	boolean writeQuestion(QuestionDto question,Map<String, Object> questionmap);
	List<QuestionDto> listQuestion();

	QuestionDto getQuestionInfo(int questionno) throws SQLException;

	boolean update(QuestionDto question, Map<String,Object> questionmap)  throws SQLException;

	void delete(int questionno);
}
