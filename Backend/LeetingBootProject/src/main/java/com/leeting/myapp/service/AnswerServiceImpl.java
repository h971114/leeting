package com.leeting.myapp.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.leeting.myapp.dao.AnswerDao;
import com.leeting.myapp.model.AnswerDto;

@Service
public class AnswerServiceImpl implements AnswerService{
	private final AnswerDao answerDao;
	
	public AnswerServiceImpl(AnswerDao answerDao){
	    this.answerDao = answerDao;
    }
	@Override
	public boolean writeAnswer(AnswerDto answer) {
        try {
        	answerDao.writeAnswer(answer);
            return true;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            return false;
        }
	}

	@Override
	public AnswerDto getAnswerInfo(int questionno) {
		AnswerDto answerDto = null;
		answerDto = answerDao.getAnswerInfo(questionno);
        return answerDto;

	}

	@Override
	public boolean updateAnswer(AnswerDto answer) {
		try {
			answerDao.updateAnswer(answer);
	            return true;
	        } catch (SQLException throwables) {
	            throwables.printStackTrace();
	            return false;
	        }
	}

	@Override
	public boolean deleteAnswer(int answerno) {

		 try {
			 answerDao.deleteAnswer(answerno);
	            return true;
	        } catch (SQLException throwables) {
	            throwables.printStackTrace();
	            return false;
	        }
	}

}
