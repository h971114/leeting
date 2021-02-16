package com.leeting.myapp.service;

import com.leeting.myapp.model.AnswerDto;

public interface AnswerService {

	boolean writeAnswer(AnswerDto answer);

	AnswerDto getAnswerInfo(int questionno);

	boolean updateAnswer(AnswerDto answer);

	boolean deleteAnswer(int answerno);

}
