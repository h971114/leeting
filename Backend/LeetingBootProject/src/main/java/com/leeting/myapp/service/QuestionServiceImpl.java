package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.leeting.myapp.dao.QuestionDao;
import com.leeting.myapp.model.QuestionDto;

@Service
public class QuestionServiceImpl implements QuestionService{
	
	private final QuestionDao questionDao;
	
	public QuestionServiceImpl(QuestionDao questionDao){
	    this.questionDao = questionDao;
    }

	
	@Override
    public boolean  writeQuestion(QuestionDto question,Map<String, Object> questionmap) {
	      try {
				System.out.println("확인");
				questionDao.writeQuestion(question,questionmap);
	            return true;
	        } catch (SQLException throwables) {
	            throwables.printStackTrace();
	            return false;
	        }
    }
	
	@Override
	public List<QuestionDto> listQuestion() {
		System.out.println("확인");
    	return questionDao.listQuestion();
	}
	@Override
	public QuestionDto getQuestionInfo(int questionno) throws SQLException {
		QuestionDto questionDto = null;
		questionDto = questionDao.questioninfo(questionno);
        return questionDto;
	}
	@Override
	public boolean update(QuestionDto question, Map<String,Object> questionmap) throws SQLException {
            System.out.println("확인");
            questionDao.update(question,questionmap);
			return true;
		
	}
	@Override
	public void delete(int questionno) {
		questionDao.delete(questionno);
		
	}

}
